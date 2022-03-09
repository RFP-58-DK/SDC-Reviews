import http from 'k6/http';
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1500,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 100
    }
  }
}

export default function () {
  http.get('http://localhost:3000/reviews/meta?product_id=5');
}