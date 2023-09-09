import ProductItem from "./ProductItem";
import "./products.css";

const productList = ({ products }) => {
    return ( 
    <div className="product-list">
        {products.map(item => <ProductItem product={item} key={item._id} />)}
    </div> 
    );
}
 
export default productList;