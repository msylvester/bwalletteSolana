import React from 'react';

export default function Popup() {

  // Placeholder handler, can be adapted for each button
  const handleClick = (action) => {
    window.alert(`Button clicked: ${action}`);
  };

  // --- Style Definitions ---

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7f9',
    minWidth: '420px', // Increased from 280px
    minHeight: '270px', // Added minimum height
    borderRadius: '8px',
    border: '1px solid #e1e4e8',
    overflow: 'hidden', // Ensures header background is clipped by border radius
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
    display: 'flex', // Use flexbox to manage height distribution if needed
    flexDirection: 'column', // Stack children vertically
  };

  const headerStyle = {
    backgroundColor: '#343a40', // Changed to dark gray/charcoal
    color: '#f8f9fa', // Changed to light gray
    padding: '12px 15px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    flexShrink: 0, // Prevent header from shrinking
  };

  const middleDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch', // Stretch buttons to fill width
    gap: '12px',
    padding: '20px 15px', // More padding
    flexGrow: 1, // Allow this section to grow and fill available space
  };

  const thirdDivStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px 5px', // Adjust padding
    borderTop: '1px solid #e1e4e8', // Separator line
    backgroundColor: '#ffffff', // Slightly different background for footer actions
    flexShrink: 0, // Prevent footer from shrinking
  };

  // Base Button Style
  const baseButtonStyle = {
    border: 'none',
    borderRadius: '6px',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s ease', // Basic transition for potential hover (though hover state isn't defined inline)
  };

  // Primary Button Style (e.g., Create/Import)
  const primaryButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#007bff', // Standard primary blue
    color: 'white',
    fontWeight: '500',
  };

  // Secondary Button Style (e.g., Settings/Activity/Transfer)
  const secondaryButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: 'transparent', // Transparent background
    color: '#007bff', // Use primary color for text
    padding: '8px 10px', // Slightly smaller padding for footer buttons
    fontSize: '13px',
    flexGrow: 1, // Allow buttons to grow equally
    margin: '0 3px', // Small margin between footer buttons
  };


  return (
    <div style={containerStyle}>

      {/* First Div: Header */}
      <div style={headerStyle}>
        Solana Wallet
      </div>

      {/* Second Div: Column Buttons */}
      <div style={middleDivStyle}>
        <button
          onClick={() => handleClick('Create Wallet')}
          style={primaryButtonStyle}
        >
          Create Wallet
        </button>
        <button
          onClick={() => handleClick('Import wallet')}
          style={primaryButtonStyle}
        >
          Import wallet
        </button>
      </div>

      {/* Third Div: Row Buttons - Footer Actions */}
      <div style={thirdDivStyle}>
        <button
          onClick={() => handleClick('Settings')}
          style={secondaryButtonStyle}
        >
          Settings
        </button>
        <button
          onClick={() => handleClick('Activity')}
          style={secondaryButtonStyle}
        >
          Activity
        </button>
        <button
          onClick={() => handleClick('Transfer')}
          style={secondaryButtonStyle}
        >
          Transfer
        </button>
      </div>

    </div>
  );
}
