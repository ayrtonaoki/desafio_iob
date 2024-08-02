import Signup from "./Signup";
import Login from './Login'
import SubmitCountry from './SubmitCountry';
import { useState } from "react";
const User = ({currUser, setCurrUser}) => {
    const [show, setShow]=useState(true)
    if(currUser)
        return (
            <div>
            <SubmitCountry currUser={currUser}/>
            </div>
        )
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User
