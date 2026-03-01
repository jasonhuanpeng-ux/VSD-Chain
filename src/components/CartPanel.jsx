import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function CartPanel() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryLabel = (item) => {
    if (item.categoryName) return item.categoryName;
    if (item.categorySlug) {
      return item.categorySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'Category';
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-200 flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-lg">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Panel Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Floating Panel */}
          <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-40 flex flex-col border border-gray-200 max-h-[70vh]">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Inquiry Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-base font-black text-gray-900">{item.chain_no || item.name || '-'}</p>
                          <p className="text-xs text-gray-500">{getCategoryLabel(item)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm font-semibold">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                <Link
                  to="/inquiry"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-bold"
                >
                  Proceed to Inquiry
                </Link>

                <button
                  onClick={() => {
                    clearCart();
                    setIsOpen(false);
                  }}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
