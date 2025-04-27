import React from 'react';

export default function Popup() {

  const handleClick = () => {
    window.alert('hello');
  };

  return (
    <div style={{ width: '200px', padding: '10px' }}>
      <h1>Popup</h1>
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}
