import React, { useState, useEffect } from 'react';
import {
  Keypair,
  PublicKey,
  // ConfirmedSignatureInfo, // Not needed for create wallet
  // SystemProgram, // Not needed for create wallet
  // Transaction, // Not needed for create wallet
  // sendAndConfirmTransaction, // Not needed for create wallet
  LAMPORTS_PER_SOL, // Needed for faucet/balance checks potentially within fundWallet
  // ParsedTransactionWithMeta // Not needed for create wallet
} from '@solana/web3.js';
import * as bip39 from 'bip39'; // Import bip39 for mnemonic handling
// Assuming faucet.js and connection.js exist at these paths relative to popup.js
// You may need to adjust these paths based on your project structure.
import fundWallet from './faucet'; // Import the fundWallet function
import connection from './connection'; // Import the shared connection

// Helper function to trigger download of the secret key (and optionally seed phrase)
// Copied from page_two.tsx and converted to JS
const downloadSecretKey = (publicKey, secretKey, seedPhrase) => {
  let fileContent;
  const secretKeyArray = Array.from(secretKey);

  if (seedPhrase) {
    // If seed phrase is provided, create a JSON object with both
    const dataToSave = {
      seedPhrase: seedPhrase,
      secretKeyBytes: secretKeyArray
    };
    fileContent = JSON.stringify(dataToSave, null, 2); // Pretty print JSON
  } else {
    // Otherwise, just save the secret key byte array (for random generation)
    fileContent = JSON.stringify(secretKeyArray);
  }

  const blob = new Blob([fileContent], { type: 'application/json;charset=utf-8' }); // Changed type to json
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${publicKey}.json`; // Changed extension to .json for clarity
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up the object URL
  console.log(`Key data saved to ${publicKey}.json`);
};


export default function Popup() {
  // State to manage which view is currently displayed
  const [currentPage, setCurrentPage] = useState('main'); // 'main' or 'createWallet'

  // --- State for Deterministic Generation ---
  const [seedPhrase, setSeedPhrase] = useState('');
  const [deterministicPublicKey, setDeterministicPublicKey] = useState(null);
  // Secret key is not stored in state long-term, only used during generation/download
  const [seedError, setSeedError] = useState(null); // Error message for seed input

  // --- Handlers for Deterministic Generation ---

  // Handler for deterministic key generation from seed phrase
  const handleGenerateFromSeed = async () => { // Make the function async
    setSeedError(null); // Clear previous errors
    setDeterministicPublicKey(null);

    // 1. Validate the mnemonic phrase
    if (!bip39.validateMnemonic(seedPhrase)) {
      setSeedError("Invalid seed phrase. Please check your mnemonic.");
      return;
    }

    let generatedPublicKey = null; // Temporary variable to hold PK even if funding fails

    try {
      // 2. Convert mnemonic to seed bytes
      const seedBytes = bip39.mnemonicToSeedSync(seedPhrase).slice(0, 32);

      // 3. Generate Keypair from the 32-byte seed
      const keypair = Keypair.fromSeed(seedBytes);

      // 4. Get public key and store it
      const publicKeyBase58 = keypair.publicKey.toBase58();
      generatedPublicKey = publicKeyBase58; // Store generated key
      setDeterministicPublicKey(publicKeyBase58); // Update state for display

      // 5. Get the secret key (handle with care!)
      const currentSecretKey = keypair.secretKey;

      console.log("Generated Public Key from Seed:", publicKeyBase58);

      // 6. Download the secret key AND the seed phrase used
      downloadSecretKey(publicKeyBase58, currentSecretKey, seedPhrase); // Pass seedPhrase here

      // 7. Fund the wallet using the faucet
      // Ensure fundWallet is compatible with JS (e.g., doesn't rely on TS-specific features)
      await fundWallet(keypair.publicKey);

      alert(`Keypair generated & funded from seed!\nPublic Key: ${publicKeyBase58}\n\n⚠️ Seed Phrase & Secret Key downloaded as ${publicKeyBase58}.json. Store it securely!`);

    } catch (error) {
      console.error("Error generating keypair from seed or funding wallet:", error);
      // Check if public key was generated before error
      if (generatedPublicKey) {
         alert(`Keypair generated from seed!\nPublic Key: ${generatedPublicKey}\n\nFailed to fund wallet. Check console for details.\n\n⚠️ Seed Phrase & Secret Key downloaded as ${generatedPublicKey}.json. Store it securely!`);
      } else {
         setSeedError("Failed to generate keypair from seed or fund wallet. See console for details.");
      }
    }
  };

  // Handler to generate a new seed phrase and put it in the input
  const handleGenerateAndFillSeed = () => {
    // Generate 12 words (128 bits of entropy)
    const newMnemonic = bip39.generateMnemonic(128);
    setSeedPhrase(newMnemonic);
    // Clear any previous results/errors related to deterministic generation
    setDeterministicPublicKey(null);
    setSeedError(null);
    console.log("Generated new 12-word seed phrase and filled input.");
  };


  // --- Navigation and Placeholder Handler ---

  // Updated handler to navigate based on action
  const handleOtherClick = (action) => {
    if (action === 'create-wallet') {
      // Reset create wallet state when navigating to it
      setSeedPhrase('');
      setDeterministicPublicKey(null);
      setSeedError(null);
      setCurrentPage('createWallet');
    } else {
      // Keep the placeholder for other actions
      window.alert(`Button clicked: ${action}`);
    }
  };

  // Function to navigate back to main view
  const handleBack = () => {
    setCurrentPage('main');
  };

  // --- Style Definitions ---
  // Using inline styles as provided in the original file, but Tailwind classes are used in the JSX below
  // You might want to consolidate styling approach (either inline styles or Tailwind classes)

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
    transition: 'background-color 0.2s ease',
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

  // Style for the simple back button (inline style version)
  const backButtonStyle = {
      ...baseButtonStyle,
      backgroundColor: '#6c757d', // Gray color
      color: 'white',
      marginTop: '20px',
      alignSelf: 'center', // Center the back button
  };

  // Tailwind classes for elements within the 'createWallet' view
  const styles = {
    button: "w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50",
    input: "w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100",
    textarea: "w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500",
    // container: "p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100", // Using containerStyle instead
    section: "w-full max-w-md p-4 border rounded shadow mb-4 bg-white dark:bg-gray-800", // Added background for dark mode consistency
    label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
    errorText: "text-sm text-red-600 dark:text-red-400",
    infoBox: "mt-4 p-3 border rounded bg-gray-100 dark:bg-gray-700 text-center break-words", // Adjusted dark bg
    code: "block text-sm mt-1 font-mono bg-gray-200 dark:bg-gray-600 p-1 rounded", // Adjusted dark bg
    linkText: "text-xs text-orange-600 dark:text-orange-400 mt-2",
  };


  // --- Render Logic ---

  return (
    <div style={containerStyle}>

      {currentPage === 'main' && (
        <>
          {/* First Div: Header */}
          <div style={headerStyle}>
            Solana Wallet
          </div>

          {/* Second Div: Column Buttons */}
          <div style={middleDivStyle}>
            <button
              onClick={() => handleOtherClick('create-wallet')} // Updated onClick
              style={primaryButtonStyle}
            >
              Create Wallet
            </button>
            <button
              onClick={() => handleOtherClick('Import wallet')} // Use placeholder for others
              style={primaryButtonStyle}
            >
              Import wallet
            </button>
          </div>

          {/* Third Div: Row Buttons - Footer Actions */}
          <div style={thirdDivStyle}>
            <button
              onClick={() => handleOtherClick('Settings')}
              style={secondaryButtonStyle}
            >
              Settings
            </button>
            <button
              onClick={() => handleOtherClick('Activity')}
              style={secondaryButtonStyle}
            >
              Activity
            </button>
            <button
              onClick={() => handleOtherClick('Transfer')}
              style={secondaryButtonStyle}
            >
              Transfer
            </button>
          </div>
        </>
      )}

      {currentPage === 'createWallet' && (
        // Render the "Create Wallet" page view using deterministic generation UI
        // This JSX is adapted from page_two.tsx and uses Tailwind classes defined in `styles` object
        <div className="p-4 flex flex-col items-center h-full"> {/* Added padding and flex for centering */}
            <div className={styles.section}>
              <h2 className="text-lg font-semibold mb-3 text-center text-gray-900 dark:text-gray-100">Create Wallet from Seed</h2>
              <div className="flex flex-col gap-3">
                {/* Button to generate a new seed phrase */}
                <button
                  onClick={handleGenerateAndFillSeed}
                  className={`${styles.button} bg-teal-500 hover:bg-teal-700 text-sm py-1 px-3 mb-2`}
                >
                  Generate & Use New 12-Word Seed
                </button>

                <label htmlFor="seedPhrase" className={styles.label}>
                  Enter Seed Phrase (e.g., 12 or 24 words):
                </label>
                <textarea
                  id="seedPhrase"
                  rows={3}
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                  placeholder="Enter your BIP39 mnemonic seed phrase here, or generate one above..."
                  className={`${styles.textarea} text-gray-900 dark:text-gray-100`} // Ensure text color is set
                />
                {seedError && (
                  <p className={styles.errorText}>{seedError}</p>
                )}
                <button
                  onClick={handleGenerateFromSeed}
                  disabled={!seedPhrase.trim()} // Disable if input is empty
                  className={`${styles.button} bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed`}
                >
                  Generate Keypair from Seed & Fund
                </button>
              </div>

              {deterministicPublicKey && (
                <div className={styles.infoBox}>
                  <p className="font-bold text-gray-900 dark:text-gray-100">Generated Public Key (from Seed):</p>
                  <code className={`${styles.code} text-gray-900 dark:text-gray-100`}>{deterministicPublicKey}</code>
                  <p className={styles.linkText}>
                    ⚠️ This keypair was generated deterministically. Seed phrase & secret key downloaded as a file ({deterministicPublicKey}.json). Store it securely! Wallet funded via devnet faucet.
                  </p>
                </div>
              )}

              {/* Back Button */}
              <button
                onClick={handleBack}
                style={backButtonStyle} // Using inline style for this specific button as per original structure
                // Or use Tailwind: className={`${styles.button} bg-gray-500 hover:bg-gray-700 mt-4 self-center`}
              >
                Back to Main
              </button>
            </div>
        </div>
        // --- End Deterministic Generation Section ---
      )}

    </div>
  );
}
