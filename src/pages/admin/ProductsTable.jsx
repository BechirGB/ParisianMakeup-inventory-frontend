import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton"; 
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add'; 
import { useNavigate } from 'react-router-dom';
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
    navigate('/products-table/add-product');
  };

  const handleUpdate = (productId) => {
    navigate(`/products-table/update-product/${productId}`);
  };

  const filteredProducts = Array.isArray(products) && products.length > 0
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
   

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      minWidth: "150px",
      width: "450px",
    },
    {
      name: 'Brand',
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: 'Sale Price',
      selector: (row) => row.sale_Price,
      sortable: true,
    },
    {
      name: 'Link',
   
      cell: (row) => (
        <div className="link-cell">
        <a href={row.link} target="_blank" rel="noopener noreferrer">
          {row.link}
        </a>
      </div>
       
      ),
      
    },
    {
      name: 'Actions',
      cell: (row) => (
        <IconButton
          variant="outlined"
          color="success"
          size="small"
          onClick={() => handleUpdate(row._id)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <div >
          <DataTable
            title="Liste Des Produits"
            columns={columns}
            data={filteredProducts}
            pagination
            subHeader

            subHeaderComponent={
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    placeholder="Search by Name, or Brand"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    style={{ marginRight: '16px' }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddNewProduct}
                    startIcon={<AddIcon />}
                  >
                    Add New Product
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsTable;

      
