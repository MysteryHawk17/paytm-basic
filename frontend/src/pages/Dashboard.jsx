import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from 'axios'
import { Button } from "../components/Button"
import { TransactionList } from "./Trasaction"
import Profile from "./Profile"
import AppBar from '../components/AppBar'
import Loader from "../loader/Loader"

export const Dashboard = () => {
    const [user, setUser] = useState(null);

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isProfile, setIsProfile] = useState(false);
    const [sent, setSent] = useState(0);
    const [received, setReceived] = useState(0);
    const [added, setAdded] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoading(true)
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/getbalance`, config)
                .then(response => {
                    // console.log(response.data.info);
                    setUser(response.data.info.userId);
                    console.log(response.data.info.isPinSet);
                    setBalance(response.data.info.balance)
                    if(response.data.info.isPinSet === false){
                        navigate("/setpin")
                    }
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                }).finally(() => { setLoading(false); });
            setLoading(true);
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/account/difftransaction`, config).then(response => {
                console.log(response.data);
                setSent(response.data.info.spent);
                setReceived(response.data.info.received);
                setAdded(response.data.info.moneyAdded)
            })
                .catch(error => {
                    console.error("Error fetching users:", error);
                }).finally(() => { setLoading(false); });
        }
        else { navigate("/signin") }
    }, [navigate])
    const [butValue, setValue] = useState("History");
    const changeValue = () => {
        const value = butValue == "History" ? "Users" : "History"
        setValue(value)
    }
    return (<div>
        {loading ? <div className="relative lg:left-[30rem] sm:left-[22rem] top-[20rem] left-[8rem]"><Loader /></div> :
            <> <AppBar user={user} setProfile={setIsProfile} isProfile={isProfile} />
                {!isProfile ? <div className="m-8">
                    <div className="flex justify-end gap-4">
                        <div className="">
                            <Button label={butValue} onClick={changeValue} />
                        </div>
                        <div className="">
                            <Button label="Add Money" onClick={() => { navigate("/addmoney") }} />
                        </div>
                    </div>

                    <Balance value={balance} sent={sent} received={received} added={added} />

                    {butValue == "History" ? <Users /> :
                        <TransactionList user={user} />}
                </div> : <Profile user={user} />}
            </>}
    </div>)
}