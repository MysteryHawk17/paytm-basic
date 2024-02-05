import { useEffect, useState } from "react"
import {useNavigate}from 'react-router-dom'
const useTokenHook = () => {
    const [ifPresent, setIfPresent] = useState(false);
    const token = localStorage.getItem("token")
    const navigate=useNavigate()
    useEffect(() => {
        if (token) return setIfPresent(true);
        else navigate("/signin");
    }, []);
    return ifPresent;
}

export { useTokenHook }