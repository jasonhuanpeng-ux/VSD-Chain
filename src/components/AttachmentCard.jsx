import React, { useState } from 'react';

const AttachmentCard = ({ attachment }) => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [imageError, setImageError] = useState({});

  const handleImageError = (type) => {
    setImageError(prev => ({ ...prev, [type]: true }));
  };

  return (
    <>
      <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
            {attachment.attachment_type}
          </span>
          <span className="text-xs text-gray-400">
            {attachment.id}
          </span>
        </div>

        {/* Attachment Number */}
        <h4 className="font-semibold text-gray-900 mb-2">
          {attachment.attachment_number}
        </h4>
        
        <p className="text-sm text-gray-500 mb-4">
          For Chain: <span className="font-medium text-gray-700">{attachment.parent_chain_no}</span>
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDrawing(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Drawing
          </button>
          <button
            onClick={() => setShowSpecs(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Specs
          </button>
        </div>
      </div>

      {/* Drawing Modal */}
      {showDrawing && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDrawing(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {attachment.attachment_number} - Drawing
              </h3>
              <button 
                onClick={() => setShowDrawing(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {imageError.drawing ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Drawing not available</p>
                  <p className="text-xs mt-2">{attachment.drawing}</p>
                </div>
              ) : (
                <img
                  src={attachment.drawing}
                  alt={`${attachment.attachment_number} drawing`}
                  className="max-w-full h-auto"
                  onError={() => handleImageError('drawing')}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Specs Modal */}
      {showSpecs && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSpecs(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {attachment.attachment_number} - Specifications
              </h3>
              <button 
                onClick={() => setShowSpecs(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {imageError.specs ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Spec sheet not available</p>
                  <p className="text-xs mt-2">{attachment.spec_sheet}</p>
                </div>
              ) : (
                <img
                  src={attachment.spec_sheet}
                  alt={`${attachment.attachment_number} specifications`}
                  className="max-w-full h-auto"
                  onError={() => handleImageError('specs')}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AttachmentCard;