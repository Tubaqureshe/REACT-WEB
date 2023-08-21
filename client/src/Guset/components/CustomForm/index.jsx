import React from 'react'
import './custom.css'
import LoginForm from './LoginForm'

export default function CustomForm() {
    return (
       <>
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input type="checkbox" className="toggle" />
                    <span className="slider" />
                    <span className="card-side" />
                    <div className="flip-card__inner">
                    <LoginForm />
                    </div>
                </label>
            </div>
        </div>
       </>

    )
}
