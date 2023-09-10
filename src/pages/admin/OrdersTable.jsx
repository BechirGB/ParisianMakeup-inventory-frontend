import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';

import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../../redux/apiCalls/orderApiCall";
import { deleteOrderItem } from "../../redux/apiCalls/orderitemApiCall";
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
    
        navigate(`/orders-table/update-order/${orderId}`)
   
  };
  const handleAddItem = (orderId) => {
    
    
    navigate (`/orders-table/add-newitem/${orderId}`);
     
  };

  const handleAddNewOrder = () => {
    
        navigate ("/orders-table/create-order");
   
  };
  const handleDeleteItem  = (OrderItemId) => {
  
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

  const  handleDelete = (orderId) => {
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
            <th>Barcode:</th>
            <th>Name:</th>
            <th>Brand:</th>
            <th>Quantity:</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {data.orderItems.map((orderItem) => (
            <tr key={orderItem._id}>
              <td>{orderItem.product.barcode}</td>
              <td>{orderItem.product.name}</td>
              <td>{orderItem.product.brand}</td>
              <td>{orderItem.quantity}</td>
              <td>{orderItem.price}.00</td>
              <td>{orderItem.discount}%</td>
                    <td> 
           
          <Button  variant="outlined" startIcon={<DeleteIcon />}             onClick={() => handleDeleteItem(orderItem._id)}>

</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const filteredOrders =
Array.isArray(orders) &&
orders.filter((order) =>
  order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.orderItems.some(
    (item) =>
      item.product &&
      (item.product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )
);
  const columns = [
    {
      name: "Store",
      selector: "store",
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
      name: "Date Ordered",
      selector: "dateOrdered",
      sortable: true,
      format: (row) => formatDate(row.dateOrdered),
    },
    {
      name: "Actions",
      cell: (row) => (
           <div >
       
          <Button
            variant="outlined" color="error"  size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"   color="success" size="small"
            onClick={() => handleUpdate(row.id)}
          >
            Update
          </Button>

<Button variant="outlined" size="small" onClick={() => handleAddItem(row.id)}
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
          title="Liste Des Ordres D'achat"
          columns={columns}
          data={filteredOrders}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

export default OrdersTable;




