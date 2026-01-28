import React from 'react';
import { Link } from 'react-router-dom';
import appsData from '../data/applications.json';

const Applications = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Industry Applications</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our precision-engineered chains power diverse industries worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appsData.map((app) => (
            <Link 
              to={`/applications/${app.slug}`} 
              key={app.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
            >
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                {/* 应用图片 */}
                <img 
                  src={app.heroImage} 
                  alt={app.name}
                  className="w-full max-h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => e.target.src = "https://placehold.co/600x400?text=" + app.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white">{app.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6 line-clamp-2">{app.summary}</p>
                <span className="text-blue-600 font-bold group-hover:gap-3 transition-all flex items-center gap-2">
                  View Solutions <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;