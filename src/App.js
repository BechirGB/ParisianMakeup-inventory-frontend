import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/forms/Login";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import UsersTable from "./pages/admin/UsersTable";
import ProductsTable from "./pages/admin/ProductsTable";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProduct from "./pages/create-product/CreateProduct";
import OrdersTable from "./pages/admin/OrdersTable";
import CreateOrder from "./pages/admin/createorder/Create-Order";
import SellingordersTable from "./pages/admin/SellingOrdersTable";
import CreateSelling from "./pages/admin/createsellingorder/Create-SellingOrder";
import UpdateProduct from "./pages/admin/updateProduct/Update-Product";
import CreateOrUpdateProduct from "./pages/create-product/CreateProduct";
import UpdateOrderPage from "./pages/admin/updateorder/updateOrder";
import UpdateSellingOrder from "./pages/admin/updateSellingOrder/update-SellingOrder";
import AddUserPage from "./pages/admin/adduser/Add-user";
import UpdateSellingOrderPage from "./pages/admin/updateSellingOrder/update-SellingOrder";
import UpdateOrderItemPage from "./pages/admin/updateorder/updateorderitem";
import UpdateSellingOrderItemPage from "./pages/admin/updateSellingOrder/update-sellingOrderItem";
import AddOrderItemPage from "./pages/admin/addorderitem/AddOrderItem";
import AddSellingOrderItemPage from "./pages/admin/addsellingorderitem/AddSellingOrdeItem";
import UpdateProfileModal from "./pages/profile/UpdateProfileModal";
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
     
      
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={user ? <AdminDashboard /> : <Navigate to="/" />}
        />
 


            <Route

        path="/dashboard"
      
            element={ user ? <AdminDashboard /> : <Navigate to="/" />}
          />
    
   
        <Route
            path="users-table">
        <Route
        index
            element={ user?.isAdmin ?<UsersTable/> : <Navigate to="/" />}
          />
              <Route
          path="add-user"
          element={ user?.isAdmin ? <AddUserPage /> : <Navigate to="/" />}
        />
           <Route
          path="update-user"
          element={ user?.isAdmin ? <UpdateProfileModal /> : <Navigate to="/" />}
        />
      
      </Route>
          <Route 
            path="products-table">
            <Route 
            index
            element={user?.isAdmin ? <ProductsTable /> : <Navigate to="/" />}
          />
 <Route
            path="add-product"
            element={user?.isAdmin ? <CreateOrUpdateProduct /> : <Navigate to="/" />}
            
          />
           <Route
  path="update-product/:productId" 
  element={user?.isAdmin ? <UpdateProduct /> : <Navigate to="/" />}
/>

            
          </Route>
          
       

         
        
       
          <Route path="orders-table">
          <Route
           index
            element={user?.isAdmin ? <OrdersTable /> : <Navigate to="*" />}
          />
           <Route
            path="create-order"
            element={user?.isAdmin ? <CreateOrder /> : <Navigate to="*" />}
          />
          <Route
            path="update-order/:orderId"
            element={user?.isAdmin ? <UpdateOrderPage /> : <Navigate to="/" />}
            
          />
          <Route
            path="update-orderitem/:orderItemid"
            element={user?.isAdmin ? <UpdateOrderItemPage /> : <Navigate to="/" />}
            
          />
                <Route
            path="add-newitem/:orderId"
            element={user?.isAdmin ? <AddOrderItemPage/> : <Navigate to="/" />}
            
          />
          
          </Route>
          
          
      
      <Route  path="sellings-table">
            <Route
            index
            element={user? <SellingordersTable /> : <Navigate to="/" />}
          />
          <Route
            path="add-sellingorder"
            element={user? <CreateSelling /> : <Navigate to="/" />}
          />
             <Route
            path="update-sellingorder/:sellingorderId"
            element={user? <UpdateSellingOrderPage /> : <Navigate to="/" />}
          />
  <Route
            path="add-newsellingitem/:sellingorderId"
            element={user? <AddSellingOrderItemPage/> : <Navigate to="/" />}
            
          />
   <Route
            path="update-sellingorderitem/:sellingorderItemid"
            element={user? <UpdateSellingOrderItemPage /> : <Navigate to="/" />}
          />


            </Route>

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


