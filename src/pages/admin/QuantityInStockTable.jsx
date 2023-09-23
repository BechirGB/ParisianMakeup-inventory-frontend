import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuantityInStock } from "../../redux/apiCalls/quantityinstockApiCall";
import "./admin-table.css";
import DataTable from "react-data-table-component"; 
import TextField from "@mui/material/TextField";

const QuantityInStocksTable = () => {
  const dispatch = useDispatch();
  const { quantities, loading } = useSelector((state) => state.quantityinstock);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getQuantityInStock());
  }, [dispatch]);

  const filteredQuantities =
    Array.isArray(quantities) && quantities.length > 0
      ? quantities.filter(
          (quantity) =>
            quantity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quantity.brand.toLowerCase().includes(searchTerm.toLowerCase())
          
        )
          
      : [];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Sale Price",
      selector: (row) => row.sale_Price,
    },
    {
      name: "Stock",
      selector: (row) => row.quantity,
    },
    {
      name: "Stock In Tunisia",
      selector: (row) => row.quantity_in_tunisia,
    },
  ];

  return (
    <section className="table-container-quantity">
      <div className="table-wrapper">
        <TextField
          fullWidth
          label="Search by Name, or Brand"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <DataTable
              columns={columns}
              data={filteredQuantities}
              striped
              highlightOnHover
              responsive
              pagination
            />
          </>
        )}
      </div>
    </section>
  );
};

export default QuantityInStocksTable;





 
