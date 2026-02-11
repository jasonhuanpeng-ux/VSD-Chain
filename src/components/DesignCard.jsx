import React, { useState } from 'react';

const DesignCard = ({ design, productCount, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
    >
      {/* Image */}
      <div className="aspect-video bg-gray-100 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            src={design.drawing}
            alt={design.design_name_en}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {design.design_name_en}
        </h3>
        {design.design_name_cn && (
          <p className="text-sm text-gray-500 mb-2">{design.design_name_cn}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {productCount} models
          </span>
          <span className="text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
            View All →
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;