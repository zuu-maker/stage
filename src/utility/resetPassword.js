import React, { useRef, useState } from "react"
import {useAuth} from "../contexts/authContext";
import mail from "../images/mail.svg";
import {Modal} from "react-bootstrap";
import {useForm} from "../contexts/formContext";

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <>

            <form className="form" onSubmit={handleSubmit}>
                <p className="text-danger">{error}</p>

                <div className="input-group">
                   <input ref={emailRef} name="email" style={{backgroundImage: `url(${mail})`}} type="Email"
                           placeholder="Email"/>

                </div>

                <button disabled={loading} type="submit"><span className='form-btn'>Send Link</span></button>
            </form>

        </>
    )
}