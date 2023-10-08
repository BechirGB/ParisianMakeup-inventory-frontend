import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CancelIcon from "@mui/icons-material/Cancel";
import { green, orange, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, fetchOrdersBetweenDates } from "../../redux/apiCalls/orderApiCall";
import { deleteOrderItem } from "../../redux/apiCalls/orderitemApiCall";
import Typography from "@mui/material/Typography";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, totalPurchase } = useSelector((state) => state.order);
  const calculateCircleCounts = (orderItems) => {
    let greenCount = 0;
    let redCount = 0;

    orderItems.forEach((orderItem) => {
      if (orderItem.quantity === orderItem.quantity_in_tunisia) {
        greenCount++;
      } else {
        redCount++;
      }
    });

    return { greenCount, redCount };
  };

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

  const handleFetchOrdersBetweenDates = () => {
    dispatch(fetchOrdersBetweenDates(startDate, endDate));
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
              <th>Available In Tunisia</th>
            </tr>
          </thead>
          <tbody>
            {data.orderItems.map((orderItem) => (
              <tr key={orderItem._id}>
                <td>{orderItem.product.name}</td>
                <td>{orderItem.product.brand}</td>
                <td>{orderItem.quantity}</td>
                <td>
                  {orderItem.quantity_in_tunisia !== null &&
                  orderItem.quantity_in_tunisia !== 0
                    ? orderItem.quantity_in_tunisia
                    : 0}
                </td>
                <td>{orderItem.price}</td>
                <td>
                  {orderItem.discount !== null && orderItem.discount !== 0
                    ? `${orderItem.discount}%`
                    : "0%"}
                </td>
                <td>
                  {orderItem.quantity === orderItem.quantity_in_tunisia ? (
                    <CheckCircleIcon style={{ color: green[500]   , fontSize: 16 }}  />
                  ) : (
                <CancelIcon style={{color: red[500]   , fontSize: 16 }} />

                  )}
                </td>
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
          order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.order_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.orderItems.some(
            (item) =>
              item.product &&
              item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.product.brand.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      : [];

  const columns = [
    {
      name: "Order Id",
      selector: (row) => row.order_Id,
      sortable: true,

    },
    {
      name: "Store",
      selector: (row) => row.store,
      sortable: true,

    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice.toFixed(2),
      sortable: true,

    },
    {
      name: "Date Ordered",
      selector: (row) => formatDate(row.dateOrdered),
      sortable: true,

    },
    {
      name: "Fully Arrived",
      selector: (row) => {
        const { greenCount, redCount } = calculateCircleCounts(row.orderItems);
     
   
        return (
          <div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: green[500], marginRight: "4px" }}>
                <CheckCircleIcon style={{ fontSize: 18 }} />
               <b> {greenCount}</b>  

              </span>
              <span style={{ color: red[500], marginRight: "4px" }}>
                <CancelIcon style={{ fontSize: 18 }} />
               <b> {redCount} </b> 

              </span>
              <span style={{ color: red[500], marginRight: "4px" }}>
              {(redCount > greenCount || redCount !== 0)  && (
                <ReportProblemIcon style={{ color:  orange[500], fontSize: 18 }} />
              )}
              </span>

              </span>

          </div>
        );
      },
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
              onClick={handleFetchOrdersBetweenDates}
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
              placeholder="Search by ID, Store, Name, Brand"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              style={{ marginRight: "16px" }}
            />
            <Button variant="outlined" onClick={handleAddNewOrder}>
              Add New Order
            </Button>
          </div>
        </div>}
        />
          
        <div className="total-purchase">
        <Typography >Total Purchases: {totalPurchase ? totalPurchase.toFixed(2) : 0}</Typography>

        </div>
      </div>
    </section>
  );
};

export default OrdersTable;









