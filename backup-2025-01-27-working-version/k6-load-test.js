import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  let res = http.get('http://localhost:3000');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);

  res = http.get('http://localhost:3000/products');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(2);

  res = http.get('http://localhost:3000/products/diamond-solitaire-ring');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
