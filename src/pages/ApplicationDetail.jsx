import React from 'react';
import { useParams, Link } from 'react-router-dom';
import appsData from '../data/applications.json';
import categoriesData from '../data/categories.json';

const ApplicationDetail = () => {
  const { appSlug } = useParams();
  const app = appsData.find(a => a.slug === appSlug);

  if (!app) return <div className="p-20 text-center">Application not found.</div>;

  // 获取关联的品类详情
  const relatedCategories = categoriesData.filter(cat => 
    app.relatedCategorySlugs.includes(cat.slug)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header with Image */}
      <div className="relative h-96 bg-slate-900 text-white overflow-hidden">
        <img 
          src={app.heroImage} 
          alt={app.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 flex flex-col justify-end h-full">
          <Link to="/applications" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Applications
          </Link>
          <h1 className="text-5xl font-black mb-6">{app.name}</h1>
          <p className="text-xl text-slate-300 max-w-3xl">{app.summary}</p>
        </div>
      </div>

      {/* Recommended Solutions */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">Recommended Chain Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedCategories.map(cat => (
            <div key={cat.id} className="border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-500 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{cat.name}</h3>
              <p className="text-gray-600 mb-6">{cat.summary}</p>
              <Link 
                to={`/products/${cat.slug}`}
                className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
              >
                Browse Products
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;