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

  const colButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const buttonStyle = { // Basic styling for visibility
      margin: '2px 0', // Small vertical margin between column buttons
      padding: '8px'
  };

  const colButtonStyleNoSpace = { // Style for column buttons with no space
      margin: 0,
      padding: '8px',
      borderTop: '1px solid #ccc', // Add subtle separator
  };


  return (
    <div style={{ width: '250px', padding: '0px' }}> {/* Adjusted width slightly, removed padding */}

      {/* First Div: Header */}
      <div style={headerStyle}>
        Solana Wallet
      </div>

      {/* Second Div: Row Buttons */}
      <div style={rowButtonStyle}>
        <button onClick={() => handleClick('Button 1')} style={{ padding: '8px 12px'}}>Button 1</button>
        <button onClick={() => handleClick('Button 2')} style={{ padding: '8px 12px'}}>Button 2</button>
      </div>

      {/* Third Div: Column Buttons */}
      <div style={colButtonStyle}>
        <button onClick={() => handleClick('Action A')} style={{...colButtonStyleNoSpace, borderTop: 'none'}}>Action A</button>
        <button onClick={() => handleClick('Action B')} style={colButtonStyleNoSpace}>Action B</button>
        <button onClick={() => handleClick('Action C')} style={colButtonStyleNoSpace}>Action C</button>
      </div>

    </div>
  );
}
