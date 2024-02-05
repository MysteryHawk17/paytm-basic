import PropTypes from 'prop-types';
const AppBar = ({ user, setProfile, isProfile }) => {
    // const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem("token")
        window.location.reload();
        
    }
    return (
        <><div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
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


        </>
    )
}
AppBar.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        
    }),
    setProfile: PropTypes.func,
    isProfile: PropTypes.bool
};
export default AppBar