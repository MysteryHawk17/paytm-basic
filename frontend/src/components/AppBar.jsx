import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import logo from "/icon.png";
const AppBar = ({ user, setProfile, isProfile }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("token")
        navigate("/signin");

    }
    return (
        <>
            {/* <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PaymentKroo
            </div>
            <div>
            </div>

            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4 hover:cursor-pointer" onClick={handleClick}>
                    Logout
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 hover:cursor-pointer">
                    <div className="flex flex-col justify-center h-full text-xl" onClick={() => { setProfile(!isProfile) }}>
                        {user.firstName[0]}
                    </div>
                </div>
            </div>
        </div>
 */}
            <div className="shadow-lg h-14 flex justify-between px-12">
                <Link to="/">
                    <div className="flex items-center justify-center gap-2 h-full cursor-pointer">
                        <img src={logo} alt="Pay Pulse" className="h-8 w-8" />
                        <h1 className="font-title text-2xl font-medium">Pay Pulse</h1>
                    </div>
                </Link>
                <div className="flex gap-4">
                    <div className="flex items-center justify-center font-sans my-2 px-4 bg-slate-100 rounded-3xl">{`${user?.firstName} ${user?.lastName}`}</div>
                    <div className="rounded-full border border-blue-300 cursor-pointer mt-2 h-10 w-10 bg-indigo-400 text-white hover:bg-opacity-90 flex justify-center">
                        <div className="flex flex-col justify-center font-title font-semibold h-full text-xl" onClick={() => { setProfile(!isProfile) }}>
                            {user?.firstName?.charAt(0)}
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleClick}
                            className="px-2 py-1 hover:text-red-600 hover:bg-white border rounded-md hover:border-red-600 bg-red-500 text-white font-mono cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
AppBar.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string

    }),
    setProfile: PropTypes.func,
    isProfile: PropTypes.bool
};
export default AppBar
