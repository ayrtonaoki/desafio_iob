import { useRef } from "react"

const Signup=({setCurrUser, setShow})=>{
    const formRef = useRef()
    const signup=async (userInfo, setCurrUser)=>{
        const url="http://localhost:3000/signup"
        try{
            const response=await fetch(url, {
                method: 'post',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
            const data=await response.json()
            if(!response.ok) throw data.error

            localStorage.setItem('token', response.headers.get("Authorization"))
            setCurrUser(data)
        } catch (error){
            console.log("error", error)
        }
    }
    const handleSubmit=e=>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const userInfo={
            "user":{ email: data.email, password: data.password }
        }
        signup(userInfo, setCurrUser)
        e.target.reset()
    }
    const handleClick=e=>{
        e.preventDefault()
        setShow(true)
    }
    return(
        <div className="signup-container">
            <form ref={formRef} onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" name="password" placeholder="Senha" required />
            </div>
            <button type="submit" className="submit-button">Criar Conta</button>
            </form>
            <div className="login-link">
                <a href="#login" onClick={handleClick}>Login</a>
            </div>
        </div>
    )
}
export default Signup
