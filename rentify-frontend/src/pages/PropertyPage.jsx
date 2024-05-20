import React from 'react';
import PropertyDetails from '../components/PropertyDetails';

const PropertyPage = (props) => {
  return (
    <div>
      <h1>Property Details</h1>
      <PropertyDetails {...props} />
    </div>
  );
};

export default PropertyPage;
