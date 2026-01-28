import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // 从 json 数据中查找对应的产品
  const product = useMemo(() => {
    return productsData.find(p => p.id === productId);
  }, [productId]);

  // 【关键：防御性编程】如果找不到产品，显示友好提示，防止页面崩溃成空白
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, the product ID "{productId}" could not be found in our database.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 顶部导航与面包屑 */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm flex items-center justify-between">
          <div>
            <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link to={`/products/${product.categorySlug}`} className="text-gray-500 hover:text-blue-600 capitalize">
              {product.categorySlug.replace(/-/g, ' ')}
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.model}</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* 左侧：大图展示区 */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
              <img 
                src={product.heroImage} 
                alt={product.name} 
                className="max-h-[500px] object-contain"
                onError={(e) => { e.target.src = "https://placehold.co/800x600?text=Product+Image+Coming+Soon"; }}
              />
            </div>
            {/* 如果有更多图片可以在这里加缩略图 */}
          </div>

          {/* 右侧：详细参数与询盘入口 */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Model: {product.model}</span>
              <h1 className="text-4xl font-black text-gray-900 mt-2 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description || "High-quality industrial chain solution designed for durability and performance in demanding environments."}
              </p>
            </div>

            {/* 核心参数卡片 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.keySpecs?.map((spec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">{spec.label}</div>
                  <div className="text-gray-900 font-bold">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* 询盘按钮 */}
            <button 
              onClick={() => navigate(`/inquiry?productId=${product.id}`)}
              className="w-full bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3"
            >
              Get Professional Quote
              <span className="text-2xl">→</span>
            </button>

            {/* 下载区域预留 */}
            {product.downloads?.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Technical Downloads</h4>
                <div className="space-y-3">
                  {product.downloads.map((dl, i) => (
                    <a key={i} href={dl.url} className="flex items-center gap-2 text-blue-600 hover:underline">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {dl.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 底部详细规格表 */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Full Technical Specifications</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-gray-500 font-bold uppercase text-xs">Parameter</th>
                  <th className="px-6 py-4 text-gray-900 font-bold uppercase text-xs">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(product.fullSpecs || {}).map(([key, value]) => (
                  <tr key={key} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium">{key}</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;