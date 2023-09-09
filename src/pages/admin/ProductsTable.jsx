import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/apiCalls/productApiCall';
import AdminSidebar from './AdminSidebar';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddNewProduct = () => {
    swal({
      title: 'Add New Order',
      text: 'Do you want to add a new order?',
      icon: 'info',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: null,
          visible: true,
        },
        confirm: {
          text: 'Add New',
          value: true,
          closeModal: false,
        },
      },
    }).then((willAddNew) => {
      if (willAddNew) {
        window.location.href = '/create-product';
      }
    });
  };

  const handleUpdate = (productId) => {
    swal({
      title: 'Update Product',
      text: 'Do you want to update this product?',
      icon: 'info',
      buttons: {
        cancel: {
          text: 'Cancel',
          value: null,
          visible: true,
        },
        confirm: {
          text: 'Update',
          value: true,
          closeModal: false,
        },
      },
    }).then((willUpdate) => {
      if (willUpdate) {
        window.location.href = `/update-product/${productId}`;
      }
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Barcode',
      selector: 'barcode',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Brand',
      selector: 'brand',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button color="success" variant="outlined" size="small" onClick={() => handleUpdate(row._id)}>
            Update
          </Button>
        </>
      ),
    },
  ];

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <br />
        <DataTable
          title="Products List"
          columns={columns}
          data={filteredProducts}
          pagination
          subHeader
          subHeaderComponent={
            <div>
              <TextField
                fullWidth
                placeholder="Search by Barcode, Name, or Brand"
                value={searchTerm}
                style={{ marginTop: '16px' }}

                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
              />
              <Button
                variant="outlined"
                onClick={handleAddNewProduct}
              >
                Add New Product
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default ProductsTable;

      
