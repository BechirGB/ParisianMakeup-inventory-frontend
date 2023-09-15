import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuantityInStock } from "../../redux/apiCalls/quantityinstockApiCall";
import "./admin-table.css";
import TextField from '@mui/material/TextField';

const QuantityInStocksTable = () => {
  const dispatch = useDispatch();
  const { quantities, loading } = useSelector((state) => state.quantityinstock);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getQuantityInStock());
  }, [dispatch]);

  const filteredQuantities = quantities.filter(
    (quantity) =>
      quantity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quantity.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="table-container">
      <div className="table-wrapper">
        <h1 className="table-title">Quantité dans le stock</h1>
        <TextField
          fullWidth
          label="Search by  Name, or Brand"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th> Sale Price</th>
                <th>Stock</th>
                <th> Stock In Tunisia</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuantities.map((quantity) => (
                <tr key={quantity.id}>
                  <td>{quantity.name}</td>
                  <td>{quantity.brand}</td>
                  <td>{quantity.sale_Price}</td>
                  <td>{quantity.quantity}</td>
                  <td>{quantity.quantity_in_tunisia}</td>

                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default QuantityInStocksTable;


 
