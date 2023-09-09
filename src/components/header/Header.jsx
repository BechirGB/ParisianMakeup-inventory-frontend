import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";

const Header = () => {
  
    const [toggle, setToggle] = useState(false);

    return ( 
        <header>
        
            <HeaderLeft toggle={toggle} setToggle={setToggle} />
            <Navbar/>
            <HeaderRight />
        </header>
     );
}
 
export default Header;