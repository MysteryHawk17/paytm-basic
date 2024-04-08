import PropTypes from 'prop-types'


// import { IoIosAddCircleOutline } from "react-icons/io";
export const Balance = ({ value,sent,received }) => {
    return <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-12 my-8">
      <div className="p-5 rounded-lg text-white bg-orange-500">
        <div className="font-semibold text-2xl">Balance Left</div>
        <div className="font-medium text-4xl">₹{Math.floor(value)}</div>
      </div>
      <div className="p-5 rounded-lg text-white bg-blue-500">
        <div className="font-semibold text-2xl">Total Spendings</div>
        <div className="font-medium text-4xl">₹{Math.floor(sent)}</div>
      </div>
      <div className="p-5 rounded-lg text-white bg-green-500">
        <div className="font-semibold text-2xl">Money Received</div>
        <div className="font-medium text-4xl">₹{Math.floor(received)}</div>
      </div>
    </div>
    </div>
}

Balance.propTypes = ({
    value: PropTypes.number,
    sent: PropTypes.number,
    received: PropTypes.number
})