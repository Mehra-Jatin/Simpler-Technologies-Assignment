import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

const products = [
  {
    id: 1,
    name: 'Nike Air Max 90',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0bd7e3c7-2680-444b-8ba3-3a6cff7b39ae/custom-nike-air-max-90-shoes-by-you.png',
    price: 7999,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Adidas Ultraboost',
    image: 'https://m.media-amazon.com/images/I/51b3cxB+1NL._SY695_.jpg',
    price: 9999,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Puma RS-X',
    image: 'https://assets.ajio.com/medias/sys_master/root/20230214/cV3Y/63ebb6aeaeb26924e36ee5d3/-473Wx593H-469437918-black-MODEL.jpg',
    price: 6999,
    rating: 4.3,
  },
];

const Order = () => {
  const { orders, fetchOrders } = useAuthStore();

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };
    loadOrders();
  }, []);

  const getProductDetails = (productId) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-600 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-white">No orders found.</p>
      ) : (
        orders.map((order) => {
          const productId = parseInt(order.items);
          const product = getProductDetails(productId);

          return (
            <div key={order._id} className="mb-6 p-4 rounded-lg shadow-md bg-base-100">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-error'}`}>
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="divider my-2" />

              {product ? (
                <div className="flex items-center gap-4 mb-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">Qty: 1</p>
                  </div>
                  <p className="font-semibold text-sm">₹{product.price}</p>
                </div>
              ) : (
                <p className="text-red-500 text-sm">Product not found</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Order;
