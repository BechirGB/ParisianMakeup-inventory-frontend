import Login from "../forms/Login";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {


  return (
    <section className="home">
        <div className=".home-login-background">
        </div>
        
      <div>
        <Login/>
      </div>
      
    </section>
  );
};

export default Home;
