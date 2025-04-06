"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex justify-center w-full border-b border-stone-300 bg-white sticky top-0 z-10">
      <div className="w-7xl max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {pathname != "/" && (<span className="text-black-600 font-semibold">GENERIC ECOM INC. | </span>)}
          <Link href="/" className="text-xl font-bold text-indigo-600">
            🧞 IdeaGenie
          </Link>
        </div>

        {/* Desktop Nav */}
        {pathname == "/" && (
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/features" className="hover:text-black">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-black">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-black">
              About
            </Link>
            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </nav>
        )}

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <p>Admin Portal</p>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-600"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <nav className="flex flex-col gap-2 pt-4">
            <Link href="/features" className="text-gray-600 hover:text-black">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-black">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-black">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-black">
              Contact
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-black pt-2">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg text-center mt-2"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="w-full border-b bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-indigo-600">
//           IdeaGenie
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
//           <Link href="/features" className="hover:text-black">
//             Features
//           </Link>
//           <Link href="/pricing" className="hover:text-black">
//             Pricing
//           </Link>
//           <Link href="/about" className="hover:text-black">
//             About
//           </Link>
//           <Link href="/contact" className="hover:text-black">
//             Contact
//           </Link>
//         </nav>

//         {/* Right CTA */}
//         <div className="hidden md:flex items-center gap-4">
//           <Link
//             href="/login"
//             className="text-sm text-gray-600 hover:text-black"
//           >
//             Log in
//           </Link>
//           <Link
//             href="/signup"
//             className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-indigo-700 transition"
//           >
//             Get Started
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         {/* <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
//           {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button> */}
//       </div>

//       {/* Mobile Nav */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white border-t px-4 pb-4">
//           <nav className="flex flex-col gap-2 pt-4">
//             <Link href="/features" className="text-gray-600 hover:text-black">
//               Features
//             </Link>
//             <Link href="/pricing" className="text-gray-600 hover:text-black">
//               Pricing
//             </Link>
//             <Link href="/about" className="text-gray-600 hover:text-black">
//               About
//             </Link>
//             <Link href="/contact" className="text-gray-600 hover:text-black">
//               Contact
//             </Link>
//             <Link href="/login" className="text-gray-600 hover:text-black pt-2">
//               Log in
//             </Link>
//             <Link
//               href="/signup"
//               className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg text-center mt-2"
//             >
//               Get Started
//             </Link>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

export default Header;
