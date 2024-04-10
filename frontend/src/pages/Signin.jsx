import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="flex bg-neutral-50 items-center h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="/login.jpg"
          alt="Sign in"
          className="w-3/4 bg-blend-color-burn"
        />
      </div>
      <div className="flex flex-col items-center gap-4 w-1/2 my-12 mx-12">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <img src="/icon.png" alt="Pay Pulse" className="w-12" />
          <h1 className="font-title text-4xl font-medium">Pay Pulse</h1>
        </div>
        <div className="rounded-lg shadow-xl bg-white border border-slate-50 w-[90%] text-center py-4 px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="name@example.com"
            label={"Email"}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <InputBox
            placeholder="••••••••"
            label={"Password"}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={() => {
                axios
                  .post(
                    `${import.meta.env.VITE_BACKENDURL}/api/v1/user/login`,
                    formData
                  )
                  .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                    // setTimeout(()=>{navigate("/dashboard")},1000)
                  })
                  .catch((error) => {
                    console.error("Error User Signin", error);
                  });
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
