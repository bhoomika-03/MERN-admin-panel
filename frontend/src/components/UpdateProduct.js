
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const UpdateProduct = () => {

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDeatils();
    },[])


    const getProductDeatils = (async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/products/${params.id}`);
        result = await result.json()
        console.warn(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    })

    const updateProduct = async() => {
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body: JSON.stringify({name,price,category,company}),
            headers: {
                'Content-Type':'application/json'
            },

        })
            result =  await result.json();
            console.warn(result)
            navigate('/')
    }

    return (
        <div className="nav-ul">
            <h3>Update- Product</h3>
            <input type="text" placeholder="enter product name" className="inputBox"
                onChange={(e) => setName(e.target.value)} value={name} />


            <input type="text" placeholder="enter product price" className="inputBox"
                onChange={(e) => setPrice(e.target.value)} value={price} />


            <input type="text" placeholder="enter product category" className="inputBox"
                onChange={(e) => setCategory(e.target.value)} value={category} />


            <input type="text" placeholder="enter product company" className="inputBox"
                onChange={(e) => setCompany(e.target.value)} value={company} />


            <button type="button" onClick={(e) => { e.preventDefault(); updateProduct(); }} className="appbutton">Update </button>
        </div>
    )
}

export default UpdateProduct;