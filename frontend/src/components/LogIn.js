import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
    const handleLogin = async () => {
        console.warn("email,password", email, password);
        let result =await fetch('http://localhost:5000/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }

        });
        result = await result.json();
        console.warn(result);
     
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert("enter details");
        }
    }


    return (
        <div className="register">
            <h2>Login</h2>
            <input type="email" className="inputBox" placeholder="email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder="password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="appbutton" onClick={(e)=>{e.preventDefault();handleLogin()}} type="button">Login</button>
        </div>
    );
};

export default Login;