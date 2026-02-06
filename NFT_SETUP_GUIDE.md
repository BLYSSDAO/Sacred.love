# BLYSS DAO NFT Minting Setup Guide

## Overview
This guide will help you deploy the NFT smart contract, upload artwork, and enable minting on your BLYSS DAO platform.

## Prerequisites
- Wallet with MATIC tokens on Polygon Amoy (testnet) or Polygon mainnet
- Artwork files for all 4 tiers (Member, Builder, Council, Platinum)
- Alchemy or Infura RPC URL (free tier available)

## Step 1: Set Up Environment Variables

Add these to your Replit Secrets:

```
# Blockchain Configuration
POLYGON_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
DEPLOYER_PRIVATE_KEY=your_wallet_private_key_here

# Backend Signer (for secure minting authorization)
BACKEND_SIGNER_KEY=private_key_for_signing_mint_requests
BACKEND_SIGNER=0xAddressOfBackendSigner

# Treasury Wallets (revenue distribution)
TREASURY_WALLET=0xYourTreasuryAddress
PROJECTS_WALLET=0xYourProjectsAddress
STAKING_WALLET=0xYourStakingAddress
INDIGENOUS_WALLET=0xYourIndigenousAddress

# After deployment
CONTRACT_ADDRESS=deployed_contract_address_here
VITE_CONTRACT_ADDRESS=same_as_above_for_frontend
```

**Important Security Notes:**
- The `BACKEND_SIGNER_KEY` can be the same as `DEPLOYER_PRIVATE_KEY` or a separate wallet
- This key is used to authorize mints and prevent unauthorized/bot minting
- Keep this key secure - it should only be accessible to your backend server
- The `BACKEND_SIGNER` address must match the public address of `BACKEND_SIGNER_KEY`

### Getting an RPC URL:
1. Go to https://www.alchemy.com/ or https://www.infura.io/
2. Create free account
3. Create new app (Polygon Amoy for testnet)
4. Copy the HTTPS URL

### Getting Test MATIC:
- Polygon Faucet: https://faucet.polygon.technology/

## Step 2: Prepare Artwork

### Requirements:
- **Format**: PNG or JPG
- **Size**: Recommended 1000x1000px or higher
- **File names**: `member.png`, `builder.png`, `council.png`, `platinum.png`
- **Location**: Place in `artwork/` directory

### Design Tips:
- Use consistent visual style across tiers
- Include tier-specific elements (colors, symbols)
- Keep text minimal (metadata shows on marketplaces)
- Ensure artwork represents the tier value

## Step 3: Deploy Smart Contract

```bash
# Compile contract
npx hardhat compile

# Deploy to testnet (Polygon Amoy)
npx hardhat run scripts/deploy.ts --network polygonAmoy

# Deploy to mainnet (Polygon)
npx hardhat run scripts/deploy.ts --network polygon
```

Save the deployed contract address to your secrets as `CONTRACT_ADDRESS`.

## Step 4: Upload Artwork to IPFS

```bash
# Upload all tier artwork and metadata
npx tsx scripts/upload-artwork.ts
```

This will:
1. Upload each artwork image to IPFS
2. Create metadata JSON for each tier
3. Upload metadata to IPFS
4. Return CID (Content Identifier)

## Step 5: Update Contract with IPFS URI

After uploading artwork, update the contract:

```bash
npx hardhat run scripts/update-uri.ts --network polygonAmoy
```

## Step 6: Test Minting

1. Navigate to `/membership` on your platform
2. Connect your wallet
3. Select a tier
4. Click "Mint Access Pass"
5. Approve the transaction in MetaMask
6. Wait for confirmation

## Verification

### Check on Blockchain:
- **Testnet**: https://amoy.polygonscan.com/
- **Mainnet**: https://polygonscan.com/

### View NFT:
- OpenSea Testnet: https://testnets.opensea.io/
- OpenSea Mainnet: https://opensea.io/

## Security Features

The smart contract includes enterprise-grade security:

1. **Signature-Based Minting**: Each mint requires a cryptographic signature from your backend server, preventing unauthorized bot minting and front-running attacks.

2. **Nonce Tracking**: Each wallet has an incrementing nonce to prevent replay attacks - signatures can only be used once.

3. **ReentrancyGuard**: Protects against reentrancy attacks during payment distribution.

4. **Multi-Sig Compatible Payments**: Uses low-level `.call{value: }()` instead of `.transfer()` to support multi-signature wallets and smart contract wallets.

5. **Zero-Address Validation**: All wallet addresses are validated to prevent accidental loss of funds.

6. **Payment Event Logging**: Every payment distribution emits an event for transparency and tracking.

## Contract Functions

### Owner Functions (Admin Only):
- `setPrice(tierId, newPrice)` - Update tier pricing
- `setBaseURI(newURI)` - Update metadata URI
- `setWallets(...)` - Update revenue split wallets
- `setBackendSigner(newSigner)` - Update the authorized backend signer address

### Public Functions:
- `mint(tierId, nonce, signature)` - Mint membership NFT (requires backend signature)
- `prices(tierId)` - View tier price
- `totalSupply(tierId)` - View minted count
- `balanceOf(address, tierId)` - Check if address owns tier
- `nonces(address)` - Get current nonce for user (prevents replay attacks)

## Revenue Distribution

Automatic on each mint:
- **40%** → Treasury Wallet
- **30%** → Projects Wallet
- **20%** → Staking Wallet
- **10%** → Indigenous Royalty Wallet

## Troubleshooting

### "Insufficient funds" error:
- Ensure wallet has enough MATIC for price + gas fees
- Gas on Polygon is typically $0.01-0.05

### "Contract not initialized":
- Check `CONTRACT_ADDRESS` and `POLYGON_RPC_URL` are set
- Restart the application

### Metadata not showing:
- Wait 5-10 minutes for IPFS propagation
- Check baseURI is correct in contract
- Verify metadata format matches OpenSea standards

### Transaction failed:
- Check you're on correct network (Polygon, not Ethereum)
- Ensure contract is deployed and address is correct
- Verify tier hasn't reached max supply

## Cost Estimate

### Testnet (Polygon Amoy):
- Contract deployment: FREE (faucet MATIC)
- Minting: FREE
- IPFS storage: FREE

### Mainnet (Polygon):
- Contract deployment: ~$5-10 USD
- Minting per NFT: ~$0.01-0.05 USD
- IPFS storage: FREE (using public gateways)

## Support

For issues or questions:
1. Check browser console for errors
2. View transaction on PolygonScan
3. Verify all environment variables are set
4. Ensure wallet is connected to Polygon network

## Next Steps

After successful deployment:
1. Test minting on testnet
2. Verify NFTs appear in wallets
3. Check revenue distribution works
4. Deploy to mainnet when ready
5. Promote to your community!
