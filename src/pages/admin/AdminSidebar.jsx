import "./sidebar.scss";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../redux/apiCalls/authApiCall";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">The Parisian Makeup Store</span>
        </Link>
      </div>
      <hr />
      <br></br>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/dashboard" style={{ textDecoration: "none" }}> {/* Corrected typo in the URL */}
            <li>
              <DashboardIcon className="icon" />
              <span>Tableau De Bord</span>
            </li>
          </Link>
          <br></br>
          
          <p className="title">LISTS</p>
          {
          user?.isAdmin && (
          <Link to="/users-table" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Utilisateurs</span>
            </li>
          </Link>
          )
        }
          {
          user?.isAdmin && (
          <Link to="/products-table" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Produits</span>
            </li>
          </Link>
          )
        }
        {
          user?.isAdmin && (
          <Link to="/orders-table" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span> Achat</span>
            </li>
          </Link>
          )
        }
          <Link to="/sellings-table" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span> Vente</span>
          </li>
          </Link>
          <br></br>

          <p className="title">USER</p>
          
           

          <li onClick={logoutHandler} className="header-dropdown-item">
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    
    </div>
  );
};

export default AdminSidebar;
