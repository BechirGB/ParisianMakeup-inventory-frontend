import { Link } from "react-router-dom";

const ProductItem = ({ product ,username, userId}) => {

    const profileLink = userId ? `/profile/${userId}` : `/profile/${product?.user?._id}`;

    return ( 
        <div className="product-item">
            <div className="product-item-image-wrapper">
            </div>
            <div className="product-item-info-wrapper">
                <div className="product-item-info">
                    <div className="product-item-author">
                        <strong>User: </strong>
                        <Link 
                         className="product-item-username" 
                         to={profileLink}>
                            {username ? username : product?.user.username}
                        </Link>
                    </div>
                    <div className="product-item-date">
                        {new Date(product?.createdAt).toDateString()}
                    </div>
                </div>
                <div className="product-item-details">
                    <h4 className="product-item-title">{product?.name}</h4>
                    <h5 className="product-item-title"> {product?.brand}</h5>
                   
                </div>
               
                <Link className="product-item-link" to={`/products/details/${product?._id}`}>
                   Show More...
                </Link>
            </div>
        </div>
     );
}
 
export default ProductItem;