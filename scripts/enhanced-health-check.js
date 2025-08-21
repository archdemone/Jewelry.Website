#!/usr/bin/env node
const https = require('https');
const http = require('http');

const CRITICAL_ENDPOINTS = [
  '/',
  '/api/health',
  '/manifest.webmanifest',
  '/api/healthz',
  '/api/readyz'
];

const PERFORMANCE_THRESHOLDS = {
  responseTime: 2000, // 2 seconds
  statusCode: 200,
  contentLength: 100 // Minimum content length
};

const runHealthCheck = async (baseUrl) => {
  const results = [];
  const client = baseUrl.startsWith('https') ? https : http;

  for (const endpoint of CRITICAL_ENDPOINTS) {
    const url = `${baseUrl}${endpoint}`;
    const startTime = Date.now();
    
    try {
      const result = await new Promise((resolve, reject) => {
        const req = client.get(url, (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => {
            const responseTime = Date.now() - startTime;
            resolve({
              endpoint,
              statusCode: res.statusCode,
              responseTime,
              contentLength: body.length,
              headers: res.headers,
              body: body.substring(0, 500), // First 500 chars for error detection
              success: res.statusCode === PERFORMANCE_THRESHOLDS.statusCode
            });
          });
        });
        
        req.setTimeout(5000, () => reject(new Error(`Timeout for ${endpoint}`)));
        req.on('error', reject);
      });
      
      results.push(result);
    } catch (error) {
      results.push({
        endpoint,
        error: error.message,
        success: false
      });
    }
  }
  
  return results;
};

const detectCommonIssues = (results) => {
  const issues = [];
  
  for (const result of results) {
    // React Dev Overlay detection
    if (result.body && result.body.includes('Cannot read properties of null (reading \'useReducer\')')) {
      issues.push({
        type: 'REACT_DEV_OVERLAY_ERROR',
        endpoint: result.endpoint,
        severity: 'HIGH',
        description: 'React Dev Overlay context error detected'
      });
    }
    
    // 500 errors
    if (result.statusCode === 500) {
      issues.push({
        type: 'SERVER_ERROR',
        endpoint: result.endpoint,
        severity: 'CRITICAL',
        description: `500 error on ${result.endpoint}`
      });
    }
    
    // Slow responses
    if (result.responseTime > PERFORMANCE_THRESHOLDS.responseTime) {
      issues.push({
        type: 'PERFORMANCE_ISSUE',
        endpoint: result.endpoint,
        severity: 'MEDIUM',
        description: `Slow response time: ${result.responseTime}ms`
      });
    }
    
    // Missing content
    if (result.contentLength < PERFORMANCE_THRESHOLDS.contentLength) {
      issues.push({
        type: 'CONTENT_ISSUE',
        endpoint: result.endpoint,
        severity: 'MEDIUM',
        description: `Low content length: ${result.contentLength} bytes`
      });
    }
    
    // Connection errors
    if (result.error) {
      issues.push({
        type: 'CONNECTION_ERROR',
        endpoint: result.endpoint,
        severity: 'CRITICAL',
        description: `Connection failed: ${result.error}`
      });
    }
  }
  
  return issues;
};

const run = async () => {
  const baseUrl = process.env.HEALTHCHECK_URL || 'http://localhost:3000';
  console.log(`🔍 Running enhanced health check for ${baseUrl}`);
  
  try {
    const results = await runHealthCheck(baseUrl);
    const issues = detectCommonIssues(results);
    
    // Print results
    console.log('\n📊 Health Check Results:');
    results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      const time = result.responseTime ? `${result.responseTime}ms` : 'N/A';
      console.log(`${status} ${result.endpoint} - ${result.statusCode || 'ERROR'} (${time})`);
    });
    
    // Report issues
    if (issues.length > 0) {
      console.log('\n🚨 Issues Detected:');
      issues.forEach(issue => {
        const icon = issue.severity === 'CRITICAL' ? '🚨' : issue.severity === 'HIGH' ? '⚠️' : 'ℹ️';
        console.log(`${icon} [${issue.severity}] ${issue.type}: ${issue.description}`);
      });
      
      // Exit with error code if critical issues found
      const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
      if (criticalIssues.length > 0) {
        console.log(`\n❌ ${criticalIssues.length} critical issues found. Exiting with error code.`);
        process.exit(1);
      }
    } else {
      console.log('\n✅ All endpoints healthy!');
    }
    
    // Summary
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;
    console.log(`\n📈 Summary: ${successCount}/${totalCount} endpoints healthy`);
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) run();

module.exports = { run, runHealthCheck, detectCommonIssues };
