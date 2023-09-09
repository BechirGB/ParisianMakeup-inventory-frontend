import Header from "../../components/header/Header";
import Navbar from "../../components/header/Navbar";
import "./admin.css";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    return ( 
    <section className="admin-dashboard">
           <AdminSidebar />

           <AdminMain />
   

    </section> );
}
 
export default AdminDashboard;