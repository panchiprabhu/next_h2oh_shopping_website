'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCartStore } from '../../store/cart';
import { useWishlistStore } from '../../store/wishlist';
import products from '../../../data/products.json';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
      <Image
        src={product.image}
        alt={product.name}
        width={450}
        height={350}
        className="rounded-lg object-cover"
      />
      <div className="p-5 pt-0 flex-1">
        <h1 className="text-3xl font-bold text-blue-900 mt-4">{product.name}</h1>
        <p className="mt-3 text-gray-700 leading-relaxed">{product.description}</p>
        <p className="mt-4 text-xl font-semibold text-blue-800">₹{product.price}</p>
        <div className="mt-6 space-x-4">
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
            Add to Wishlist
          </button>

        </div>
      </div>
    </div>
  );
}
