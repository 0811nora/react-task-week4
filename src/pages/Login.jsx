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


    const headleInputChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo({
            ...userInfo,
            [name]:value
        })
    }


    const login = async () =>{
        try{
            const res = await postSignin(userInfo);
            setToken(res.data.token)
        }catch(err){
            errorNotify(err.response.data.message)    
        }
        
    }

    useEffect(() => {
        if(!token) return;
        sessionStorage.setItem('token',token)
        successNotify("登入成功");
        navigate('/')
    },[token,navigate])

    
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
                        <input type="email" className="form-control" id="userInput" placeholder="" name="username"  onChange={headleInputChange} required/>
                        <label htmlFor="userInput">帳號</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="userPassword" placeholder="" name="password"  onChange={headleInputChange} required/>
                        <label htmlFor="userPassword" required>密碼</label>
                    </div>
                    <div className="text-center my-5">
                        <button className="btn-blueLg" type="submit">GO !</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}