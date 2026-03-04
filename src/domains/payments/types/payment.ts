export type PaymentState = 'in_progress' | 'late' | 'completed';
export type InstallmentState = 'paid' | 'pending' | 'late';
export type CardBrand = 'visa' | 'mastercard' | 'amex';
export type PaymentOrigin = 'online' | 'online_in_page';
export type PaymentMethod = 'card';
export type Psp = 'stripe' | 'adyen';

export interface Installment {
  id: string;
  purchase_amount: number;
  due_date: number;
  original_due_date: number | null;
  date_paid: number | null;
  state: InstallmentState;
  customer_fee: number;
  customer_interest: number;
  customer_can_postpone_until: string | null;
  customer_cannot_postpone_reason: string | null;
}

export interface InstallmentDetail extends Installment {
  used_payment_method: PaymentMethod | null;
}

export interface PaymentListItem {
  id: string;
  created: number;
  state: PaymentState;
  merchant_display_name: string;
  purchase_amount: number;
  payment_plan: Installment[];
  recovery: unknown;
  deferred_trigger: boolean;
  deferred_trigger_applied: unknown;
  deferred_trigger_description: string | null;
  is_deferred_capture: boolean;
  logo_url: string | null;
  refunds: unknown[];
}

export interface PaymentsListResponse {
  total_amount_left_to_pay: number;
  payments: PaymentListItem[];
}

export interface Card {
  id: string;
  brand: CardBrand;
  iin: string;
  country: string;
  created: number;
  exp_month: number;
  exp_year: number;
  last4: string;
  verified: boolean;
  psp: Psp;
}

export interface Customer {
  id: string;
  card: Card;
  cards: Card[];
  payment_methods: unknown[];
}

export interface Order {
  id: string;
  created: number;
  merchant_reference: string;
}

export interface Fees {
  customer: {
    total: number;
    total_excluding_tax: number;
    tax: number;
  };
}

export interface PaymentDetail {
  id: string;
  created: number;
  state: PaymentState;
  origin: PaymentOrigin;
  locale: string;
  country_of_service: string;
  payment_plan: InstallmentDetail[];
  purchase_amount: number;
  fees: Fees;
  customer_interest: number;
  amount_left_to_pay: number;
  annual_interest_rate: number | null;
  merchant_id: string;
  merchant_brand: string;
  merchant_display_name: string;
  merchant_name: string;
  customer: Customer;
  orders: Order[];
  logo_url: string | null;
}
