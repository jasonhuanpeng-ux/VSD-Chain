import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Inquiry = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

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

  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  // 根据购物车内容自动生成产品列表信息
  const generateProductList = () => {
    if (cart.length > 0) {
      let list = 'I am interested in the following products:\n\n';
      cart.forEach((item, index) => {
        list += `${index + 1}. ${item.chain_no || item.name || '-'} (${getCategoryLabel(item)})`;
        list += ` - Quantity: ${item.quantity || 1}`;
        list += '\n';
      });
      list += '\nPlease provide a quote for these products.';
      return list;
    } else {
      return 'I am interested in your products. Please provide more information.';
    }
  };

  // 根据购物车更新 message
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      message: generateProductList()
    }));
  }, [cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry Submitted:', formData);
    alert("Thank you! Your inquiry has been sent. We will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Request a Quote</h1>
        <p className="text-gray-600 mb-10">Fill out the form below, and our technical team will get back to you within 24 hours.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧：购物车产品区 */}
          <div className="md:col-span-1 order-2 md:order-1">
            {cart.length > 0 ? (
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4">Selected Products ({cart.length})</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white p-3 rounded-xl border border-blue-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-base font-black text-gray-900">{item.chain_no || item.name || '-'}</div>
                          <div className="text-xs text-gray-500">{getCategoryLabel(item)}</div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 font-bold text-sm">✕</button>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <div className="flex items-center gap-1 bg-gray-100 rounded px-1">
                          <button onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} className="px-2 py-0.5 text-gray-600 hover:text-gray-900 font-bold">−</button>
                          <span className="w-5 text-center text-sm font-semibold">{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="px-2 py-0.5 text-gray-600 hover:text-gray-900 font-bold">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-blue-600 mt-3">These products will be included in your inquiry.</p>
              </div>
            ) : (
              <div className="bg-gray-100 p-5 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2">No Products Selected</h3>
                <p className="text-sm text-gray-600 mb-3">Browse the catalog and add products to your inquiry.</p>
                <Link to="/products" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Browse Products →</Link>
              </div>
            )}

            <div className="mt-4 p-5 bg-white rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">Quick Contact</h4>
              <p className="text-sm text-gray-600">📧 sales@yourchaincompany.com</p>
              <p className="text-sm text-gray-600 mt-1">📞 +86 123 4567 8900</p>
            </div>
          </div>

          {/* 右侧：表单区 */}
          <div className="md:col-span-2 order-1 md:order-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Inquiry Details *</label>
                <textarea 
                  required rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  placeholder="Product details will appear here automatically..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">The product list is auto-generated from your cart. Feel free to edit or add additional information.</p>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;