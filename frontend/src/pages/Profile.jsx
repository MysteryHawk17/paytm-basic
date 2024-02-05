
import { useState } from "react";
import { Button } from "../components/Button";
import axios from 'axios'
import { useTokenHook } from "../hooks/useTokenHook";
const Profile = ({ user,updateProfile,setUpdateProfile }) => {
    const[info,setInfo]=useState(null);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [loading, setLoading] = useState(false)
    
    const handleUpdateProfile = () => {
        const token = localStorage.getItem('token');
        console.log(token);
        setLoading(true)
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.put(`${import.meta.env.VITE_BACKENDURL}/api/v1/user/updateuser`, {
                firstName,
                lastName
            }, config)
                .then(response => {
                    console.log(response.data.findUser);
                    setInfo(response.data.findUser)
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                }).finally(() => { setLoading(false);
                    setFirstName(info.firstName)
                    setLastName(info.lastName)
                    setUpdateProfile(!updateProfile)
                });
        }
    };

    return (
        <>
            {!loading && <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        className="w-full h-[fit-content] border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={user.username}

                    />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="text"
                        id="password"
                        className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div> */}
                <Button
                    onClick={handleUpdateProfile}
                    label={"Update"}
                />
            </div>}
        </>
    );
};
    
export default Profile;
