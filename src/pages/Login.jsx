import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { postSignin } from '../api/Api';
import { successNotify , errorNotify } from '../layout/BaseFunc.jsx';


export default function Login(){

    const navigate = useNavigate();
    const [userInfo , setUserInfo] = useState({
        username: "",
        password: ""
    });
    const [token, setToken] = useState("");
    const [expired, setExpired] = useState("");


    const headleInputChange = (e) =>{
        const { name , value} = e.target;
        setUserInfo({
            ...userInfo,
            [name]:value
        })
    }


    const login = async () =>{
        try{
            const res = await postSignin(userInfo);
            setToken(res.data.token)
            setExpired(res.data.expired)
            axios.defaults.headers.common['Authorization'] = res.data.token;
            navigate('/')

            
        }catch(err){
            errorNotify(err.response.data.message)    
        }
        
    }

    useEffect(() => {
        if(!token) return;
        document.cookie = `noraToken=${token};expires=${new Date(expired)};path=/;"`;
        successNotify("登入成功");
    },[token,expired,navigate])

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        login();
    }
    





    return (<>
        
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div className="bg-cirlce" style={{width:"380px"}}>
                <h2 className="text-center text-white mb-4 fw-bolder">登入</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="userInput" placeholder="" name="username" value={userInfo.username}  onChange={headleInputChange} required/>
                        <label htmlFor="userInput">帳號</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="userPassword" placeholder="" name="password" value={userInfo.password}  onChange={headleInputChange} required/>
                        <label htmlFor="userPassword" required>密碼</label>
                    </div>
                    <div className="text-center my-5">
                        <button className="btn-log btn-login" type="submit"><span>GO !</span></button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}