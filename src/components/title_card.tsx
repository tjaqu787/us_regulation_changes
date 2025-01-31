import React from 'react';
import SubscriptionBox from "./subscribe"

interface TitleCardProps {
  name?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ 
  name = "Stay Compliant"  // Default title if none provided
}) => {
  return (
    <div className="card w-full max-w-4xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold text-center mx-auto">
          {name}
        </h2>
        
        <div className="text-center">
          <p className="text-lg">
            Stay ahead of the curve with regulatory updates. 
            Our dedicated team monitors and analyzes industry changes, 
            ensuring you're always informed and compliant with the latest regulations.
          </p>
        </div>
        
        <div className="mt-6">
          <SubscriptionBox />
        </div>
      </div>
    </div>
  );
};

export default TitleCard;