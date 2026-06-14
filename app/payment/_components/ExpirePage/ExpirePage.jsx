"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ExpirePage = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 max-w-xl py-16 text-center">
      <div className="bg-[#F8F6F1] rounded-lg shadow-xl border border-neutral-200/60 p-8 md:p-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-red-600 mb-4">
          Payment Session Expired
        </h2>
        <p className="text-[#6C6760] text-sm md:text-base leading-relaxed mb-6">
          Your payment session has expired. Sessions automatically expire if not completed or submitted within 2 hours of creation.
        </p>

        <div className="bg-red-50 border border-red-200/50 rounded-md p-4 text-xs md:text-sm text-red-800 mb-8 text-left leading-relaxed flex gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p>
            If your payment was successful, your order had already processed. Otherwise, please start a new session to complete your purchase.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C4A87A] hover:bg-[#A8895E] text-white text-sm font-semibold rounded-md transition-colors duration-150 cursor-pointer shadow-sm"
          >
            Start New Booking
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-sm font-semibold rounded-md transition-colors duration-150 cursor-pointer bg-white"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpirePage;
