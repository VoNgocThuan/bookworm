import Axios from 'axios'
import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import "./loginmodal.css"
import { useDispatch } from 'react-redux'
import { setAccessToken, setUserId } from '../../actions/index'

function LoginModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const [stateLogin, setStateLogin] = useState(undefined)
    const ref = useRef(null);

    const updateFormInput = e => {
        if (e.target.type === "email") {
            setState(prevState => ({ ...prevState, email: e.target.value }))
        }
        if (e.target.type === "password") {
            setState(prevState => ({ ...prevState, password: e.target.value }))
        }
    }

    const signIn = function () {
        Axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            Axios.post('http://localhost:8000/api/login', state).then(response => {
                if (response.data.message == 'Unauthorized') {
                    setStateLogin(false)
                    setTimeout(() => {
                        setStateLogin(undefined)
                    }, 5000)
                } else {
                    setStateLogin(true)
                    setTimeout(() => {
                        setStateLogin(undefined)
                    }, 5000)
                    dispatch(setAccessToken(response.data.access_token));
                    dispatch(setUserId(response.data.user_id));
                    localStorage.setItem("loginUserData", JSON.stringify(response));
                    navigate('/');
                    ref.current.click();
                }
            })
        });
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">LOGIN</h5>
                        <button ref={ref} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={updateFormInput} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={updateFormInput} />
                            </div>
                        </form>
                        {stateLogin == false && (
                            <div className="alert alert-danger text-center" role="alert">
                                Your email or password is incorrect. Please try again!
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-login" onClick={signIn}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;