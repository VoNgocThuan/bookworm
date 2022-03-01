import Axios from 'axios'
import React, { useState } from 'react'
import "./loginmodal.css"
import { useDispatch } from 'react-redux';
//Import action dùng để dispatch
import { setAccessToken, setUserId } from '../../actions/index'

function LoginModal() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        access_token: ''
    })

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
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    setState({
                        access_token: response.data.access_token
                    })
                    dispatch(setAccessToken(response.data.access_token));
                    dispatch(setUserId(response.data.user_id));
                }
            })
        });
    }

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">LOGIN</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={updateFormInput} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={updateFormInput} />
                            </div>
                        </form>
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