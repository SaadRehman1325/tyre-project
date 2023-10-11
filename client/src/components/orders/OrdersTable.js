import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  deleteOrder as deleteOrderApi,
  getOrders as getOrdersApi,
  updateStatus,
} from "../../api/order";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import useLoading from "../../hooks/useLoading";
import { useRouter } from "next/router";

export default function OrdersTable() {
  const { setIsLoading } = useLoading();

  const router = useRouter();
  const [orders, setorders] = useState([]);
  const [deleteOrderId, setdeleteOrderId] = useState(null);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const getOrders = () => {
    setIsLoading(true);
    getOrdersApi()
      .then((res) => {
        setIsLoading(false);
        setorders(res);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handlePreviewOrder = (orderId) => {
    router.push(`/order-preview/${orderId}`);
  };

  const deleteOrder = (orderId) => {
    setdeleteModalOpen(true);
    setdeleteOrderId(orderId);
  };

  const handleDeleteOrder = () => {
    setIsLoading(true);
    deleteOrderApi({ orderId: deleteOrderId })
      .then((res) => {
        setIsLoading(false);
        setdeleteModalOpen(false);
        getOrders();
      })
      .catch((err) => {
        setIsLoading(false);
        setdeleteModalOpen(false);
      });
  };

  const [updateApiCalled, setupdateApiCalled] = useState(false);

  const handleChangeStatus = (orderId) => {
    setIsLoading(true);
    setupdateApiCalled(true);
    updateStatus({ orderId })
      .then((res) => {
        setIsLoading(false);
        const updatedOrders = orders.map((order) => {
          if (order._id == orderId) {
            order.status = order.status == "pending" ? "delivered" : "pending";
          }
          return order;
        });

        setorders(updatedOrders);

        setupdateApiCalled(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setupdateApiCalled(false);
      });
  };

  return (
    <div>
      <ConfirmDeleteModal
        productId={deleteOrderId}
        open={deleteModalOpen}
        oncancel={() => setdeleteModalOpen(false)}
        onconfirm={handleDeleteOrder}
        heading={"Delete Order"}
        text={"Are you sure you want to delete this order?"}
      />
      {orders ? (
        <table class="table">
          <thead className="border-light">
            <tr className="bg-light border-bottom">
              <th scope="col" className="text-center">
                Customer Name
              </th>
              <th scope="col" className="text-center">
                Customer Email
              </th>
              <th scope="col" className="text-center">
                Customer Phone No.
              </th>
              <th scope="col" className="text-center">
                Delivered
              </th>
              <th scope="col" className="text-center">
                Order Placed At
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-light">
                <td className="text-center">
                  {order.first_name} {order.last_name}
                </td>
                <td className="text-center">{order.email}</td>
                <td className="text-center">{order.phone}</td>
                <td className="text-center">
                  <div class="form-check form-switch d-flex justify-content-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      checked={order.status != "pending"}
                      onClick={() => handleChangeStatus(order._id)}
                      disabled={updateApiCalled}
                    />
                  </div>
                </td>
                <td className="text-center">
                  <Moment format="hh:mma - DD-MMM-YY">{order.date}</Moment>
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      className="btn btn-light border"
                      onClick={() => deleteOrder(order._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="btn btn-light border"
                      onClick={() => handlePreviewOrder(order._id)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
