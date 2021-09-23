import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // products to be rendered on the ui

    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        // console.log('Product API called');
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
                // console.log('Products received');

            });

    }, []);


    useEffect(() => {
        // console.log('Local Storage called');
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            // console.log(savedCart);
            for (const key in savedCart) {
                // console.log(key, savedCart[key]);
                // console.log(key);
                // console.log(products);
                const addedProduct = products.find(product => product.key === key);

                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    // console.log(addedProduct);
                    storedCart.push(addedProduct);


                }
                // console.log(key, addedProduct);

            }

            setCart(storedCart);

        }


    }, [products]);

    const handleAddToCart = (product) => {
        // console.log(product.name);
        // console.log(product);
        // console.log('clicked');
        const newCart = [...cart, product];
        setCart(newCart);
        // console.log(product);
        // save to local storage for now 
        addToDb(product.key);

    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProduct);
        // console.log(matchedProduct.length);

    }

    return (

        <>
            <div className="search-container">
                <input type="text" onChange={handleSearch} placeholder="Search Product" />
            </div>
            <div className='shop-container'>
                <div className="product-container">
                    {/* <h3>Products: {products.length}</h3> */}

                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >

                        </Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                    {/* <h3>Order Summary</h3>
                <h5>Items Ordered: {cart.length}</h5> */}
                </div>
            </div>
        </>

    );
};

export default Shop;