import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SetPin = () => {
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
        navigate("/signin") ;
    }
  
  })
  const handleClick = () => {

    const token = localStorage.getItem('token');
    if(!token){
        navigate("/signin") ;
    }
    else{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.put(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/changepin`, {
            oldPin: oldPin,
            newPin: newPin
        }, config)
            .then(response => {
                console.log(response.data);
                navigate("/dashboard")
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            })
    }
    console.log('Old PIN:', oldPin);
    console.log('New PIN:', newPin);
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Pin Change</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="opin"
                            >
                                Old Pin 
                            </label>
                            <input
                                onChange={(e) => {
                                    setOldPin(e.target.value);
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="op"
                                placeholder="Enter Old Pin"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="nPin"
                            >
                                New Pin
                            </label>
                            <input
                                onChange={(e) => {
                                    setNewPin(e.target.value);
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="np"
                                placeholder="Enter New Pin"
                            />
                            </div>
                        <button onClick={handleClick} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                           Change Pin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SetPin;
