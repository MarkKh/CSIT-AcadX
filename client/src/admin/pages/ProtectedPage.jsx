import React from 'react';

function ProtectedPage() {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome to the protected page! This page can only be accessed by authenticated users.</p>
      {/* Add your protected content here */}
    </div>
  );
}

export default ProtectedPage;
