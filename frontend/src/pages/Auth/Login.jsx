import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstace from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPath';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';  

const Login = ({setCurrentPage}) => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Password cannot be empty.");
      return;
    }

    setError("");


    //Login API call

    try{
        const response = await axiosInstace.post(API_PATHS.AUTH.LOGIN, {
          email,
          password,
        });

        const token = response.data;
        if(token){
          localStorage.setItem("token", token);
          updateUser(response.data);
          navigate("/dashboard"); // Redirect to dashboard or home page
        }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3>Welcome Back
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to log in.
      </p>

      <form onSubmit={handleLogin} className=''>
        <Input value={email} onChange = {({target}) => setEmail(target.value)}
        label ="Email Address" placeholder = "Enter your email" type = "text"/>

        <Input 
        value = {password} onChange = {({target}) => setPassword(target.value)}
        label = "Password" placeholder = "Enter your password" type = "password"/>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type= 'submit' className='btn-primary'>
          LOGIN
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have ans account?{" "}
          <button className='font-medium text-primary underline cursor-pointer' onClick = {() => {setCurrentPage("signup");}}> SignUp</button>
        </p>
        </form>
    </div>
  )
}

export default Login