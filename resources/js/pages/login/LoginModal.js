import Axios from 'axios'
import React, { useState } from 'react'

export default function LoginModal() {
    const [formInput, setFormInput] = useState({ email: '', password: '' })
    
    const updateFormInput = e => {
        if (e.target.type === "email") {
            setFormInput(prevState => ({ ...prevState, email: e.target.value }))
        }
        if (e.target.type === "password") {
            setFormInput(prevState => ({ ...prevState, password: e.target.value }))
        }
    }

    const signIn = e => {
        Axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            Axios.post('http://localhost:8000/api/login', formInput).then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    console.log('Success')
                }
            })
        });
    }

    console.log(formInput);

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
                        <button type="button" className="btn btn-primary" onClick={signIn}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
