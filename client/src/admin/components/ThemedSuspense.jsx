import React from 'react';
import { MoonLoader } from 'react-spinners';

function ThemedSuspense() {
  return (
    <div className="flex items-center justify-center h-screen">
      <MoonLoader color="hsla(283, 68%, 55%, 1)" />
    </div>
  );
}

export default ThemedSuspense;
