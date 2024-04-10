/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

// import { IoIosAddCircleOutline } from "react-icons/io";
export const Balance = ({ value, sent, received, added }) => {
  const balanceCards = [
    {
      id: 1,
      title: "Balance Left",
      amount: value,
      color: "bg-orange-500",
    },
    {
      id: 2,
      title: "Total Spendings",
      amount: sent,
      color: "bg-red-500",
    },
    {
      id: 3,
      title: "Money Received",
      amount: received,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Money Added",
      amount: added,
      color: "bg-blue-500",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {
          balanceCards.map((card) => (
            <BalanceCard
              key={card.id}
              title={card.title}
              amount={card.amount}
              color={card.color}
            />
          ))
        }
      </div>
    </div>
  );
};

const BalanceCard= ({ title, amount, color }) => {
  return (
    <div className={`p-5 rounded-lg text-white ${color}`}>
      <div className="font-semibold text-2xl">{title}</div>
      <div className="font-medium text-4xl">₹{Math.floor(amount)}</div>
    </div>
  );
};

Balance.propTypes = {
  value: PropTypes.number,
  sent: PropTypes.number,
  received: PropTypes.number,
  added: PropTypes.number,
};
