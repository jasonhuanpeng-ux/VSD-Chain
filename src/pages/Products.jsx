import React from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 1. 顶部页头 (Page Header) */}
      <div className="bg-white border-b border-gray-100 mb-12">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
            Our <span className="text-blue-600">Product Lineup</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            High-performance industrial chains engineered for specific industry requirements. 
            Select a category to view detailed technical specifications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* 2. 品类大卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categoriesData.map((cat) => (
            <Link 
              to={`/products/${cat.slug}`} 
              key={cat.id}
              className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col md:flex-row"
            >
              {/* 左侧/上方图片区 */}
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto bg-gray-100 overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                  onError={(e) => { e.target.src = "https://placehold.co/600x400?text=" + cat.name; }}
                />
              </div>

              {/* 右侧/下方文字区 */}
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors mb-4">
                  {cat.name}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  {cat.summary}
                </p>
                <div className="flex items-center text-blue-600 font-black uppercase text-sm tracking-widest">
                  View Full Catalog 
                  <span className="ml-2 group-hover:ml-4 transition-all duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;