import "./stylesheets/register.css";
import axios from "axios";
import { useState, useEffect } from "react";

 export default function Register(){

    //for form elements

    const [user, setUser] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [pwdMatch, setPwdMatch] = useState<string>('');
    
    //for effects
    
    const [validMatch, setValidMatch] = useState<boolean>(false);

//benefit of use effect that checking matching password is controlled component, anytime one of them change 
//checker would automatically run, instead of checking on onsubmit 

    useEffect(()=> {
        const match = pwd === pwdMatch;
        setValidMatch(match);
    }, [pwd, pwdMatch]);

    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/users"
    })

    const regURL = "/signup"

    const handleSubmit =  async (event: React.FormEvent) => {
        event.preventDefault();
        if(pwd==='' || user ==='' || email==='')
        alert("Enter all fields")
        let response;
        try{
            response = await axiosreq.post(regURL,
                    {name : user, email, password : pwd},//the property names should match ones expected by backend
                    {
                        headers: {"Content-Type" : "application/json"},
                        withCredentials: true,
                    }
                );
                console.log(response.data);
                console.log(JSON.stringify(response))
                //json.stringify we don't get object, object in console
        }catch(err : unknown){
            if(!(err as any)?.response){
                //(err as any means bypassong type checking for that specific expression)
                //response property didn't exist inside "any" and no types inside catch clause allowed except unknown and any
                alert("No response from server");
            } else if ((err as any).response?.status === 409){
                alert("Username taken");
            } else {
                    alert("Registration failed")
                }
            }
        }
    

    

    return(
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type = "text" 
                    id = "username" 
                    value = {user}
                    required
                    onChange={(e) => setUser(e.target.value)}
                    />
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
                <label htmlFor="pwdMatch">Confirm Password</label>
                <input 
                    type = "password" 
                    id = "pwdMatch" 
                    value = {pwdMatch}
                    required
                    onChange={(e) => setPwdMatch(e.target.value)}
                    />
                    {validMatch ? "":"Passwords don't match!"}
                <button disabled={validMatch ? false:true} type = "submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
 }