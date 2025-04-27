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

  // Renamed and updated for column layout
  const middleDivStyle = {
    display: 'flex',
    flexDirection: 'column', // Changed to column
    alignItems: 'center', // Center items horizontally in the column
    gap: '10px', // Add space between the buttons vertically
    padding: '10px 0', // Add some vertical padding
    marginBottom: '10px', // Space below this div
  };

  // Style for the third div (remains row layout)
  const thirdDivStyle = {
    display: 'flex',
    flexDirection: 'row', // Kept as row
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

      {/* Second Div: Now Column Buttons */}
      <div style={middleDivStyle}>
        {/* Updated button labels and onClick handlers */}
        <button onClick={() => handleClick('Create Wallet')} style={buttonPadding}>Create Wallet</button>
        <button onClick={() => handleClick('Import wallet')} style={buttonPadding}>Import wallet</button>
      </div>

      {/* Third Div: Row Buttons - Updated Labels */}
      <div style={thirdDivStyle}>
        <button onClick={() => handleClick('Settings')} style={buttonPadding}>Settings</button>
        <button onClick={() => handleClick('Activity')} style={buttonPadding}>Activity</button>
        <button onClick={() => handleClick('Transfer')} style={buttonPadding}>Transfer</button>
      </div>

    </div>
  );
}
