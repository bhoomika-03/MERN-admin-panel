
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });

    const collectData = async() => {
        console.log({"name":name,"email":email,"password":password});
        let result =await fetch('http://localhost:5000/signup',{
            method:'post',
            body: JSON.stringify({"name":name,"email":email,"password":password}),
            headers:{
                'Content-Type':'application/json'
            },
        })
        result = await result.json()
        console.log("hello",result);

        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.result.email));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/')
        }else{
            alert("please complete your information")
        }
    
    }

    return (
        <div className="register">
            <h2>Register</h2>
            <input type="text" className="inputBox"
            onChange={(e) => setName(e.target.value)} placeholder="Name" value={name} />

            <input type="text" className="inputBox" 
            onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" value={email} />

            <input type="text" className="inputBox" 
            onChange={(e) => setPassword(e.target.value)} placeholder="password" value={password} />
            
            <button onClick={collectData} className="appbutton" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;