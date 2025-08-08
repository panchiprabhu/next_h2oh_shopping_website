'use client';
import { useWishlistStore } from '../store/wishlist';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <div className="bg-[#f4f9ff] min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-[#3b82f6] text-center">Your Wishlist 💖</h1>

      {items.length === 0 ? (
        <p className="text-center text-[#64748b] text-lg">Your wishlist is empty. Start adding your favorites!</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white border border-[#dbeafe] p-5 rounded-xl shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-[#1e3a8a]">{item.name}</h2>
                <p className="text-[#475569]">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-[#fbcfe8] text-[#9d174d] px-4 py-1.5 rounded-full text-sm hover:bg-[#f472b6] hover:text-white transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
