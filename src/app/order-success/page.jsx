'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();

    return (
        <div className="min-h-screen bg-[#D0E8F2] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#2A3E52] mb-2">🎉 Order Placed Successfully!</h1>
                    <p className="text-[#4A6A8A] mb-6">You will receive your order in 4-5 days.</p>

                    <img
                        src="/animation.gif"
                        alt="Shipping animation"
                        className="mx-auto mb-6"
                        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                    />

                    <div className="text-left mt-8">
                        <h2 className="text-xl font-semibold text-[#2A3E52] mb-2">📦 Order Details</h2>
                        <div className="bg-[#F5FAFD] p-4 rounded-md mb-4 text-[#2A3E52]">
                            <p><strong>Order ID:</strong> #{searchParams.get('orderId')}</p>
                            <p><strong>Total:</strong> ₹{searchParams.get('total')}</p>
                        </div>

                        <h2 className="text-xl font-semibold text-[#2A3E52] mb-2">👤 Customer Info</h2>
                        <div className="bg-[#F5FAFD] p-4 rounded-md text-[#2A3E52]">
                            <p><strong>Name:</strong> {searchParams.get('name')}</p>
                            <p><strong>Email:</strong> {searchParams.get('email')}</p>
                            <p><strong>Phone:</strong> {searchParams.get('phone')}</p>
                            <p><strong>Address:</strong> {searchParams.get('address')}, {searchParams.get('city')} - {searchParams.get('pincode')}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link href="/" className="bg-[#5AA9E6] text-white py-2 px-6 rounded-full hover:bg-[#4990cc] transition">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
