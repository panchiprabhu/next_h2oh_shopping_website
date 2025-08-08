'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../store/cart';
import { useWishlistStore } from '../store/wishlist';
import products from '../../data/products.json';

export default function ProductListPage() {
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);

  return (
    <div className="bg-[#f4f9ff] min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-[#60a5fa] mb-10">Explore Our Bottles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition border border-[#dbeafe]">
            <div className="w-full h-[30rem] relative rounded-md overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4 text-[#1e3a8a]">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#93c5fd] text-white px-3 py-1.5 rounded-full text-sm hover:bg-[#60a5fa] transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="bg-[#fbcfe8] text-[#9d174d] px-3 py-1.5 rounded-full text-sm hover:bg-[#f472b6] hover:text-white transition"
              >
                Wishlist
              </button>
              <Link
                href={`/products/${product.id}`}
                className="bg-gray-100 text-blue-500 px-3 py-1.5 rounded-full text-sm hover:bg-gray-300 hover:text-blue-700 transition"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
