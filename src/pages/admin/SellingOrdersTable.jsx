import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteSellingorder,fetchSellingOrdersBetweenDates, fetchSellingorders } from "../../redux/apiCalls/sellingorderApiCall";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton"; 
import Typography from "@mui/material/Typography"; 
import { deleteSellingOrderItem } from "../../redux/apiCalls/sellingorderitemApiCall";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};


const SellingordersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sellingorders ,totalSales} = useSelector((state) => state.sellingorder);

  useEffect(() => {
    dispatch(fetchSellingorders());
  }, [dispatch]);

  const handleAddNewOrder = () => {
    navigate("add-sellingorder");
  };

  const handleAddNewSellingOrder = (sellingorderId) => {
    navigate(`add-newsellingitem/${sellingorderId}`);
  };

  const handleUpdate = (sellingorderId) => {
    navigate(`update-sellingorder/${sellingorderId}`);
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
  const handleFetchSellingOrdersBetweenDates = () => {
    dispatch(fetchSellingOrdersBetweenDates(startDate, endDate));
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
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.sellingorderItems.map((orderItem) => (
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
                 
                    {orderItem.price}
                
                </td>
                <td>
                  <IconButton
                    color="error"
                    size="small"
                    variant="outlined"
                    onClick={() => handleDeleteItem(orderItem._id)}
                  >
                    <DeleteIcon />
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
  Array.isArray(sellingorders) && sellingorders.length > 0
    ? sellingorders.filter((sellingorder) => 
        sellingorder.deliveryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sellingorder.sellingorderItems.some(
          (item) =>
            item.product &&
            item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.product.brand.toLowerCase().includes(searchTerm.toLowerCase())  
        )
      )
    : [];


  const columns = [
    {
      name: "deliveryId",
      selector: (row) => row.deliveryId,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice.toFixed(2),
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => formatDate(row.date),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
        
          <IconButton
            color="success"
            size="small"
            onClick={() => handleUpdate(row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            variant="outlined"
            onClick={() => handleDelete(row.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleAddNewSellingOrder(row.id)}
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
          title="Liste Des Ventes"
          columns={columns}
          data={filteredOrders}
          expandableRows
          expandableRowsComponent={ExpandedContent}
          expandOnRowClicked
          pagination
          subHeader
          subHeaderComponent={
            <div className="subheader">
              <div className="date-filter-container">
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="outlined"
              onClick={handleFetchSellingOrdersBetweenDates}
              style={{ marginLeft: "16px" }}
            >
              Fetch Orders
            </Button>
          </div>
          <br></br>
              <div
                className="subheader-content"
                style={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  fullWidth
                  placeholder="Search by delivery id, or Product Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  style={{ marginRight: "16px" }}
                />
                <Button variant="outlined" onClick={handleAddNewOrder}>
                  Add New Selling
                </Button>
              </div>
            </div>
          }
        />
        <div className="total-purchase">
          <Typography>Total Sales:{totalSales ? totalSales.toFixed(2) : 0}</Typography>
        </div>
      </div>
    </section>
  );
};

export default SellingordersTable;


