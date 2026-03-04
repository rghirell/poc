import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PaymentDetailPage } from './domains/payments/pages/PaymentDetailPage/PaymentDetailPage';
import { PaymentListPage } from './domains/payments/pages/PaymentListPage/PaymentListPage';
import { Layout } from './shared/components/Layout/Layout';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PaymentListPage />} />
        <Route path="payment/:id" element={<PaymentDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
