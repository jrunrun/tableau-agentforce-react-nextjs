'use client';

import { products } from '@/data/products';

export default function ExplorerPage() {
  const getSalesRankSymbol = (rank: number) => {
    return '$'.repeat(rank);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">E-Bike Product Explorer</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-xl font-semibold text-primary-600">
                    ${product.price.toLocaleString()}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Sales Rank: {getSalesRankSymbol(product.salesRank)}</span>
                    <span>Sales: {product.sales.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-red-500">
                    Returns: {product.returns}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 