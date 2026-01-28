import React from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section (英雄区) */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Premium Industrial <span className="text-blue-500">Chain Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Professional manufacturer of Palm Oil, Sugar Mill, and High-Performance 
            Conveyor Chains. Engineered for durability in the toughest environments.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/inquiry" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-900/20"
            >
              Get a Quote
            </Link>
            <a 
              href="#categories" 
              className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all border border-white/10"
            >
              View Catalog
            </a>
          </div>
        </div>
      </section>

      {/* 2. Categories Grid (品类展示区 - 已更新图片逻辑) */}
      <section id="categories" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Product Categories</h2>
              <div className="h-1.5 w-20 bg-blue-600 mt-2"></div>
              <p className="text-gray-600 mt-4">Select a category to explore our specialized models.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoriesData.map((cat) => (
              <Link 
                to={`/products/${cat.slug}`} 
                key={cat.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* 图片容器：展示真实产品图 */}
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                    // 如果图片路径错误，自动显示占位图
                    onError={(e) => { e.target.src = "https://placehold.co/600x400?text=" + cat.name; }}
                  />
                  {/* 悬浮时的遮罩微光 */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {cat.summary}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-bold text-sm">
                    View Products 
                    <span className="ml-2 group-hover:ml-4 transition-all duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section (特点介绍) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-16 text-center tracking-tight">WHY PARTNER WITH US</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                🏗️
              </div>
              <h3 className="text-xl font-bold mb-3">Industry Expertise</h3>
              <p className="text-gray-500 leading-relaxed">Deep understanding of palm oil and sugar mill conveyor requirements.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                🛡️
              </div>
              <h3 className="text-xl font-bold mb-3">Superior Quality</h3>
              <p className="text-gray-500 leading-relaxed">High-tensile steel and precision heat treatment for extreme durability.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                🌍
              </div>
              <h3 className="text-xl font-bold mb-3">Global Supply</h3>
              <p className="text-gray-500 leading-relaxed">Supporting industrial processing plants with reliable global logistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-24 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 tracking-tight">Need a Custom Chain Solution?</h2>
          <p className="text-xl mb-10 text-blue-100 font-medium">
            Our engineers are ready to help you optimize your conveyor system.
          </p>
          <Link 
            to="/inquiry" 
            className="inline-block bg-white text-blue-600 px-12 py-4 rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1"
          >
            Request a Technical Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;