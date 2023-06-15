import { useState } from "react"
import axios from "axios";

export default function Users() {

    const axiosreq = axios.create({
        baseURL : "http://localhost:5000/users"
    })

    const [users, setUsers] = useState();
    return(
        <div>

        </div>
    )
}