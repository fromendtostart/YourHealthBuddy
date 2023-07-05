import "./stylesheets/register.css";
import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link, useNavigate, useLocation } from 'react-router-dom';


 export default function Login(){

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    //usecontext and auth

    const {setAuth} = useContext<any>(AuthContext);

    //for form elements
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');

    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/users"
    })

    const loginURL = "/login"

    const handleSubmit =  async (event: React.FormEvent) => {
        event.preventDefault();
        if(pwd==='' || email==='')
        alert("Enter all fields")
        try{
            const response = await axiosreq.post(loginURL,
                    {email, password : pwd},//the property names should match ones expected by backend
                    //no need for json.strinify as axios handles that
                    {
                        headers: {"Content-Type" : "application/json"},
                        withCredentials: true,
                    }
                );
                console.log(response.data);
                console.log(JSON.stringify(response))
                //json.stringify we don't get object, object in console

                //accestoken made availible globally by usecontext
                const accessToken = response?.data?.token; //again, token property is sent by server so match that
                setAuth({email, pwd, accessToken});
                navigate(from, { replace: true });
        }catch(err : unknown){
            if(!(err as any)?.response){
                //(err as any means bypassong type checking for that specific expression)
                alert("No response from server");
            }
            else if((err as any).response?.status===401){ //utilising those error codes sent from backend
                alert("Unauthorized!")
            }
            else{
                alert("Login failed")
            }
            }
        }
    

    

    return(
        <div className="register">
            <span className="yourhealthbuddy">Your Health Buddy</span>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    type = "text" 
                    id = "email" 
                    value = {email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <label htmlFor="pwd">Password</label>
                <input 
                    type = "password" 
                    id = "pwd" 
                    value = {pwd}
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    />
                <button className="submit-btn" disabled={email!='' && pwd!='' ? false:true} type = "submit" onClick={handleSubmit}>Submit</button>
            </form>
            <span><Link to = "/YourHealthBuddy/register">Sign up instead</Link></span>
        </div>
    )
 }