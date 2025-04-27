import React from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';

// This component will be the page that Next.js renders
function ConnectionPage() {
  return (
    <div>
      <h1>Connection Page</h1>
      <p>Solana connection configured</p>
    </div>
  );
}

// Export the React component as the default export for Next.js
export default ConnectionPage;

// Create and export the connection separately for use in other files
export const createConnection = () => {
  // Read the RPC URL from the environment variable or use the public devnet URL as a fallback
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || clusterApiUrl('devnet');

  // Log a warning if the fallback public URL is being used
  if (rpcUrl === clusterApiUrl('devnet')) {
    console.warn(
      `Warning: Using public Solana Devnet RPC endpoint (${rpcUrl}). ` +
      `This endpoint is rate-limited and may lead to errors (like 429 Too Many Requests). ` +
      `For reliable performance, consider using a dedicated RPC provider (e.g., Helius, QuickNode, Alchemy) ` +
      `and set the NEXT_PUBLIC_SOLANA_RPC_HOST environment variable.`
    );
  } else {
    console.log(`Using custom RPC endpoint: ${rpcUrl}`);
  }

  // Create a connection to the configured Solana RPC endpoint
  return new Connection(rpcUrl, 'confirmed');
};

// For convenience, also export a pre-created connection instance
export const connection = createConnection();

// import { Connection, clusterApiUrl } from '@solana/web3.js';

// // Read the RPC URL from the environment variable or use the public devnet URL as a fallback
// const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST || clusterApiUrl('devnet');

// // Log a warning if the fallback public URL is being used
// if (rpcUrl === clusterApiUrl('devnet')) {
//   console.warn(
//     `Warning: Using public Solana Devnet RPC endpoint (${rpcUrl}). ` +
//     `This endpoint is rate-limited and may lead to errors (like 429 Too Many Requests). ` +
//     `For reliable performance, consider using a dedicated RPC provider (e.g., Helius, QuickNode, Alchemy) ` +
//     `and set the NEXT_PUBLIC_SOLANA_RPC_HOST environment variable.`
//   );
// } else {
//     console.log(`Using custom RPC endpoint: ${rpcUrl}`);
// }


// // Create a connection to the configured Solana RPC endpoint
// const connection = new Connection(rpcUrl, 'confirmed');

// export default connection;
