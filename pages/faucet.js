import React, { useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { connection } from './connection'; // Import the named export, not the default

// React component for the faucet page
function FaucetPage() {
  const [status, setStatus] = useState('');
  const [publicKey, setPublicKey] = useState('');

  // Function to fund the wallet using the faucet
  async function fundWallet() {
    if (!publicKey) {
      setStatus('Please enter a public key');
      return;
    }

    try {
      setStatus(`Funding wallet: ${publicKey}`);
      console.log(`Funding wallet: ${publicKey}`);

      // Request airdrop of 1 SOL
      const airdropSignature = await connection.requestAirdrop(
        publicKey, 
        1 * LAMPORTS_PER_SOL
      );

      // Confirm the transaction
      await connection.confirmTransaction(airdropSignature);
      setStatus(`Wallet funded!`);
      console.log(`Wallet funded!`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Solana Faucet</h1>
      <div>
        <input
          type="text"
          placeholder="Enter wallet public key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
        <button onClick={fundWallet}>Fund Wallet</button>
      </div>
      <div>{status}</div>
    </div>
  );
}

// Export the React component as the default export
export default FaucetPage;

// import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
// import connection from './connection'; // Ensure you have a connection.js file

// // Function to fund the wallet using the faucet
// async function fundWallet(publicKey) {
//   console.log(`Funding wallet: ${publicKey}`);

//   // Request airdrop of 1 SOL
//   const airdropSignature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);

//   // Confirm the transaction
//   await connection.confirmTransaction(airdropSignature);
//   console.log(`Wallet funded!`);
// }

// export default fundWallet;
