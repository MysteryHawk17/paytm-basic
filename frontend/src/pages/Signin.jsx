import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useState } from "react"
export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="mail@gmail.com" label={"Email"} onChange={(e) => { setUsername(e.target.value) }} />
        <InputBox placeholder="Password" label={"Password"} onChange={(e) => { setPassword(e.target.value) }} />
        <div className="pt-4">
          <Button label={"Sign in"}
            onClick={() => {
              axios.post(`${import.meta.env.VITE_BACKENDURL}/api/v1/user/login`, {
                username,
                password
              }).then((response) => {
                localStorage.setItem("token", response.data.token)
                // setTimeout(()=>{navigate("/dashboard")},1000)
                window.location.reload(true);
                
              }).catch(error => {
                console.error("Error User Signin", error);
              });

            }}
          />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}