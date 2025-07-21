import React, { useEffect, useState } from 'react';

// Dummy products (available on frontend)
const dummyProducts = [
  { id: 'shoe001', name: 'Nike Air Max 90', image: 'https://via.placeholder.com/150', price: 7999 },
  { id: 'shoe002', name: 'Adidas Ultraboost', image: 'https://via.placeholder.com/150', price: 9999 },
  { id: 'shoe003', name: 'Puma RS-X', image: 'https://via.placeholder.com/150', price: 6999 },
];

// Simulated API fetch
const fetchOrders = async () => {
  // Simulated backend response
  return [
    {
      _id: 'order123',
      items: [
        { productId: 'shoe001', quantity: 1 },
        { productId: 'shoe002', quantity: 2 }
      ],
      totalAmount: 27997,
      paymentStatus: 'Paid',
      createdAt: '2025-07-20T12:34:56.789Z',
    },
    {
      _id: 'order124',
      items: [
        { productId: 'shoe003', quantity: 1 }
      ],
      totalAmount: 6999,
      paymentStatus: 'Paid',
      createdAt: '2025-07-18T10:12:00.123Z',
    },
  ];
};

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const res = await fetchOrders();
      setOrders(res);
    };
    loadOrders();
  }, []);

  const getProductDetails = (productId) => {
    return dummyProducts.find((p) => p.id === productId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="mb-6 p-4 bg-base-100 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-success">₹{order.totalAmount}</p>
                <p className={`badge ${order.paymentStatus === 'Paid' ? 'badge-success' : 'badge-error'}`}>
                  {order.paymentStatus}
                </p>
              </div>
            </div>

            <div className="divider my-2" />

            {order.items.map((item, index) => {
              const product = getProductDetails(item.productId);
              if (!product) return null;

              return (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">₹{product.price * item.quantity}</p>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
