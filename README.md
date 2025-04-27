# 🌞 Solana Wallet Chrome Extension (bwalletteSolana)

## 📝 Description

A Chrome browser extension for interacting with the Solana blockchain. It allows users to create, import (partially implemented), and manage Solana wallets directly within their browser popup. This project demonstrates key Solana functionalities like keypair generation (random and deterministic), transaction signing for transfers, viewing account activity, and interacting with the Devnet.


## 🚀 Setup and Installation


1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Variables:**
   * The application uses `process.env.NEXT_PUBLIC_SOLANA_RPC_HOST` to connect to the Solana network. If not set, it defaults to the public Solana Devnet RPC (`https://api.devnet.solana.com`).
   * For better performance and reliability, consider setting this variable to a dedicated RPC endpoint (e.g., from Helius, QuickNode, Alchemy, or your own node). Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
   # Or replace with your dedicated RPC URL
   ```

4. **Build the extension:**
   * You need to build the Next.js application and export it as static files suitable for a Chrome extension. Check your `package.json` for the specific scripts, but they are typically:
   ```bash
   yarn build
   ```

5. **Load the extension in Chrome:**
   * Open Chrome and navigate to `chrome://extensions/`
   * Enable "Developer mode" (usually a toggle in the top right)
   * Click "Load unpacked"
   * Select the `out` directory generated in the previous step
   * The extension icon should appear in your browser toolbar. Ensure your `manifest.json` is configured correctly to use `popup.html` (or the equivalent exported file) for the browser action

## Development Notes

* The application is configured to interact with the Solana **Devnet** by default
* Funding for new wallets is provided via an integrated call to a Devnet faucet function (`fundWallet`). Faucet requests may be rate-limited by the RPC provider
* Ensure you have a stable RPC connection for reliable transaction fetching and submission. Public RPC endpoints (like the default `api.devnet.solana.com`) have strict rate limits, which can cause errors during heavy use (like fetching many transaction details). Consider using a dedicated RPC provider for development

## 🤝 Connect with the Dev

* 🎮 I built this web3 project live on [Twitch](https://www.twitch.tv/krystal_mess323)
* 📝 I publish articles weekly relating to CS topics on LinkedIn
* 🎬 I publish videos weekly relating to CS topics on [YouTube](https://www.youtube.com/@krystal_mess323)

### My Socials
* Twitch: [https://www.twitch.tv/krystal_mess323](https://www.twitch.tv/krystal_mess323)
* Twitter: [https://x.com/MikeS47896459](https://x.com/MikeS47896459)
* YouTube: [https://www.youtube.com/@krystal_mess323](https://www.youtube.com/@krystal_mess323)