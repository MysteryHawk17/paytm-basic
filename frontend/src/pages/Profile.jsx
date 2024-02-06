
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from 'axios'
import Loader from "../loader/Loader";
const Profile = () => {
    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false)

    const [edit, setEdit] = useState(false);
    const handleUpdateProfile = () => {
        const token = localStorage.getItem('token');
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
                    setUser(response.data.findUser)
                })
                .catch(error => {
                    console.error("Error fetching users:", error);
                }).finally(() => {
                    setLoading(false);
                    setEdit(false);
                });
        }
    };
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token")
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`${import.meta.env.VITE_BACKENDURL}/api/v1/user/profile`, config).then((e)=>{console.log(e.data.user)
                setUser(e.data.user);}).catch((e)=>{
                console.log(e);
            }).finally(()=>{
                setLoading(false);
            })

        }
    },[])
    return (
        <>
            {loading ? <div className="relative lg:left-[30rem] sm:left-[22rem] top-[20rem] left-[8rem]"><Loader /></div> :

                <> <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Profile
                    </h2>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
                        {edit ? <input
                            type="text"
                            id="firstName"
                            className="w-full h-[fit-content] border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        /> : <div
                            className="w-full h-[fit-content] border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {user?.firstName}
                        </div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                        
                        {edit ? <input
                            type="text"
                            id="lastName"
                            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        /> : <div
                            className="w-full h-[fit-content] border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {user?.lastName}
                        </div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                        <div
                            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                        >{user?.username}</div>
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
                    <div
                        className="flex "
                    >
                        <Button label={edit ? "Cancel" : "Edit"} onClick={() => { setEdit(!edit) }} />
                        <Button
                            onClick={handleUpdateProfile}
                            label={"Update"}
                        />
                    </div>

                </div></>}
        </>
    );
};

export default Profile;
