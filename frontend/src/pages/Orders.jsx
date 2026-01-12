// import React from 'react'

// const Orders = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Orders

import React, { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../api/axiosInstance";
import { Package, Clock, MapPin } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/order/fetchdetails", {
          withCredentials: true,
        });
        console.log(res.data);
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <Package size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">
              You have not placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID:{" "}
                      <span className="font-medium text-gray-700">
                        {order._id}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 w-fit">
                    {order.orderStatus}
                  </span>
                </div>

                {/* SHIPPING ADDRESS */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <MapPin size={16} />
                    Delivery Address
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.shippingAddress.name},{" "}
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city} -{" "}
                    {order.shippingAddress.pincode}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>

                {/* ORDER ITEMS */}
                <div className="divide-y">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 py-4"
                    >
                      {/* <img
                        src={item.product?.image_url}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      /> */}

                      <img
  src={`${API_BASE_URL}${item.product.image_url}`}
  alt={item.product?.name}
  className="w-16 h-16 object-cover rounded-lg border"
/>


                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.product?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ORDER FOOTER */}
                <div className="flex justify-between items-center mt-4 border-t pt-4">
                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
