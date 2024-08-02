import { useRef } from "react"
const Login = ({setCurrUser, setShow}) =>{
  const formRef=useRef()
  const login=async (userInfo, setCurrUser)=>{
    const url="http://localhost:3000/login"
    try{
        const response=await fetch(url, {
            method: "post",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const data=await response.json()
        if(!response.ok) throw data.error

        console.log(response.headers.get("Authorization"))
        localStorage.setItem("token", response.headers.get("Authorization"))
        setCurrUser(data)
    }catch(error){
       console.log("error", error)
    }
}
  const handleSubmit=e=>{
    e.preventDefault()
      const formData=new FormData(formRef.current)
      const data=Object.fromEntries(formData)
      const userInfo={
        "user":{
          email: data.email, password: data.password
        }
      }
      login(userInfo, setCurrUser)
      e.target.reset()
  }
  const handleClick=e=>{
    e.preventDefault()
    setShow(false)
  }
  return(
    <div className="container">
      <form ref={formRef} onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Email" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" placeholder="Senha" className="form-input" />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className="submit-button" />
        </div>
      </form>
      <div className="signup-link">
        <a href="#signup" onClick={handleClick}>Criar Conta</a>
      </div>
    </div>
  )
}
export default Login
