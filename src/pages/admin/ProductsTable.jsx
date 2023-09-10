import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/apiCalls/productApiCall';
import AdminSidebar from './AdminSidebar';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleAddNewProduct = () => {
       navigate( '/products-table/add-product');
    
  };

  const handleUpdate = (productId) => {

       navigate( `/products-table/update-product/${productId}`);
   
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
   
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
      name: 'Link',
      cell: (row) => (
        <a href={row.link} target="_blank" rel="noopener noreferrer">
          {row.link}
        </a>
      ),
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
          title="Liste Des Produits"
          columns={columns}
          data={filteredProducts}
          pagination
          subHeader
          subHeaderComponent={
            <div>
              <TextField
                fullWidth
                placeholder="Search by  Name, or Brand"
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

      
