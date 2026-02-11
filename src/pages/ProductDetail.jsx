import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductData';

const ProductDetail = () => {
  const { categorySlug, productId } = useParams();
  const navigate = useNavigate();
  const { 
    product, 
    design, 
    attachments, 
    specColumns, 
    categoryInfo, 
    loading, 
    error 
  } = useProductDetail(categorySlug, productId);

  // Loading 状态
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading product...</p>
      </div>
    );
  }

  // 找不到产品
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the product "{productId}" could not be found.
        </p>
        <Link 
          to={categorySlug ? `/category/${categorySlug}` : "/"} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to {categoryInfo?.name_en || 'Home'}
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
            <Link to={`/products/${categorySlug}`} className="text-gray-500 hover:text-blue-600">
              {categoryInfo?.name_en}
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.chain_no}</span>
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
          
          {/* 左侧：图纸展示区 */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex items-center justify-center min-h-[400px]">
              <img 
                src={design?.drawing} 
                alt={product.chain_no} 
                className="max-h-[500px] object-contain"
                onError={(e) => { e.target.src = "https://placehold.co/800x600?text=Drawing+Coming+Soon"; }}
              />
            </div>
            {design && (
              <p className="text-center text-gray-500 text-sm">{design.design_name_en}</p>
            )}
          </div>

          {/* 右侧：详细参数与询盘入口 */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">
                Chain No: {product.chain_no}
              </span>
              <h1 className="text-4xl font-black text-gray-900 mt-2 mb-4">
                {design?.design_name_en || product.chain_no}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {categoryInfo?.name_en} - High-quality industrial chain solution designed for durability and performance.
              </p>
            </div>

            {/* 核心参数卡片 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.specs.P && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Pitch</div>
                  <div className="text-gray-900 font-bold">{product.specs.P} mm</div>
                </div>
              )}
              {product.specs.Fu && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Tensile Strength</div>
                  <div className="text-gray-900 font-bold">{product.specs.Fu} kN</div>
                </div>
              )}
              {product.specs.q && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Weight</div>
                  <div className="text-gray-900 font-bold">{product.specs.q} kg/m</div>
                </div>
              )}
              {product.material && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Material</div>
                  <div className="text-gray-900 font-bold text-sm">{product.material}</div>
                </div>
              )}
            </div>

            {/* 额外信息 */}
            {product.pin_type && (
              <div className="mb-6 text-gray-600">
                <span className="font-medium">Pin Type:</span> {product.pin_type}
              </div>
            )}

            {/* 询盘按钮 */}
            <button 
              onClick={() => navigate(`/inquiry?product=${product.id}&category=${categorySlug}`)}
              className="w-full bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3"
            >
              Get Professional Quote
              <span className="text-2xl">→</span>
            </button>
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
                  <th className="px-6 py-4 text-gray-500 font-bold uppercase text-xs">中文</th>
                  <th className="px-6 py-4 text-gray-900 font-bold uppercase text-xs">Value</th>
                  <th className="px-6 py-4 text-gray-500 font-bold uppercase text-xs">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {specColumns.map(col => (
                  product.specs[col.key] !== undefined && (
                    <tr key={col.key} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-medium">{col.label_en}</td>
                      <td className="px-6 py-4 text-gray-500">{col.label_cn}</td>
                      <td className="px-6 py-4 text-gray-900 font-bold">{product.specs[col.key]}</td>
                      <td className="px-6 py-4 text-gray-500">{col.unit}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 附件区域 */}
        {attachments.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
              Available Attachments ({attachments.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attachments.map(att => (
                <div key={att.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
                      {att.attachment_type}
                    </span>
                    <span className="text-xs text-gray-400">{att.id}</span>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 mb-4">{att.attachment_number}</h4>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(att.drawing, '_blank')}
                      className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
                    >
                      View Drawing
                    </button>
                    <button
                      onClick={() => window.open(att.spec_sheet, '_blank')}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;