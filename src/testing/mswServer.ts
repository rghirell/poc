import { setupServer } from 'msw/node';
import { handlers as paymentHandlers } from '@/domains/payments/testing/mswHandlers';

export const server = setupServer(...paymentHandlers);
