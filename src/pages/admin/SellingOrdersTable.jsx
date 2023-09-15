import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { sellingorders } = useSelector((state) => state.sellingorder);

  useEffect(() => {
    dispatch(fetchSellingorders());
  }, [dispatch]);

  

  const handleAddNewOrder = () => {

       navigate("add-sellingorder");
      }
  

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
  
  const filteredOrders = Array.isArray(sellingorders) && sellingorders.length > 0
  ? sellingorders.filter((sellingorder) => {
      const searchTermLower = searchTerm.toLowerCase();
      const orderItems = sellingorder.orderItems;

      return (
        sellingorder.deliveryId ||
        orderItems.some((item) =>
          item.product &&
          (
            item.product.name.toLowerCase().includes(searchTermLower) ||
            item.product.brand.toLowerCase().includes(searchTermLower)
          )
        )
      );
    })
  : [];

  const columns = [
    {
      name: "deliveryId",
      selector: (row) => row.deliveryId,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user.username,
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
          title="Liste Des Vents"
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
                  placeholder="Search by delivery id, or Product Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                />
                <Button variant="outlined" onClick={handleAddNewOrder}>
                  Add New Selling
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

