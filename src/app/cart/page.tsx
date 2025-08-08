'use client';
import Link from 'next/link';
import { useCartStore } from '../store/cart';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="bg-[#f4f9ff] min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-[#3b82f6] text-center">Your Cart 🛒</h1>

      {items.length === 0 ? (
        <p className="text-center text-[#64748b] text-lg">Your cart is empty. Start shopping now!</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-white border border-[#dbeafe] p-5 rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-[#1e3a8a]">
                    {item.name}
                  </h2>
                  <p className="text-[#475569]">₹{item.price * (item.quantity ?? 1)}</p>

                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                      className={`px-2 rounded-full transition ${item.quantity === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd]'
                        }`}
                    >
                      −
                    </button>
                    <span className="text-md font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-[#e0f2fe] text-[#0284c7] px-2 rounded-full hover:bg-[#bae6fd] transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-[#fee2e2] text-[#b91c1c] px-4 py-1.5 rounded-full text-sm hover:bg-[#f87171] hover:text-white transition"
                >
                  Remove
                </button>
              </li>

            ))}
          </ul>

          <div className="text-right">
            <div className="text-xl font-bold text-[#1e3a8a] mb-4">Total: ₹{total}</div>
            <div className="flex justify-end gap-3 flex-wrap">
              <button
                onClick={clearCart}
                className="bg-[#fca5a5] text-white px-4 py-2 rounded-full text-sm hover:bg-[#ef4444] transition"
              >
                Clear Cart
              </button>
              <Link href="/checkout">
                <button className="bg-[#93c5fd] text-white px-4 py-2 rounded-full text-sm hover:bg-[#60a5fa] transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
