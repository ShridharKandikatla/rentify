import React from 'react';
import PropertyForm from '../components/PropertyForm';

const PostPropertyPage = ({ token }) => {
  return (
    <div>
      <h1>Post a New Property</h1>
      <PropertyForm token={token} />
    </div>
  );
};

export default PostPropertyPage;
