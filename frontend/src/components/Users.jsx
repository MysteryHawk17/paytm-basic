import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import Loader from "../loader/Loader";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounceHook(filter, 1)
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/user/search?filter=` + debouncedValue, config)
                .then(response => {
                    setUsers(response.data.user);
                    setLoading(false)
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                });

        }
    }, [debouncedValue]);


    return <>
        {loading ? <div className="relative lg:left-[30rem] sm:left-[22rem] top-[20rem] left-[8rem]"><Loader /></div>  :
            <><div className="font-bold mt-6 text-lg">
                Users
            </div>
                <div className="my-2">
                    <input onChange={(e) => {
                        setFilter(e.target.value)
                    }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
                </div>
                <div>
                    {loading == false && users.map((user, index) => <User key={index} user={user} />)}
                </div>
            </>}
    </>
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}
const useDebounceHook = (value, n) => {
    const [retVal, setRetVal] = useState('');
    useEffect(() => {
        const int = setInterval(() => {
            setRetVal(value)
        }, n * 1000);
        // setRetVal(value)
        return (() => {
            clearInterval(int)
        })
    }, [n, value])
    return retVal;
}
User.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        _id: PropTypes.string,
        // Add PropTypes validation for other properties in user if needed
    }),
    setProfile: PropTypes.func,
    isProfile: PropTypes.bool
};