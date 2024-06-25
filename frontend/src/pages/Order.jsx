import React, { useEffect } from "react";
import OrdersCard from "../components/Orders/OrdersCard";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/store/order-slice";

const OrdersPage = () => {
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch, user?.is_freelancer]);

  const filteredOrders = user?.is_freelancer
    ? orders.filter((item) => item.freelancer.user.id === user?.profile.id)
    : orders.filter((item) => item.hire_manager.user.id === user?.profile.id);

  return (
    <div
      className="bg-black text-white p-4 mr-24 mt-10 rounded-3xl"
      data-id="element-0"
    >
      <header
        className="text-5xl font-bold mb-4 text-purple-500"
        data-id="element-1"
      >
        Manage Orders
      </header>
      <nav className="flex space-x-4 mb-4 text-5xl" data-id="element-2">
        <Tabs defaultValue="priority" data-id="element-3">
          <TabsList className="flex space-x-4" data-id="element-4">
            <TabsTrigger
              value="priority"
              className="text-white border-b-2 border-purple-500"
              data-id="element-5"
            >
              PRIORITY
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="text-gray-400"
              data-id="element-6"
            >
              ACTIVE
            </TabsTrigger>
            <TabsTrigger
              value="late"
              className="text-gray-400"
              data-id="element-7"
            >
              LATE
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="text-gray-400"
              data-id="element-8"
            >
              DELIVERED
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="text-gray-400"
              data-id="element-9"
            >
              COMPLETED
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="text-gray-400"
              data-id="element-10"
            >
              CANCELLED
            </TabsTrigger>
            <TabsTrigger
              value="starred"
              className="text-gray-400"
              data-id="element-11"
            >
              STARRED
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center" data-id="element-12">
          <Input
            type="text"
            placeholder="Search My History..."
            className="bg-black text-white border-b border-purple-500 focus:outline-none"
            data-id="element-13"
          />
          <SearchIcon className="text-purple-500 ml-2" data-id="element-14" />
        </div>
      </nav>
      <Table className="w-full text-left" data-id="element-15">
        <TableHeader className="bg-gray-800" data-id="element-16">
          <TableRow data-id="element-17">
            <TableHead className="p-2 text-purple-500" data-id="element-18">
              GIG NAME
            </TableHead>
            <TableHead className="p-2 text-purple-500" data-id="element-19">
              {user.profile?.is_freelancer ? "BUYER" : "SELLER"}
            </TableHead>
            <TableHead className="p-2 text-purple-500" data-id="element-22">
              TOTAL
            </TableHead>
            <TableHead className="p-2 text-purple-500" data-id="element-24">
              STATUS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-id="element-25">
          {filteredOrders.length === 0 ? (
            <TableRow data-id="element-26">
              <TableCell className="p-2" colSpan={5} data-id="element-27">
                No priority orders to show.
              </TableCell>
            </TableRow>
          ) : (
            filteredOrders.map((item, index) => (
              <TableRow data-id="element-26" key={index}>
                <TableCell className="p-2" data-id="element-27">
                  {item.gigs?.title}
                </TableCell>
                <TableCell className="p-2" data-id="element-27">
                  {user.profile?.is_freelancer
                    ? item.hire_manager.user.user_name
                    : item.freelancer.user.user_name}
                </TableCell>
                <TableCell className="p-2" data-id="element-27">
                  {item.total_price}
                </TableCell>
                <TableCell className="p-2" data-id="element-27">
                  {item.status}
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
