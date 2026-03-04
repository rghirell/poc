import { Outlet, Link } from 'react-router-dom';

export const Layout = () => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <Link to="/" className="text-xl font-bold text-gray-900 no-underline">
        My Payments
      </Link>
    </header>
    <main className="max-w-5xl mx-auto p-6">
      <Outlet />
    </main>
  </div>
);
