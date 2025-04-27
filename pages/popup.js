import React from 'react';

export default function Popup() {

  // Placeholder handler, can be adapted for each button
  const handleClick = (action) => {
    window.alert(`Button clicked: ${action}`);
  };

  const headerStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    marginBottom: '10px', // Space below header
  };

  const rowButtonStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute space around buttons
    padding: '10px 0', // Add some vertical padding
    marginBottom: '10px', // Space below row buttons
  };

  // Renamed and updated for row layout
  const thirdDivStyle = {
    display: 'flex',
    flexDirection: 'row', // Changed to row
    justifyContent: 'space-around', // Added justification for row layout
    padding: '10px 0', // Added some vertical padding
  };

  // Simple padding for buttons
  const buttonPadding = {
      padding: '8px 12px'
  };


  return (
    <div style={{ width: '250px', padding: '0px' }}> {/* Adjusted width slightly, removed padding */}

      {/* First Div: Header */}
      <div style={headerStyle}>
        Solana Wallet
      </div>

      {/* Second Div: Row Buttons */}
      <div style={rowButtonStyle}>
        <button onClick={() => handleClick('Button 1')} style={buttonPadding}>Button 1</button>
        <button onClick={() => handleClick('Button 2')} style={buttonPadding}>Button 2</button>
      </div>

      {/* Third Div: Now Row Buttons */}
      <div style={thirdDivStyle}>
        {/* Removed colButtonStyleNoSpace, using simple padding */}
        <button onClick={() => handleClick('Action A')} style={buttonPadding}>Action A</button>
        <button onClick={() => handleClick('Action B')} style={buttonPadding}>Action B</button>
        <button onClick={() => handleClick('Action C')} style={buttonPadding}>Action C</button>
      </div>

    </div>
  );
}
