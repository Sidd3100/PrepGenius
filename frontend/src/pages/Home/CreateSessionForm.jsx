import React, { useState } from 'react'
import Input from '../../components/Inputs/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };
    const handleCreateSession = async(e) =>{
        e.preventDefault();

        const {role, experience, topicsToFocus} = formData;

        if(!role || !experience || !topicsToFocus){
            setError("Please fill all the required fields.");
            return;
        }
        setError("");
        setIsLoading(true);

        try{
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );

            const generatedQuestions = aiResponse.data;

            const response  = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            });
            if(response.data?.session?._id){
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
        }catch (error){
            if(error.response && error.response.data.message){
                setError(error.reponse.data.message);
            }else{
                setError("Something went wrong...");
            }
        }finally{
            setIsLoading(false);
        }
    }
    
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>
            <p className='text-xs text-slate-700 mt-[5px] mb-3'>
                Start a new Interview Journey.
            </p>

            <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
                <Input
                value = {formData.role}
                onChange = {({target}) => handleChange("role", target.value)}
                label ="Target Role"
                placeholder="(e.g., Frontend Developer, UI/UX Developer)"
                type="text"

            />

            <Input 
            value = {formData.experience}
            onChange = {({target}) => handleChange("experience", target.value)}
            label ="Experience"
            placeholder="(e.g., 2 years, 5 years)"
            type="text"

            />

            <Input
            value = {formData.topicsToFocus}
            onChange={({target})=> handleChange("topicsToFocus", target.value)}
            label ="Topics to Focus"
            placeholder="(e.g., React, Node.js)"
            type="text"

            />

            <Input
            value = {formData.description}
            onChange={({target})=> handleChange("description", target.value)}
            label ="Description"
            placeholder="(e.g., Brief description of the session)"
            type="text"

            />

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button 
            type='submit'
            className='btn-primary w-full mt-2'
            disabled={isLoading}
            >
                {isLoading ? "Creating..." : "Create Session"}
            </button>
            </form>
        </h3>
    </div>
  )
}

export default CreateSessionForm