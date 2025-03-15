import React from "react"
import { Link } from "react-router-dom";
import { loginUser } from "../../apiCalls/auth";
import {toast} from "react-hot-toast";

function Login() {
    const [user, setUser] = React.useState({
        email: "",
        password:""
    })

    async function onFormSubmit(event) {
        event.preventDefault();
        let response = null;
        try {
            response = await loginUser(user)
            if (response.success) {
                localStorage.setItem('token', response.token);
                window.location.href = "/";
                toast.success(response.message)
            } else { 
            toast.error(response.message)
            }
        } catch (error) {
            toast.error(response.message)
        }
    }


    return(<div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
        <div className="card_title">
            <h1>Login Here</h1>
        </div>
        <div className="form">
        <form onSubmit={onFormSubmit}>
            <input type="email" placeholder="Email" onChange={(e) => { setUser({ ...user, email: e.target.value })}}/>
            <input type="password" placeholder="Password" onChange={(e) => { setUser({ ...user, password: e.target.value })}}/>
            <button>Login</button>
        </form>
        </div>
        <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to="/signup">Signup Here</Link>
            </span>
        </div>
        </div>
    </div>)
}

export default Login