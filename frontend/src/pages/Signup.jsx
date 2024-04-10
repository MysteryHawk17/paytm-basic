import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleLocal = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <div className="flex bg-neutral-100 h-screen items-center">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="/signup.jpg"
          alt="Sign in"
          className="w-3/4 bg-blend-color-burn"
        />
      </div>
      <div className="flex flex-col items-center gap-3 w-1/2 mt-6 mx-12">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <img src="/icon.png" alt="Pay Pulse" className="w-12" />
          <h1 className="font-title text-4xl font-medium">Pay Pulse</h1>
        </div>
        <div className="rounded-lg shadow-xl bg-white w-[90%] text-center p-2 px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your details to create an account"} />
          <div className="grid grid-cols-2 gap-4">
            <InputBox
              placeholder="John"
              label={"First Name"}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <InputBox
              placeholder="Doe"
              label={"Last Name"}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
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
            <Button label={"Sign up"} onClick={() => {
                axios
                  .post(
                    `${import.meta.env.VITE_BACKENDURL}/api/v1/user/register`,
                    formData
                  )
                  .then((response) => {
                    handleLocal(response.data.token);
                    navigate("/dashboard");
                  })
                  .catch((error) => {
                    console.error("Error User Registration:", error);
                  });
              }} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};


