import React from "react";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();


    const addProduct = async () => {
 
        console.warn(!name)
        if(!name || !price || !category || !company ){
            setError(true)
            return false;
        }


        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId);
        // console.log({'name' : name, 'price': price,'category': category,'company': company,'userId': userId});
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify(
            {
             'name' : name, 
             'price': price,
             'category': category,
             'company': company,
             'userId': userId
            }
                                ),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result){
            navigate('/');
        }

        // const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        
        // const raw = JSON.stringify({
        //   "name": name,
        //   "price": price,
        //   "categor": category,
        //   "company": company,
        //   "userId":userId
        // });
        
        // const requestOptions = {
        //   method: "POST",
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: "follow"
        // };
        
        // fetch("http://localhost:5000/add-product", requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => console.log(result))
        //   .catch((error) => console.error(error));

    }

    return (
        <div className="nav-ul">
            <h3>Add- Product</h3>
            
            <input type="text" placeholder="enter product name" className="inputBox"
                onChange={(e) => setName(e.target.value)} value={name} />

            {error && !name && <span className="invalid-input">Invalid Name</span>}

            <input type="text" placeholder="enter product price" className="inputBox"
                onChange={(e) => setPrice(e.target.value)} value={price} />

            {error && !name && <span className="invalid-input">Invalid Price</span>}

            <input type="text" placeholder="enter product category" className="inputBox"
                onChange={(e) => setCategory(e.target.value)} value={category} />

            {error && !name && <span className="invalid-input">Invalid Category</span>}

            <input type="text" placeholder="enter product company" className="inputBox"
                onChange={(e) => setCompany(e.target.value)} value={company} />

            {error && !name && <span className="invalid-input">Invalid Company</span>}
           
            <button type="button" onClick={(e) => { e.preventDefault(); addProduct(); }} className="appbutton">Add </button>
        </div>
    )
}

export default AddProduct;