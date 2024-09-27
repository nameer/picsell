import { Field, Input, Label } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

const userName = "admin1234";
const password = "12345678";
const Login = () => {
  const [name, setName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e?.target?.value);
  const handlePasswordChange = (e) => setUserPassword(e?.target?.value);

  const handleLogin = () => {
    console.log(name, userPassword);
    if (userName === name && userPassword === password) {
      localStorage.setItem("isLogin", true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex w-full h-lvh p-[15px]">
      <div className="w-1/2 flex flex-col">
        <div className="text-left ml-3"></div>
        <div className="flex justify-center">
          <div className="text-left max-w-[400px] ">
            <div className="mt-48 font-bold text-4xl text-[#1F2025]">Login</div>
            <div className="mt-[2px] font-medium text-lg text-[#605E5F]">
              Enter your picsell credentials to login
            </div>
            <Field className="flex flex-col mt-10 gap-2">
              <Label className="text-base font-semibold text-[#1F2025]">
                Username
              </Label>
              <Input
                name="full_name"
                placeholder="Enter Username"
                onChange={handleNameChange}
                class="border rounded border-[#D9D9D9] bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm focus:outline-none sm:text-sm sm:leading-6"
              />
            </Field>
            <Field className="flex flex-col mt-6 gap-2">
              <Label className="text-base font-semibold text-[#1F2025]">
                Password
              </Label>
              <Input
                name="full_name"
                placeholder="Enter Password"
                onChange={handlePasswordChange}
                type="password"
                class="border rounded border-[#D9D9D9] bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm focus:outline-none sm:text-sm sm:leading-6"
              />
            </Field>
            <button
              onClick={handleLogin}
              className="mt-10 bg-[#205BF1] rounded-md w-full h-[54px] text-white font-bold text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#1F1737] rounded-xl" />
    </div>
  );
};

export default Login;
