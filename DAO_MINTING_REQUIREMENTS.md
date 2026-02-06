# BLYSS DAO - NFT Minting & Pass Distribution Requirements

## Executive Summary

This document outlines the technical and operational requirements for the BLYSS DAO to mint membership passes and distribute NFTs to members through the deployed smart contract infrastructure.

---

## Current Infrastructure

### Smart Contract
- **Contract Type**: ERC-1155 Multi-Token Standard
- **Network**: Polygon (Mainnet deployment ready, currently on Amoy Testnet)
- **Contract Address**: `0x8A9a1D470C5C652e898EAEe9392Fad62f4547a50`

### Membership Tiers
| Tier | Name | Token ID | Supply | Purpose |
|------|------|----------|--------|---------|
| 0 | Member | 0 | Unlimited | Entry-level ecosystem access |
| 1 | Builder | 1 | 500 | Active contributors |
| 2 | Council | 2 | 100 | Governance participants |
| 3 | Platinum | 3 | 25 | Founding members |

---

## Requirements to Mint Passes

### 1. Backend Signer Key (CRITICAL)

The `BACKEND_SIGNER_KEY` is the private key that authorizes all mint operations. This key:

- Signs cryptographic messages that the smart contract validates
- Must match the `backendSigner` address stored in the contract
- **Current Backend Signer Address**: `0xf8C4243553821cF43b4F8eb43E83b3A25E8228F0`

**Security Note**: This key must NEVER be exposed publicly. It is stored as an encrypted secret.

### 2. Deployer Private Key

The `DEPLOYER_PRIVATE_KEY` is required for:

- Deploying new contract versions
- Updating contract configuration (pricing, supply limits)
- Emergency administrative functions
- Transferring contract ownership

**Current Deployer Address**: `0x5BE8A7D80F611f1Cf833C3CEc6EC085B6b605e9b`

### 3. RPC Provider Access

A Polygon RPC endpoint is required for blockchain communication:

- Alchemy, Infura, or public Polygon RPC
- Must support both read and write operations
- Recommended: Dedicated API key for rate limit management

### 4. MATIC for Gas Fees

The treasury wallet must maintain MATIC balance for:

- Gas fees on administrative transactions
- Users pay their own gas for minting

---

## Minting Flow Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   User Wallet   │────▶│  Backend Server  │────▶│ Smart Contract  │
│   (MetaMask)    │     │  (Signs Request) │     │   (Validates)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │                        │
        │  1. Request Mint       │                        │
        │  (tier, address)       │                        │
        │───────────────────────▶│                        │
        │                        │                        │
        │                        │  2. Generate Signature │
        │                        │  (BACKEND_SIGNER_KEY)  │
        │                        │                        │
        │  3. Return Signature   │                        │
        │◀───────────────────────│                        │
        │                        │                        │
        │  4. Submit Transaction │                        │
        │  (signature + payment) │                        │
        │────────────────────────────────────────────────▶│
        │                        │                        │
        │                        │  5. Verify Signature   │
        │                        │  & Mint NFT            │
        │                        │                        │
        │  6. NFT Transferred    │                        │
        │◀────────────────────────────────────────────────│
```

---

## Required Environment Secrets

| Secret Name | Purpose | Status |
|-------------|---------|--------|
| `BACKEND_SIGNER_KEY` | Signs mint authorization messages | Required |
| `DEPLOYER_PRIVATE_KEY` | Contract deployment & admin | Required |
| `DATABASE_URL` | User & transaction storage | Configured |
| `INFURA_IPFS_PROJECT_ID` | NFT metadata storage | Configured |
| `INFURA_IPFS_API_SECRET` | IPFS authentication | Configured |

---

## Revenue Distribution

The smart contract automatically distributes mint proceeds:

| Wallet | Percentage | Purpose |
|--------|------------|---------|
| Treasury | 40% | DAO operations |
| Projects | 30% | Incubated dApps |
| Staking | 20% | Member rewards |
| Indigenous Alliance | 10% | Four Worlds partnership |

---

## Security Measures

### Current Implementation
- Rate limiting on mint requests (5 per minute per IP)
- Cryptographic signature validation
- Helmet security headers
- Request body size limits
- HTTPS-only in production

### Recommended Additions
- Multi-signature treasury management
- Time-locked administrative functions
- Regular security audits
- Bug bounty program

---

## Sending NFTs to Members

### Option 1: Airdrop (Admin Transfer)
The contract owner can transfer NFTs directly to member wallets using the `safeTransferFrom` function. This requires:
- Deployer private key
- Recipient wallet addresses
- Gas fees in MATIC

### Option 2: Claim-Based Distribution
Members visit the platform and claim their allocated NFT:
- Backend verifies eligibility
- Generates authorization signature
- Member pays gas for claim transaction

### Option 3: Gasless Minting (Future)
Implement meta-transactions where:
- DAO pays gas on behalf of users
- Requires relayer infrastructure
- Enhanced user experience

---

## Mainnet Deployment Checklist

- [ ] Audit smart contract code
- [ ] Deploy to Polygon Mainnet
- [ ] Update contract address in application
- [ ] Verify contract on Polygonscan
- [ ] Configure production RPC endpoints
- [ ] Test mint flow end-to-end
- [ ] Set up monitoring & alerts
- [ ] Document emergency procedures

---

## Contact & Support

For technical questions regarding the minting infrastructure, please refer to the development team or the smart contract documentation in the `/contracts` directory.

---

*Document Version: 1.0*  
*Last Updated: December 2024*  
*BLYSS DAO - Powering the Next Generation of Sovereign Tech*
