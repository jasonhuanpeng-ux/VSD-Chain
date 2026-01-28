import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

const CategoryPage = () => {
  const navigate = useNavigate();
  
  // 1. 从 URL 获取参数 (例如 palm-oil-chain)
  const { categorySlug } = useParams();

  // 2. 获取当前品类的元数据（名称、简介）
  const category = categoriesData.find(c => c.slug === categorySlug);

  // 3. 从数据库过滤出属于该品类的产品
  const filteredProducts = productsData.filter(p => p.categorySlug === categorySlug);

  if (!category) return <div className="p-20 text-center">Category not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 面包屑导航与返回按钮 */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center justify-between">
        <div>
          <Link to="/" className="hover:text-blue-600">Home</Link> / 
          <span className="ml-2 text-gray-900 font-medium">{category.name}</span>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
        >
          ← Back
        </button>
      </nav>

      {/* 品类头部 */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-600 mt-4 max-w-3xl">{category.summary}</p>
      </div>

      {/* 产品网格 */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition">
              {/* 产品图片占位 */}
              <div className="h-64 bg-gray-100 flex items-center justify-center p-6">
                <img 
                  src={product.heroImage} 
                  alt={product.model} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                  onError={(e) => e.target.src = "https://placehold.co/600x400?text=No+Image"}
                />
              </div>

              {/* 产品简讯 */}
              <div className="p-6">
                <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
                  Model: {product.model}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h3>
                
                {/* 核心参数快速预览 (Key Specs) */}
                <div className="space-y-2 mb-6">
                  {product.keySpecs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-gray-50 pb-1">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-semibold text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/product/${product.id}`}
                  className="block text-center bg-gray-900 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                  View Full Specs
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-blue-50 p-10 rounded-xl text-center text-blue-800">
          Currently updating products for this category. Please check back soon or contact us directly.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;