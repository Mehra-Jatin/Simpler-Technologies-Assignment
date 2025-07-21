import React from 'react';

const products = [
  {
    id: 1,
    name: 'Nike Air Max 90',
    image: 'https://via.placeholder.com/200x200?text=Nike+Air+Max',
    price: 7999,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Adidas Ultraboost',
    image: 'https://via.placeholder.com/200x200?text=Adidas+Ultraboost',
    price: 9999,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Puma RS-X',
    image: 'https://via.placeholder.com/200x200?text=Puma+RS-X',
    price: 6999,
    rating: 4.3,
  },
];

const Shop = () => {
  const handleBuyNow = (product) => {
    alert(`Redirecting to buy: ${product.name}`);
    // Navigate to checkout or product detail page
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop Shoes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={product.image} alt={product.name} className="w-full h-52 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-gray-600">₹{product.price}</p>
              <div className="flex items-center text-yellow-500">
                {'⭐'.repeat(Math.floor(product.rating))}
                <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
