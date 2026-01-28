import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';

const Inquiry = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  
  // 查找用户当前选中的产品信息
  const selectedProduct = productsData.find(p => p.id === productId);

  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: productId ? `I am interested in ${selectedProduct?.model || productId}. Please provide a quote.` : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 实际项目中这里会调用 API 发送邮件，目前我们先模拟成功
    console.log("Inquiry Submitted:", formData);
    alert("Thank you! Your inquiry has been sent. We will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Request a Quote</h1>
        <p className="text-gray-600 mb-10">Fill out the form below, and our technical team will get back to you within 24 hours.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 左侧：表单区 */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Your Name"
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
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your Company"
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Inquiry Details *</label>
                <textarea 
                  required rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* 右侧：产品上下文区 */}
          <div className="space-y-6">
            {selectedProduct ? (
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4">Selected Product</h3>
                <div className="bg-white p-4 rounded-xl mb-4 text-center">
                  <img src={selectedProduct.heroImage} className="max-h-32 mx-auto mb-2" alt="" />
                  <div className="font-bold text-gray-900">{selectedProduct.model}</div>
                </div>
                <p className="text-xs text-blue-700">The model information will be automatically included in your inquiry.</p>
              </div>
            ) : (
              <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2">General Inquiry</h3>
                <p className="text-sm text-gray-500">You are sending a general message. To ask about a specific product, please visit that product's page.</p>
              </div>
            )}
            
            <div className="p-6">
              <h4 className="font-bold text-gray-900 mb-2">Quick Contact</h4>
              <p className="text-sm text-gray-600">📧 sales@yourchaincompany.com</p>
              <p className="text-sm text-gray-600 mt-1">📞 +86 123 4567 8900</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;