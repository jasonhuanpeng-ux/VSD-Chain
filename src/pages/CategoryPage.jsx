import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCategoryData } from '../hooks/useProductData';
import categoriesData from '../data/categories.json';

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { data, loading, error } = useCategoryData(categorySlug);
  
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔍 调试：打印数据
  console.log('=== DEBUG ===');
  console.log('categorySlug:', categorySlug);
  console.log('loading:', loading);
  console.log('error:', error);
  console.log('data:', data);

  
  // 获取类别基本信息（用于没有详细数据的类别）
  const categoryBasic = categoriesData.find(c => c.slug === categorySlug);

  // Loading 状态
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading products...</p>
      </div>
    );
  }

  // 错误或类别不存在
  if (error || !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link> / 
          <span className="ml-2 text-gray-900 font-medium">{categoryBasic?.name || categorySlug}</span>
        </nav>
        
        <div className="bg-blue-50 p-10 rounded-xl text-center text-blue-800">
          <h2 className="text-2xl font-bold mb-2">{categoryBasic?.name || 'Category'}</h2>
          <p>Currently updating products for this category. Please check back soon or contact us directly.</p>
        </div>
      </div>
    );
  }

  const { index: categoryInfo, chains } = data;
  const allProducts = chains.products;
  const designs = categoryInfo.chain_designs;

  // 过滤产品
  const filteredProducts = allProducts.filter(product => {
    const matchesDesign = !selectedDesign || product.design_id === selectedDesign;
    const matchesSearch = !searchTerm || 
      product.chain_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.material?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDesign && matchesSearch;
  });

  // 获取选中的设计信息
  const selectedDesignInfo = selectedDesign 
    ? designs.find(d => d.design_id === selectedDesign) 
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 面包屑导航与返回按钮 */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center justify-between">
        <div>
          <Link to="/" className="hover:text-blue-600">Home</Link> / 
          <span className="ml-2 text-gray-900 font-medium">{categoryInfo.name_en}</span>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
        >
          ← Back
        </button>
      </nav>

      {/* 品类头部 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{categoryInfo.name_en}</h1>
        {categoryInfo.name_cn && (
          <p className="text-xl text-gray-500 mt-1">{categoryInfo.name_cn}</p>
        )}
        <p className="text-gray-600 mt-4 max-w-3xl">
          {categoryInfo.description_en || `Explore our range of ${categoryInfo.name_en} with detailed specifications.`}
        </p>
        
        {/* 统计 */}
        <div className="flex gap-4 mt-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {designs.length} Design Types
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {allProducts.length} Products
          </span>
        </div>
      </div>

      {/* 设计类型选择器 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Design Type</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedDesign(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              !selectedDesign
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Types ({allProducts.length})
          </button>
          {designs.map(design => {
            const count = allProducts.filter(p => p.design_id === design.design_id).length;
            return (
              <button
                key={design.design_id}
                onClick={() => setSelectedDesign(design.design_id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedDesign === design.design_id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {design.design_name_en} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 选中设计的图纸展示 */}
      {selectedDesignInfo && (
        <div className="mb-8 bg-white border rounded-xl p-6 flex items-center gap-6">
          <div className="w-48 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={selectedDesignInfo.drawing}
              alt={selectedDesignInfo.design_name_en}
              className="w-full h-full object-contain"
              onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Drawing"; }}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{selectedDesignInfo.design_name_en}</h3>
            {selectedDesignInfo.design_name_cn && (
              <p className="text-gray-500">{selectedDesignInfo.design_name_cn}</p>
            )}
            <p className="text-sm text-gray-400 mt-2">{filteredProducts.length} models available</p>
          </div>
        </div>
      )}

      {/* 搜索栏 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Chain No. or Material..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 产品表格 */}
      {filteredProducts.length > 0 ? (
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Chain No.</th>
                  {chains.spec_columns.slice(0, 6).map(col => (
                    <th key={col.key} className="px-3 py-3 text-left font-semibold text-gray-700">
                      <div>{col.label_en}</div>
                      <div className="text-xs text-gray-400 font-normal">({col.unit})</div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Material</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <Link 
                        to={`/product/${categorySlug}/${product.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {product.chain_no}
                      </Link>
                    </td>
                    {chains.spec_columns.slice(0, 6).map(col => (
                      <td key={col.key} className="px-3 py-3 text-gray-600">
                        {product.specs[col.key] !== undefined ? product.specs[col.key] : '-'}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {product.material || '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/product/${categorySlug}/${product.id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 p-10 rounded-xl text-center text-blue-800">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;