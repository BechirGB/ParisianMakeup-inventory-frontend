import { Link } from "react-router-dom";
import "./not-authorized.css";

const Unauthorized = () => {
  return (
    <section className="not-authorized">
      <div className="not-authorized-title">401</div>
      <h1 className="not-authorized-text">Unauthorized Page</h1>
    
    </section>
  );
};

export default Unauthorized;