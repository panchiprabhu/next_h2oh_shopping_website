'use client';
import { useSession } from 'next-auth/react';
import { useCartStore } from '../store/cart';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const router = useRouter();

  const [form, setForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const orderId = Math.floor(Math.random() * 900000 + 100000); // 6-digit random ID
  router.push(`/order-success?orderId=${orderId}&name=${form.name}&email=${form.email}&phone=${form.phone}&address=${form.address}&city=${form.city}&pincode=${form.pincode}&total=${total}`);
};

  if (status === 'loading') return <p className="p-4 text-gray-600">Loading session...</p>;

  return (
    <div className="min-h-screen bg-[#f4f9ff] px-4 py-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md border border-[#dbeafe]">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-3xl font-bold text-[#3b82f6] mb-2">Checkout</h1>

          {session ? (
            <p className="text-sm text-[#047857] mb-4">✅ Logged in as <strong>{session.user?.email}</strong></p>
          ) : (
            <p className="text-sm text-[#b91c1c] mb-4">⚠️ You are checking out as a guest.</p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-[#cbd5e1] px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-[#cbd5e1] px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-[#cbd5e1] px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-[#cbd5e1] px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border border-[#cbd5e1] px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            className="w-full border border-[#cbd5e1] px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-[#93c5fd] text-white font-semibold py-2 rounded-md hover:bg-[#60a5fa] transition"
          >
            Place Order
          </button>
        </form>

        {/* Cart Summary */}
        <div className="bg-[#e0f2fe] p-6 rounded-xl border border-[#bae6fd] shadow-inner">
          <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Order Summary</h2>
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-[#334155] border-b border-[#cbd5e1] pb-1">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * (item.quantity ?? 1)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="text-right text-lg text-[#1e3a8a] font-bold">
            Total: ₹{total}
          </div>
        </div>
      </div>
    </div>
  );
}
