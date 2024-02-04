import PropTypes from 'prop-types'

export const Balance = ({ value }) => {
  
    return <div className="flex">
        <div className="font-bold text-lg flex-0.1">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg flex-1">
            Rs {value.toFixed(2)}
        </div>
    </div>
}

Balance.propTypes = ({
    value: PropTypes.number
})