import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductTable = ({ products, specColumns, categorySlug, showDesignColumn = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  // 排序逻辑
  const sortedProducts = React.useMemo(() => {
    let filtered = [...products];
    
    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.chain_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.material?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = sortConfig.key === 'chain_no' ? a.chain_no : a.specs[sortConfig.key];
        let bVal = sortConfig.key === 'chain_no' ? b.chain_no : b.specs[sortConfig.key];
        
        if (aVal === undefined) return 1;
        if (bVal === undefined) return -1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return sortConfig.direction === 'asc' 
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return filtered;
  }, [products, sortConfig, searchTerm]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="text-gray-300 ml-1">↕</span>;
    }
    return <span className="text-blue-600 ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 搜索栏 */}
      <div className="p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search by Chain No. or Material..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="ml-4 text-sm text-gray-500">
          {sortedProducts.length} products
        </span>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 sticky left-0 bg-gray-50 z-10"
                onClick={() => handleSort('chain_no')}
              >
                Chain No. <SortIcon columnKey="chain_no" />
              </th>
              {specColumns.map(col => (
                <th
                  key={col.key}
                  className="px-3 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex flex-col">
                    <span>{col.label_en}</span>
                    <span className="text-xs text-gray-400 font-normal">({col.unit})</span>
                  </div>
                  <SortIcon columnKey={col.key} />
                </th>
              ))}
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Material</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900 sticky left-0 bg-white z-10">
                  <Link 
                    to={`/product/${categorySlug}/${product.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {product.chain_no}
                  </Link>
                </td>
                {specColumns.map(col => (
                  <td key={col.key} className="px-3 py-3 text-gray-600 whitespace-nowrap">
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

      {sortedProducts.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No products found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default ProductTable;