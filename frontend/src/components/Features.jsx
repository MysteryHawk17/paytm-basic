/* eslint-disable react/prop-types */
import React from "react";
import { FaMobileButton } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { MdAirplaneTicket } from "react-icons/md";

const features = [
  {
    id: 1,
    title: "Mobile Recharge",
    subTitle: "Recharge your mobile for any network",
    Icon: FaMobileButton,
    color: "black",
  },
  {
    id: 2,
    title: "Movie Tickets",
    subTitle: "Book movie tickets online",
    Icon: GiTicket,
    color: "red",
  },
  {
    id: 3,
    title: "Flight Tickets",
    subTitle: "Book flight tickets online",
    Icon: MdAirplaneTicket,
    color: "blue",
  },
];

const Features = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            Icon={feature.Icon}
            subTitle={feature.subTitle}
            color={feature.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;

const FeatureCard = ({ title, Icon, subTitle, color }) => {
  return (
    <div className="flex cursor-pointer items-start gap-4 p-5 py-6 bg-gray-100 rounded-md">
      <Icon size={35} style={{ color }} />
      <div className="flex flex-col">
        <span className="text-xl font-medium" style={{ color }}>
          {title}
        </span>
        <span className="text-sm text-gray-600">{subTitle}</span>
      </div>
    </div>
  );
};
