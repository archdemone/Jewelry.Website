## Security Checklist

### Authentication & Authorization

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens expire appropriately
- [ ] Admin routes protected
- [ ] CSRF protection enabled
- [ ] Session management secure

### Data Protection

- [ ] HTTPS enforced everywhere
- [ ] Database credentials secure
- [ ] API keys not exposed
- [ ] PII data encrypted
- [ ] Backups encrypted

### Input Validation

- [ ] All forms validate input
- [ ] SQL injection prevented
- [ ] XSS protection enabled
- [ ] File upload restrictions
- [ ] Rate limiting implemented

### Infrastructure

- [ ] Firewall configured
- [ ] Unnecessary ports closed
- [ ] Security headers set
- [ ] CORS configured properly
- [ ] CDN security enabled

### Monitoring

- [ ] Error logging enabled
- [ ] Suspicious activity alerts
- [ ] Failed login monitoring
- [ ] Performance monitoring
- [ ] Uptime monitoring

### Compliance

- [ ] GDPR compliant
- [ ] PCI DSS compliant (via Stripe)
- [ ] Cookie consent implemented
- [ ] Privacy policy updated
- [ ] Terms of service updated
