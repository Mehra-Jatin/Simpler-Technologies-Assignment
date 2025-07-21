import React from 'react';
import { axiosInstance } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

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

const Shop = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const handleBuyNow = async (product) => {
    if (!user) return toast.error("Please login first");
    try {
      // Step 1: Create order on backend
      const res = await axiosInstance.post('/api/orders/create-order', {
        amount: product.price,
        items: product.id,
      });

      const { razorpayOrderId, amount, orderId } = res.data;

      // Step 2: Open Razorpay payment UI
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // public Razorpay key
        amount,
        currency: "INR",
        name: "Shoe Store",
        description: product.name,
        image: product.image,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // Step 3: Verify Payment
            const verifyRes = await axiosInstance.post('/api/orders/verify-payment', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderId,
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful!");
              navigate('/orders'); // Redirect to orders page
            } else {
              toast.error("Payment verification failed");
                navigate('/orders');
            }
          } catch (err) {
            toast.error("Payment verification error");
              navigate('/orders');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phoneNo,
        },
        theme: {
          color: "#2b6cb0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Order creation failed");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop Shoes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={product.image} alt={product.name} className="w-auto h-52 object-cover" />
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
