import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const PropertyList = ({ token }) => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties', {
        params: { page, pageSize },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleLike = async (propertyId) => {
    try {
      await api.post(
        `/properties/${propertyId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProperties();
    } catch (error) {
      alert('Error liking property');
    }
  };

  const handleInterested = async (propertyId) => {
    try {
      await api.post(
        `/properties/${propertyId}/interested`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Interest shown and emails sent');
    } catch (error) {
      alert('Error showing interest');
    }
  };

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.location}</h2>
          <p>Area: {property.area} sq ft</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <button onClick={() => handleLike(property.id)}>
            Like ({property.likes || 0})
          </button>
          <button onClick={() => handleInterested(property.id)}>
            I'm Interested
          </button>
          <Link to={`/property/${property.id}`}>View Details</Link>
        </div>
      ))}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default PropertyList;
