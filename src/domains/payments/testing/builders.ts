import type {
  Card,
  Customer,
  Fees,
  Installment,
  InstallmentDetail,
  Order,
  PaymentDetail,
  PaymentListItem,
  PaymentsListResponse,
} from '../types/payment';

export function buildCard(overrides?: Partial<Card>): Card {
  return {
    id: 'card_1',
    brand: 'visa',
    iin: '400000',
    country: 'FR',
    created: 1751527328,
    exp_month: 1,
    exp_year: 2030,
    last4: '0003',
    verified: true,
    psp: 'stripe',
    ...overrides,
  };
}

export function buildInstallment(
  overrides?: Partial<Installment>,
): Installment {
  return {
    id: 'inst_1',
    purchase_amount: 5250,
    due_date: 1751527297,
    original_due_date: null,
    date_paid: null,
    state: 'pending',
    customer_fee: 0,
    customer_interest: 0,
    customer_can_postpone_until: null,
    customer_cannot_postpone_reason: null,
    ...overrides,
  };
}

export function buildInstallmentDetail(
  overrides?: Partial<InstallmentDetail>,
): InstallmentDetail {
  return {
    ...buildInstallment(overrides),
    used_payment_method: null,
    ...overrides,
  };
}

export function buildOrder(overrides?: Partial<Order>): Order {
  return {
    id: 'order_1',
    created: 1751527297,
    merchant_reference: 'ref-123',
    ...overrides,
  };
}

export function buildFees(overrides?: Partial<Fees>): Fees {
  return {
    customer: {
      total: 378,
      total_excluding_tax: 315,
      tax: 63,
    },
    ...overrides,
  };
}

export function buildCustomer(overrides?: Partial<Customer>): Customer {
  return {
    id: 'cust_1',
    card: buildCard(),
    cards: [],
    payment_methods: [],
    ...overrides,
  };
}

export function buildPaymentListItem(
  overrides?: Partial<PaymentListItem>,
): PaymentListItem {
  return {
    id: 'payment_1',
    created: 1751527297,
    state: 'in_progress',
    merchant_display_name: 'Test Merchant',
    purchase_amount: 21000,
    payment_plan: [buildInstallment()],
    recovery: null,
    deferred_trigger: false,
    deferred_trigger_applied: null,
    deferred_trigger_description: null,
    is_deferred_capture: false,
    logo_url: null,
    refunds: [],
    ...overrides,
  };
}

export function buildPaymentDetail(
  overrides?: Partial<PaymentDetail>,
): PaymentDetail {
  return {
    id: 'payment_1',
    created: 1751527297,
    state: 'in_progress',
    origin: 'online_in_page',
    locale: 'fr',
    country_of_service: 'FR',
    payment_plan: [
      buildInstallmentDetail({
        date_paid: 1751527335,
        state: 'paid',
        customer_fee: 378,
        used_payment_method: 'card',
      }),
      buildInstallmentDetail({
        id: 'inst_2',
        due_date: 1754205697,
        state: 'pending',
        customer_can_postpone_until: '2025-09-03',
      }),
    ],
    purchase_amount: 21000,
    fees: buildFees(),
    customer_interest: 0,
    amount_left_to_pay: 15750,
    annual_interest_rate: null,
    merchant_id: 'merchant_1',
    merchant_brand: 'Test Merchant',
    merchant_display_name: 'Test Merchant',
    merchant_name: 'Test Merchant',
    customer: buildCustomer(),
    orders: [buildOrder()],
    logo_url: null,
    ...overrides,
  };
}

export function buildPaymentsListResponse(
  overrides?: Partial<PaymentsListResponse>,
): PaymentsListResponse {
  return {
    total_amount_left_to_pay: 40750,
    payments: [buildPaymentListItem()],
    ...overrides,
  };
}
