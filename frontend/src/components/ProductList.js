import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await fetch('http://localhost:5000/pro-list');
        // headers:{
        //     authorization: JSON.parse(localStorage.getItem('token'))
        // }
        result = await result.json();
        setProduct(result);
    }

    console.log("products", products);

    const deleteProduct = async(id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete'
        });
        result = await result.json();
        if(result){
            getProduct();
        }
    }

    const searchHandle = async(event)=>{

        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if(result){
            setProduct(result);
        }
        }else{
            getProduct();
        }
        
    }


    return (
        <div className="product-list">
            <h2>Product -List</h2>
            <input type="text" className="search-product-box" placeholder="search box" 
            onChange={(e)=>searchHandle(e)}
            />

            <ul>
                <li>Sr.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
                Array.isArray(products) && products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={index.id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>₹{item.price}/-</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+ item._id}>/Update</Link></li>
                        </ul>
                    ))
                ) : (
                    <h2>No products available</h2>
                )
            }        </div>

    );
}

export default ProductList;