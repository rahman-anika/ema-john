import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    // console.log(props.product);
    // console.log(props);
    const { name, img, price, stock, seller, star } = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h4 className="product-name">{props.product.name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
                <p><small>Only {stock} left in stock - order soon </small></p>

                <Rating

                    initialRating={star}
                    readonly
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"></Rating>
                <br />

                <button onClick={() => props.handleAddToCart(props.product)} className="button-regular">{cartIcon} add to cart</button>

            </div>

        </div>
    );
};

export default Product;