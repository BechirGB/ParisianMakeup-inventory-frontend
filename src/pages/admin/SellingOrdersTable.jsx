import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteSellingorder, fetchSellingorders } from "../../redux/apiCalls/sellingorderApiCall";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { deleteSellingOrderItem } from "../../redux/apiCalls/sellingorderitemApiCall";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const SellingordersTable = () => {
  const [searchdeliveryId, setSearchdeliveryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const { sellingorders } = useSelector((state) => state.sellingorder);

  useEffect(() => {
    dispatch(fetchSellingorders());
  }, [dispatch]);

  const handleSearchByDate = () => {
    const filteredOrders = sellingorders.filter((order) => {
      const orderDate = new Date(order.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });
  };

  const handleAddNewOrder = () => {
    swal({
      title: "Add New Order",
      text: "Do you want to add a new order?",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
        },
        confirm: {
          text: "Add New",
          value: true,
          closeModal: false,
        },
      },
    }).then((willAddNew) => {
      if (willAddNew) {
        window.location.href = "/create-sellingorder";
      }
    });
  };

  const handleAddNewSellingOrder = (sellingorderId) => {
    swal({
      title: "Add New Order",
      text: "Do you want to add a new order?",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
        },
        confirm: {
          text: "Add New",
          value: true,
          closeModal: false,
        },
      },
    }).then((willAddNew) => {
      if (willAddNew) {
        window.location.href = `/add-newsellingitem/${sellingorderId}`;
      }
    });
  };

  const handleUpdate = (sellingorderId) => {
    swal({
      title: "Update Order",
      text: "Do you want to update this order?",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
        },
        confirm: {
          text: "Update",
          value: true,
          closeModal: false,
        },
      },
    }).then((willUpdate) => {
      if (willUpdate) {
        window.location.href = `/update-sellingorder/${sellingorderId}`;
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
        dispatch(deleteSellingorder(orderId));
        swal("Poof! The order has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The order is safe!");
      }
    });
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
        dispatch(deleteSellingOrderItem(OrderItemId));
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
              <th>Barcode:</th>
              <th>Name:</th>
              <th>Brand:</th>
              <th>Quantity:</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.sellingorderItems.map((orderItem) => (
              <tr key={orderItem._id}>
                <td>{orderItem.product.barcode}</td>
                <td>{orderItem.product.name}</td>
                <td>{orderItem.product.brand}</td>
                <td>{orderItem.quantity}</td>
                <td>{orderItem.price}</td>
                <td>
                  <Button
                    color="error"
                    size="small"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteItem(orderItem._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const columns = [
    {
      name: "deliveryId",
      selector: "deliveryId",
      sortable: true,
    },
    {
      name: "Total Price",
      selector: "totalPrice",
      sortable: true,
    },
    {
      name: "User",
      selector: "user.username",
      sortable: true,
    },


    {
      name: "Date",
      selector: "date",
      sortable: true,
      format: (row) => formatDate(row.date),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => handleUpdate(row.id)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleAddNewSellingOrder(row.id)}
          >
            Add
          </Button>
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
          title="Selling Orders List"
          columns={columns}
          data={sellingorders}
          expandableRows
          expandableRowsComponent={ExpandedContent}
          expandOnRowClicked
          pagination
          subHeader
          subHeaderComponent={
            <div className="subheader">
              <div className="subheader-content">
                <TextField
                  fullWidth
                  placeholder="Search by Store, Barcode, or Product Name"
                  value={searchdeliveryId}
                  onChange={(e) => setSearchdeliveryId(e.target.value)}
                  variant="outlined"
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

export default SellingordersTable;

