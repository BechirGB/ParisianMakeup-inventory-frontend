import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
 import Button from '@mui/material/Button';

import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../../redux/apiCalls/orderApiCall";
import { deleteOrderItem } from "../../redux/apiCalls/orderitemApiCall";
import Typography from "@mui/material/Typography"; 

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdate = (orderId) => {
    navigate(`/orders-table/update-order/${orderId}`);
  };

  const handleAddItem = (orderId) => {
    navigate(`/orders-table/add-newitem/${orderId}`);
  };

  const handleAddNewOrder = () => {
    navigate("/orders-table/create-order");
  };

  const handleUpdateItem = (OrderItemId) => {
    navigate(`/orders-table/update-orderitem/${OrderItemId}`);
  };

  const handleDeleteItem = (OrderItemId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteOrderItem(OrderItemId));
        swal("Poof! The order has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The order is safe!");
      }
    });
  };

  const handleDelete = (orderId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteOrder(orderId));
        swal("Poof! The order has been deleted!", {
          icon: "success",
        });
      
      } else {
        swal("The order is safe!");
      }
    });
    
  };

  const ExpandedContent = ({ data }) => {
    return (
      <div className="expanded-content">
        <table>
          <thead>
            <tr>
              <th>Name:</th>
              <th>Brand:</th>
              <th>Quantity:</th>
              <th>Quantity In Tunisia</th>
              <th>Price</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {data.orderItems.map((orderItem) => (
              <tr key={orderItem._id}>
                <td>
                    {orderItem.product.name}
                </td>
                <td>
                    {orderItem.product.brand}
                </td>
                <td>
                    {orderItem.quantity}
                </td>
                <td>
                    {orderItem.quantity_in_tunisia}
                </td>
                <td>{orderItem.price}.00</td>
                <td>{orderItem.discount}%</td>
                <td>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDeleteItem(orderItem._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => handleUpdateItem(orderItem.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const filteredOrders =
    Array.isArray(orders) && orders.length > 0
      ? orders.filter((order) =>
          order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||     order.order_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some(
            (item) =>
              item.product &&
              item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : [];

  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.order_Id,
    },
    {
      name: "Store",
      selector: (row) => row.store,
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice,
    },
    {
      name: "Date Ordered",
      selector: (row) => formatDate(row.dateOrdered),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          

          <IconButton
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleUpdate(row.id)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleAddItem(row.id)}
          >
            <AddIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <DataTable
          className="table-color"
          title="La liste des achats "
          columns={columns}
          data={filteredOrders}
          expandableRows
          expandableRowsComponent={ExpandedContent}
          expandOnRowClicked
          pagination
          subHeader
          subHeaderComponent={
            <div className="subheader">
              <div
                className="subheader-content"
                style={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  fullWidth
                  placeholder="Search by ID ,Store, or Product Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  style={{ marginRight: "16px" }}
                />
                <Button variant="outlined" onClick={handleAddNewOrder}>
                  Add New Order
                </Button>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default OrdersTable;






