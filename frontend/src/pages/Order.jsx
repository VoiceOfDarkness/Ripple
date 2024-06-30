import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, updateOrder } from "@/store/order-slice";
import { getProfile } from "@/store/profile-slice";
import { useState } from "react";

const OrdersPage = () => {
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const statuses = ["all", "pending", "in_progress", "completed", "cancelled"];
  const colors = {
    pending: "yellow-500",
    in_progress: "green-500",
    completed: "blue-500",
    cancelled: "red",
  };
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(getOrder());
    dispatch(getProfile());
  }, [dispatch, user.is_freelancer, update]);

  const filteredOrders = user.profile?.is_freelancer
    ? orders.filter((item) => item.freelancer.user.id === user?.profile.id)
    : orders.filter((item) => item.hire_manager.user.id === user?.profile.id);

  const finalOrders =
    selectedStatus === "all"
      ? filteredOrders
      : filteredOrders.filter((item) => item.status === selectedStatus);

  const handleChange = (order_id, status) => {
    dispatch(updateOrder(order_id, status));
    setUpdate(!update);
  };

  const handleClick = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div
      className="bg-black text-white p-4 mr-24 mt-10 rounded-3xl overflow-hidden"
      data-id="element-0"
    >
      <header
        className="text-5xl font-bold mb-4 text-purple-500"
        data-id="element-1"
      >
        Manage Orders
      </header>
      <nav className="flex space-x-4 mb-8" data-id="element-2">
        <div className="flex rounded-md overflow-hidden">
          {statuses.map((status) => (
            <div
              key={status}
              onClick={() => handleClick(status)}
              className={`cursor-pointer px-7 py-2 text-black ${
                selectedStatus === status ? " bg-purple text-white" : "bg-white"
              } duration-300`}
            >
              {status === "in_progress"
                ? "accepted".toUpperCase()
                : status.toUpperCase()}
            </div>
          ))}
        </div>
      </nav>
      <Table className="w-full text-left" data-id="element-15">
        <TableHeader className="bg-gray-800" data-id="element-16">
          <TableRow data-id="element-17">
            <TableHead
              className="p-2 text-2xl text-purple-500"
              data-id="element-18"
            >
              GIG NAME
            </TableHead>
            <TableHead
              className="p-2 text-2xl text-purple-500"
              data-id="element-19"
            >
              {user.profile?.is_freelancer ? "BUYER" : "SELLER"}
            </TableHead>
            <TableHead
              className="p-2 text-2xl text-purple-500"
              data-id="element-22"
            >
              TOTAL
            </TableHead>
            <TableHead
              className="p-2 text-2xl text-purple-500"
              data-id="element-24"
            >
              STATUS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-id="element-25">
          {finalOrders.length === 0 ? (
            <TableRow data-id="element-26">
              <TableCell
                className="p-2 text-2xl"
                colSpan={5}
                data-id="element-27"
              >
                No priority orders to show.
              </TableCell>
            </TableRow>
          ) : (
            finalOrders.map((item, index) => (
              <TableRow data-id="element-26" key={index}>
                <TableCell className="p-2 text-2xl" data-id="element-27">
                  {item.gigs?.title}
                </TableCell>
                <TableCell className="p-2 text-2xl" data-id="element-27">
                  {user.profile?.is_freelancer
                    ? item.hire_manager.user.user_name
                    : item.freelancer.user.user_name}
                </TableCell>
                <TableCell className="p-2 text-2xl" data-id="element-27">
                  {item.total_price}
                </TableCell>
                <TableCell
                  className="p-2 text-2xl flex items-center gap-8"
                  data-id="element-27"
                >
                  {user.profile?.is_freelancer ? (
                    <select
                      className="bg-black"
                      value={item.status}
                      onChange={(e) => {
                        handleChange(item.id, e.target.value);
                      }}
                    >
                      <option value="pending">pending</option>
                      <option value="in_progress">accepted</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  ) : (
                    item.status === "in_progress" ? "accepted" : item.status
                  )}
                  <div
                    className={`w-3 h-3 rounded-full bg-${colors[item.status]}`}
                  ></div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
