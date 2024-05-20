import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const PropertyDetails = ({ match, token }) => {
  const [property, setProperty] = useState(null);
  const propertyId = match.params.id;

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const response = await api.get(`/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{property.location}</h2>
      <p>Area: {property.area} sq ft</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Amenities: {property.amenities.join(', ')}</p>
      <p>Likes: {property.likes}</p>
    </div>
  );
};

export default PropertyDetails;
