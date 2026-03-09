import { http, HttpResponse } from 'msw';
import { buildPaymentDetail, buildPaymentsListResponse } from './builders';

const BASE_URL = 'http://localhost:3001';

export const handlers = [
  http.get(`${BASE_URL}/payments`, () => {
    return HttpResponse.json(buildPaymentsListResponse());
  }),

  http.get(`${BASE_URL}/payment/:id`, ({ params }) => {
    return HttpResponse.json(buildPaymentDetail({ id: params.id as string }));
  }),
];
