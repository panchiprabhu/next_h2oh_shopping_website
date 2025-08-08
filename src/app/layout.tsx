import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { FaShoppingCart, FaHeart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-gradient-to-br from-[#f0f4ff] to-[#e6f0fa] text-gray-900">
        <Providers>
          <Toaster position="top-right" />
          
          <header className="px-8 py-6 shadow bg-gradient-to-r from-[#dbeafe] via-[#e0f2fe] to-[#f0f9ff] flex justify-between items-center sticky top-0 z-50 rounded-b-xl">
            <Link
              href="/"
              className="text-3xl font-extrabold text-blue-700 tracking-wide flex items-center gap-1"
            >
              💧 <span>H2Oh!</span>
            </Link>

            <nav className="flex items-center space-x-6 text-base font-medium text-blue-700">
              {session && (
                <div className="flex items-center gap-1">
                  Welcome, <b>{session?.user?.name}</b>
                </div>
              )}

              <Link
                href="/wishlist"
                className="flex items-center gap-1 hover:text-pink-500 transition"
              >
                <FaHeart className="text-xl" />
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-1 hover:text-green-600 transition"
              >
                <FaShoppingCart className="text-xl" />
              </Link>

              {session ? (
                <form method="post" action="/api/auth/signout">
                  <button className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:underline cursor-pointer">
                    <FaSignOutAlt /> Sign out
                  </button>
                </form>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="flex items-center gap-1 text-green-600 hover:text-green-800 hover:underline cursor-pointer"
                >
                  <FaSignInAlt /> Sign in
                </Link>
              )}
            </nav>
          </header>

          <main className="p-6 max-w-10/12 mx-auto min-h-screen mt-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
