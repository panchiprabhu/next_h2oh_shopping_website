'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from './store/cart';
import { useWishlistStore } from './store/wishlist';
import products from '../data/products.json';

export default function HomePage() {
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const favoriteProducts = products.filter((product) => product.favorite);

  return (
    <div className="bg-[#f4f9ff] min-h-screen py-10 px-6">
      {/* Hero section */}
      <section className="bg-[#dceeff] text-[#003b73] p-10 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-[#3b82f6]">Welcome to <span className="text-[#60a5fa]">H2Oh!</span></h1>
        <p className="text-lg mb-6">Hydrate in Style - Get Premium Water Bottles for Every Sip! Shop now and enjoy fast delivery!</p>
        <Link href="/products">
          <button className="bg-white text-[#2563eb] font-semibold px-6 py-2 rounded-full shadow hover:bg-[#e0f2fe] transition cursor-pointer">
            Find Your Bottle
          </button>
        </Link>
      </section>

      {/* Customer Favorites */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#60a5fa]">Customer Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favoriteProducts.map((product) => (
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
              <h3 className="text-lg font-semibold mt-4 text-[#1e3a8a]">{product.name}</h3>
              <p className="text-[#475569]">₹{product.price}</p>
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
      </section>
    </div>
  );
}
