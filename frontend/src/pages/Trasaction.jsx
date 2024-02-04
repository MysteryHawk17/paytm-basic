import { useEffect, useState } from "react";
import axios from 'axios'
import PropTypes from 'prop-types';
export const TransactionList = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        // setLoading(true)
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/transactionhistory`, config)
                .then(response => {
                    setTransactions(response.data.findTrasactions)
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                }).finally(() => { setLoading(false); });
        }
    }, [])
    return (<>
        {!loading && <div className="flex justify-center items-center mt-10">
            <div className="max-w-full  w-full bg-white p-4 rounded-lg shadow-md overflow-y-auto">
                {transactions.map((transaction, index) => {
                    return (<div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4 sm:flex justify-between items-center">
                        {/* For larger devices */}
                        <div className="hidden sm:flex sm:justify-between sm:items-center sm:flex-1">
                            <div className="hidden sm:block">
                                <div className="font-bold mb-2">Receiver: {transaction.receiverId.firstName} {transaction.receiverId.lastName}</div>
                                <div>Date: {transaction.createdAt.split("T")[0]}</div>
                            </div>

                            <div className="md:ml-4 ">
                                <div className="text-right">Sender: {transaction.senderId.firstName} {transaction.senderId.lastName}</div>
                                <div className="text-right">Amount: {transaction.amount}</div>
                                <div className="text-right">{transaction.senderId.username == user.username ? "Debited" : "Credited"}</div>
                            </div>
                        </div>
                        {/* For smaller devices */}
                        <div className="flex sm:hidden  justify-between">
                            <div className="md:hidden mb-2">
                                <div className="font-bold">{transaction.receiverId.firstName} {transaction.receiverId.lastName}</div>
                                <div>{transaction.createdAt.split("T")[0]}</div>
                            </div>

                            <div className="flex-col justify-end border-zinc-800">
                                <div className="font-bold">{transaction.senderId.username == user.username ? "-" : "+"}{transaction.amount}</div>

                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>}
    </>
    );
};

TransactionList.propType = ({
    user: PropTypes.object
})




