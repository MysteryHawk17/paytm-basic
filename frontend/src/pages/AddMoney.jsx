import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

export const AddMoney = () => {

    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token");
        console.log(token);
        if (token == undefined) {
            navigate("/signin");
            return;
        }

    })
    const [searchParams] = useSearchParams();

    const [amount, setAmount] = useState(0);
    const [selectedBank, setSelectedBank] = useState("");
    const id = searchParams.size !== 0 && searchParams.get("id");
    //   const name = searchParams.size!==0&&searchParams.get("name");

    const handleClick = () => {
        axios.put(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/addmoney`, {
            to: id,
            amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            navigate(`/success?trasactionId=${response.data.info._id}`)
            
        }).catch((e) => { console.log(e.response); navigate(`/failure?reason=${e.response.data.message}`) })
    }
    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Add Money</h2>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="amount"
                            >
                                Bank
                            </label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="bank"
                                placeholder="Select Bank"
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                            >
                                <option value="HDFC">HDFC</option>
                                <option value="SBI">SBI</option>
                                <option value="ICICI">ICICI</option>
                                <option value="Axis">Axis</option>
                            </select>

                        </div>
                        <button onClick={handleClick} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}