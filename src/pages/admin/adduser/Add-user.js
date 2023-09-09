import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../forms/form.css";
import { useDispatch, useSelector } from "react-redux";
import { addUserProfile } from "../../../redux/apiCalls/profileApiCall";
import swal from "sweetalert";

const AddUserPage = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(username.trim() === "") return toast.error("Username is required");
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        dispatch(addUserProfile({ username, email, password }))
        navigate('/users-table')
    }


 


    return ( 
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} >
                <div className="input-container">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input 
                     type="text" 
                     id="username"
                     placeholder="Enter your username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input 
                     type="email" 
                     id="email"
                     placeholder="Enter your email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input 
                     type="password" 
                     className="form-input"
                     id="password"
                     placeholder="Enter your password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">
                    Register
                </button>
            </form>
            
        </section>
     );
}
 
export default AddUserPage;