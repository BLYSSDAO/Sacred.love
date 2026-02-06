# BLYSS DAO Tokenomics Whitepaper

## Executive Summary

BLYSS DAO operates as a regenerative investment ecosystem combining blockchain transparency with tokenized capital. This document outlines the complete tokenomics architecture, including membership NFTs, governance tokens, guild/alliance tokens, referral programs, and treasury revenue flows built on Polygon with multisig security.

---

## Table of Contents

1. [Current Infrastructure Status](#1-current-infrastructure-status)
2. [Token Ecosystem Overview](#2-token-ecosystem-overview)
3. [Membership NFT Tiers](#3-membership-nft-tiers)
4. [BLYSS Governance Token](#4-blyss-governance-token)
5. [Guild & Alliance Tokens](#5-guild--alliance-tokens)
6. [Tiered Referral Program](#6-tiered-referral-program)
7. [Treasury & Revenue Distribution](#7-treasury--revenue-distribution)
8. [Multisig Wallet Architecture](#8-multisig-wallet-architecture)
9. [Web3 Developer Requirements](#9-web3-developer-requirements)
10. [Security Requirements](#10-security-requirements)

---

## 1. Current Infrastructure Status

### ✅ ALREADY BUILT (Operational)

| Component | Status | Details |
|-----------|--------|---------|
| **BlyssMembership.sol** | ✅ Deployed | ERC-1155 NFT contract on Polygon Amoy (testnet) |
| **6-Tier Membership System** | ✅ Complete | Community, Council, Creator, Builder, Founder, Platinum |
| **Revenue Distribution** | ✅ On-chain | 40% Treasury, 30% Projects, 20% Staking, 10% Indigenous |
| **Backend Signature Minting** | ✅ Secure | ECDSA signature verification prevents unauthorized mints |
| **Referral Database** | ✅ Complete | Two-tier referral tracking with commission calculation |
| **Treasury Wallet Tracking** | ✅ Database | Treasury transactions and asset tracking |
| **Nonce-based Replay Protection** | ✅ Secure | Prevents transaction replay attacks |

### Contract Address (Polygon Amoy Testnet)

> ⚠️ **TESTNET DEPLOYMENT** - These addresses are for testing only. Mainnet addresses will be generated during production deployment with Gnosis Safe multisig.

```
Contract: 0x8A9a1D470C5C652e898EAEe9392Fad62f4547a50
Network: Polygon Amoy (Chain ID: 80002)
Status: TESTNET - NOT FOR PRODUCTION
```

### Current Revenue Distribution Wallets (TESTNET)

> ⚠️ **TO BE REPLACED** - Production will use Gnosis Safe multisig wallets.

```
Treasury (40%):    0xB2e78906f7A434d4Ed665307d80a4F8B234A8eF7
Projects (30%):    0x02A9676e59647232B7F2966fD2a9a996Fffd33B0
Staking (20%):     0xC96B6fFc49219B432c3989e021c8Db649C1f82BB
Indigenous (10%):  0x13d6FF57d7A1Dc0A24d477a278609aF99E91eedc
Backend Signer:    0xf8C4243553821cF43b4F8eb43E83b3A25E8228F0
```

---

## 2. Token Ecosystem Overview

The BLYSS DAO ecosystem consists of multiple interconnected tokens:

```
┌─────────────────────────────────────────────────────────────┐
│                    BLYSS TOKEN ECOSYSTEM                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  MEMBERSHIP  │    │  GOVERNANCE  │    │    GUILD     │  │
│  │    NFTs      │    │    TOKEN     │    │   TOKENS     │  │
│  │  (ERC-1155)  │    │   ($BLYSS)   │    │  (ERC-20)    │  │
│  │              │    │   (ERC-20)   │    │              │  │
│  │  • Community │    │              │    │  • Catalyst  │  │
│  │  • Council   │    │  Voting      │    │  • Lorekeeper│  │
│  │  • Creator   │    │  Rights      │    │  • Artisan   │  │
│  │  • Builder   │    │  Delegation  │    │  • Architect │  │
│  │  • Founder   │    │              │    │              │  │
│  │  • Platinum  │    │              │    │              │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                    │          │
│         └───────────────────┼────────────────────┘          │
│                             │                               │
│              ┌──────────────▼──────────────┐               │
│              │    CENTRAL DAO TREASURY     │               │
│              │     (Multisig Wallet)       │               │
│              │                              │               │
│              │  • Membership Revenue        │               │
│              │  • 33% Incubator Revenue     │               │
│              │  • Staking Rewards           │               │
│              │  • Referral Payouts          │               │
│              └──────────────────────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Membership NFT Tiers

### 6-Tier ERC-1155 Implementation

| Tier | Token ID | Price (USD) | Max Supply | Core Value |
|------|----------|-------------|------------|------------|
| **Community** | 0 | FREE | Unlimited | Explore & connect |
| **Council** | 1 | $222 | 10,000 | Discounts & voting |
| **Creator** | 2 | $2,222 | 5,000 | Sell courses & products |
| **Builder** | 3 | $22,222 | 1,000 | All-access + wholesale + invest |
| **Founder** | 4 | $111,000 | 333 | Revenue share + strategic partner (invite-only) |
| **Platinum** | 5 | $222,222 | 33 | Visionary co-creator (invite-only) |

> ⚠️ **Note**: Testnet uses reduced prices for development. Production prices configured during mainnet deployment.

### Tier Benefits Matrix

```
Feature                    Community  Council  Creator  Builder  Founder  Platinum
──────────────────────────────────────────────────────────────────────────────────
DAO Voting Weight              0x       1x       2x       5x       15x      25x
Academy Courses            Basic     15% off  30% off  INCLUDED INCLUDED INCLUDED
Marketplace Discount           0%      10%      20%      35%      50%      50%
BlyssBlendz/Labs               0%      20%      30%      40%      50%      60%
Events & Retreats              0%      15%      25%   INCLUDED INCLUDED INCLUDED
Sell on Academy                ─        ─        ✓        ✓        ✓        ✓
Sell on Marketplace            ─        ─        ✓        ✓        ✓        ✓
LightRok Capitol               ─        ─        ─        ✓        ✓        ✓
Revenue Share                  ─        ─        ─        ─        ✓        ✓
Incubator Access               ─        ─        ─       View    Invest  Sponsor
Referral Tier 1                0%       5%       8%      12%      15%      20%
Referral Tier 2                ─        ─        ─        5%       5%       5%
```

### Creator Revenue Model

Creators (tier 2+) can sell courses and products with a 67/33 split:
- **Creator keeps**: 67% of all sales
- **Platform takes**: 33% to ecosystem treasury

The 33% platform fee is distributed:
- 40% DAO Treasury (operations, growth)
- 30% Project Development Fund
- 20% Staking Rewards Pool
- 10% Four Worlds Indigenous Alliance

---

## 4. BLYSS Governance Token

### Token Specifications (TO BE BUILT)

```
Token Name:     BLYSS
Symbol:         $BLYSS
Standard:       ERC-20
Network:        Polygon Mainnet
Total Supply:   100,000,000 BLYSS
Decimals:       18
```

### Token Distribution

| Allocation | Percentage | Amount | Vesting |
|------------|------------|--------|---------|
| DAO Treasury | 40% | 40,000,000 | Unlocked over 4 years |
| Community Rewards | 25% | 25,000,000 | Earned through participation |
| Team & Advisors | 15% | 15,000,000 | 2-year vest, 1-year cliff |
| Incubator Projects | 10% | 10,000,000 | Allocated to funded projects |
| Liquidity Provision | 5% | 5,000,000 | Initial DEX liquidity |
| Strategic Partners | 5% | 5,000,000 | Partnership allocations |

### Governance Utility

1. **Proposal Voting** - Vote on treasury allocation, project funding, policy changes
2. **Delegation** - Delegate voting power to trusted community members
3. **Staking Rewards** - Stake $BLYSS for yield and boosted voting power
4. **Fee Discounts** - Reduced fees on marketplace and trading
5. **Exclusive Access** - Token-gated features and content

---

## 5. Guild & Alliance Tokens

### Guild Token System (TO BE BUILT)

Each guild has its own ERC-20 token earned through role-specific contributions:

| Guild | Token | Earning Mechanisms |
|-------|-------|-------------------|
| **Market Catalysts** | $CATALYST | Asset sales, referrals, promotion |
| **Lorekeepers** | $LORE | Course creation, education, content |
| **Guild Artisans** | $ARTISAN | Marketplace sales, creation, crafting |
| **Architects** | $ARCH | Development, technical contributions |

### Alliance Tokens

**Four Worlds Jaguar Alliance Token** - Special partnership token:
- Dedicated to Indigenous partnership initiatives
- 33% of specific revenue streams
- Used for land restoration voting
- Sacred medicine program governance

---

## 6. Tiered Referral Program

### Current Implementation Status

✅ **Database Layer** - Fully implemented
✅ **Commission Calculation** - Working (6-tier structure)
✅ **Referral Code Generation** - Complete
⚠️ **On-Chain Payouts** - Needs smart contract

### Program Structure

The referral system has tiered commission rates based on the referrer's membership level:

#### Commission Rates by Tier

| Tier | Direct Referral (Tier 1) | Second-Tier Income (Tier 2) |
|------|--------------------------|----------------------------|
| **Community** (Free) | 0% | — |
| **Council** ($222) | 5% | — |
| **Creator** ($2,222) | 8% | — |
| **Builder** ($22,222) | 12% | 5% |
| **Founder** ($111,000) | 15% | 5% |
| **Platinum** ($222,222) | 20% | 5% |

#### Second-Tier Income (Builder+ Only)

Builder, Founder, and Platinum members earn an additional 5% on purchases made by people their referrals bring in:

```
You (Builder) → Refer Alice → Alice refers Bob → Bob purchases $22,222 Builder

You earn: 5% of $22,222 = $1,111 (second-tier income)
Alice earns: Her tier's commission on Bob's purchase
```

#### Example Earnings

| If You're... | You Refer a Creator ($2,222) | You Refer a Builder ($22,222) |
|--------------|------------------------------|-------------------------------|
| Council | $111 (5%) | $1,111 (5%) |
| Creator | $177 (8%) | $1,777 (8%) |
| Builder | $266 (12%) + tier 2 | $2,666 (12%) + tier 2 |
| Founder | $333 (15%) + tier 2 | $3,333 (15%) + tier 2 |
| Platinum | $444 (20%) + tier 2 | $4,444 (20%) + tier 2 |

```
┌─────────────────────────────────────────────────────────────┐
│              TWO-TIER REFERRAL PROGRAM                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   TIER 1: DIRECT REFERRAL                                   │
│   ─────────────────────────                                 │
│   Referrer gets commission when their direct referral       │
│   purchases a membership.                                   │
│                                                              │
│   Personal Program (Member/Council referrers):              │
│     - 10% commission on Member/Council referrals            │
│                                                              │
│   Builder Program (Builder+ referrers):                     │
│     - Commission scales with referrer tier (10-25%)         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   TIER 2: INDIRECT REFERRAL                                 │
│   ─────────────────────────                                 │
│   Original referrer gets secondary commission when their    │
│   referral brings in new members.                           │
│                                                              │
│   All Tiers:      5% of Tier 1 commission                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

> **Backend Status**: Referral tracking and commission calculation are fully implemented in the database layer. On-chain payout contract is pending Web3 development.

### Example Calculation

```
Scenario: Alice (Builder) refers Bob, Bob refers Carol

Carol purchases Builder membership at $2,222:

1. Bob (Direct Referrer) receives:
   $2,222 × 15% = $333.30 (Tier 1)

2. Alice (Indirect Referrer) receives:
   $333.30 × 5% = $16.67 (Tier 2)

Total Referral Payout: $349.97
```

### Referral Payout Flow (TO BE BUILT)

```
┌──────────────┐    Mint     ┌──────────────┐    Calculate    ┌──────────────┐
│   New User   │ ──────────► │  Membership  │ ────────────► │   Backend    │
│              │             │   Contract   │                │   Server     │
└──────────────┘             └──────────────┘                └──────────────┘
                                    │                              │
                                    │ 40% to Treasury              │
                                    ▼                              │
                            ┌──────────────┐                       │
                            │   Treasury   │◄──────────────────────┘
                            │   Wallet     │   Queue Payout
                            └──────────────┘
                                    │
                            ┌───────┴───────┐
                            ▼               ▼
                    ┌──────────────┐ ┌──────────────┐
                    │   Tier 1     │ │   Tier 2     │
                    │   Referrer   │ │   Referrer   │
                    │   Payout     │ │   Payout     │
                    └──────────────┘ └──────────────┘
```

---

## 7. Treasury & Revenue Distribution

### Revenue Streams

| Source | Treasury Share | Flow |
|--------|---------------|------|
| Membership Mints | 40% | Direct on-chain |
| Incubated Projects | 33% | Project revenue share |
| Marketplace Fees | 30% | Platform commission |
| Trading Fees (DEX) | 25% | Swap fees |
| Academy Course Sales | 20% | Creator gets 80% |

### 33% Incubator Revenue Implementation

For all incubated projects (BITFLIX, Luxara, BlyssLabs, etc.):

```solidity
// Revenue Split Contract (TO BE BUILT)
contract IncubatorRevenue {
    uint256 public constant DAO_SHARE = 33; // 33%
    address public daoTreasury;
    
    function distributeRevenue(uint256 amount) external {
        uint256 daoAmount = (amount * DAO_SHARE) / 100;
        uint256 projectAmount = amount - daoAmount;
        
        // Send to DAO treasury
        payable(daoTreasury).transfer(daoAmount);
        
        // Send to project treasury
        payable(msg.sender).transfer(projectAmount);
    }
}
```

### Treasury Allocation Framework

```
┌─────────────────────────────────────────────────────────────┐
│                    DAO TREASURY ALLOCATION                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Incoming Revenue                                          │
│   ────────────────                                          │
│   ├── Membership Mints (40%)                                │
│   ├── Incubator Revenue (33%)                               │
│   ├── Platform Fees                                         │
│   └── Staking Yields                                        │
│                                                              │
│   Outgoing Allocations                                      │
│   ────────────────────                                      │
│   ├── Referral Payouts (15%)                                │
│   ├── Staking Rewards (20%)                                 │
│   ├── Project Funding (25%)                                 │
│   ├── Operations (15%)                                      │
│   ├── Indigenous Alliance (10%)                             │
│   └── Reserve (15%)                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Multisig Wallet Architecture

### Required Multisig Setup (TO BE IMPLEMENTED)

All treasury operations must use Gnosis Safe multisig:

| Wallet | Signers Required | Total Signers | Purpose |
|--------|------------------|---------------|---------|
| **Main Treasury** | 4-of-7 | 7 | Primary DAO funds |
| **Referral Payout** | 2-of-3 | 3 | Automated referral payouts |
| **Operations** | 2-of-4 | 4 | Day-to-day expenses |
| **Emergency** | 5-of-7 | 7 | Contract upgrades, emergencies |

### Transaction Flow

```
┌──────────────┐    Propose    ┌──────────────┐    Execute    ┌──────────────┐
│   Signer 1   │ ───────────► │   Gnosis     │ ────────────► │   Target     │
│              │              │   Safe       │               │   Contract   │
└──────────────┘              └──────────────┘               └──────────────┘
                                     ▲
                                     │ Approve
                              ┌──────┴──────┐
                              │  Signers    │
                              │  2, 3, 4... │
                              └─────────────┘
```

---

## 9. Web3 Developer Requirements

### Summary: What Needs to Be Built

| Priority | Component | Complexity | Estimated Time |
|----------|-----------|------------|----------------|
| 🔴 HIGH | Referral Payout Contract | Medium | 2-3 weeks |
| 🔴 HIGH | Multisig Integration | Medium | 2 weeks |
| 🔴 HIGH | Mainnet Deployment | Low | 1 week |
| 🟡 MED | BLYSS Governance Token | Medium | 2-3 weeks |
| 🟡 MED | Incubator Revenue Contract | Medium | 2 weeks |
| 🟡 MED | Guild Token Contracts | Medium | 3-4 weeks |
| 🟢 LOW | Alliance Token | Low | 1 week |
| 🟢 LOW | Staking Contract | High | 4-6 weeks |

### Detailed Smart Contract Specifications

#### 1. ReferralPayouts.sol (HIGH PRIORITY)

```solidity
// SPECIFICATIONS FOR WEB3 DEVELOPER

contract ReferralPayouts {
    // State
    mapping(address => uint256) public pendingPayouts;
    mapping(address => address) public tier1Referrer;
    mapping(address => address) public tier2Referrer;
    
    // Commission rates (basis points, 10000 = 100%)
    uint256 public tier1Rate = 1000; // 10% base
    uint256 public tier2Rate = 500;  // 5% of tier1
    
    // Integration with membership contract
    address public membershipContract;
    address public treasuryWallet;
    
    // Events
    event ReferralRegistered(address indexed referrer, address indexed referred);
    event PayoutQueued(address indexed recipient, uint256 amount);
    event PayoutExecuted(address indexed recipient, uint256 amount);
    
    // Functions needed:
    function registerReferral(address referrer, address referred) external;
    function calculateCommission(address minter, uint256 tier, uint256 amount) external returns (uint256, uint256);
    function queuePayout(address recipient, uint256 amount) external;
    function executePayout(address recipient) external; // multisig required
    function batchExecutePayouts(address[] calldata recipients) external; // multisig required
}
```

#### 2. IncubatorRevenue.sol (MEDIUM PRIORITY)

```solidity
// SPECIFICATIONS FOR WEB3 DEVELOPER

contract IncubatorRevenue {
    uint256 public constant DAO_SHARE = 3300; // 33% in basis points
    
    struct Project {
        address projectWallet;
        uint256 totalRevenue;
        uint256 daoShare;
        bool active;
    }
    
    mapping(bytes32 => Project) public projects;
    address public daoTreasury;
    
    // Functions needed:
    function registerProject(bytes32 projectId, address wallet) external; // admin only
    function distributeRevenue(bytes32 projectId) external payable;
    function updateProjectWallet(bytes32 projectId, address newWallet) external;
    function getProjectStats(bytes32 projectId) external view returns (Project memory);
}
```

#### 3. BLYSSToken.sol (MEDIUM PRIORITY)

```solidity
// SPECIFICATIONS FOR WEB3 DEVELOPER

contract BLYSSToken is ERC20, ERC20Permit, ERC20Votes {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;
    
    // Vesting schedules
    struct VestingSchedule {
        uint256 total;
        uint256 released;
        uint256 start;
        uint256 cliff;
        uint256 duration;
    }
    
    mapping(address => VestingSchedule) public vestingSchedules;
    
    // Functions needed:
    function createVestingSchedule(address beneficiary, uint256 amount, uint256 cliff, uint256 duration) external;
    function release(address beneficiary) external;
    function delegate(address delegatee) external;
    function getCurrentVotes(address account) external view returns (uint256);
}
```

#### 4. GuildTokenFactory.sol (MEDIUM PRIORITY)

```solidity
// SPECIFICATIONS FOR WEB3 DEVELOPER

contract GuildTokenFactory {
    struct GuildToken {
        address tokenAddress;
        string name;
        string symbol;
        uint256 totalMinted;
    }
    
    mapping(bytes32 => GuildToken) public guildTokens;
    
    // Functions needed:
    function createGuildToken(string memory name, string memory symbol) external returns (address);
    function mintGuildTokens(bytes32 guildId, address recipient, uint256 amount) external;
    function burnGuildTokens(bytes32 guildId, uint256 amount) external;
}
```

### Integration Requirements

The Web3 developer must integrate with existing systems:

1. **Backend API Integration**
   - Connect to existing `/api/referral/*` endpoints
   - Sync on-chain events with PostgreSQL database
   - Handle signature verification for minting

2. **Frontend Integration**
   - Wallet connection already working (ethers.js v6)
   - Add transaction signing for new contracts
   - Display on-chain referral balances

3. **Event Indexing**
   - Set up The Graph subgraph or similar
   - Index all payout and revenue events
   - Provide real-time dashboard data

---

## 10. Security Requirements

### Mandatory Security Measures

1. **Smart Contract Audits**
   - Full audit by reputable firm (Certik, OpenZeppelin, Trail of Bits)
   - All critical contracts must be audited before mainnet

2. **Multisig Requirements**
   - All admin functions behind multisig
   - Time-lock on critical operations (24-48 hours)
   - Emergency pause functionality

3. **Access Control**
   - Role-based access (OpenZeppelin AccessControl)
   - Separate roles: ADMIN, MINTER, PAUSER, UPGRADER

4. **Upgrade Safety**
   - Use UUPS or Transparent Proxy pattern
   - Upgrade timelock minimum 48 hours
   - Community notification before upgrades

5. **Testing Requirements**
   - 100% unit test coverage for all contracts
   - Integration tests with testnet deployment
   - Formal verification for treasury contracts

### Security Checklist for Deployment

```
Pre-Deployment:
□ All contracts audited
□ Testnet deployment completed
□ Multisig wallets created
□ Emergency procedures documented
□ Bug bounty program launched

Deployment:
□ Deploy to mainnet from multisig
□ Verify all contracts on Polygonscan
□ Transfer ownership to multisig
□ Test all functions on mainnet
□ Enable monitoring and alerts

Post-Deployment:
□ 24/7 monitoring active
□ Incident response team ready
□ Regular security reviews scheduled
□ Community transparency reports
```

---

## Appendix: Current Code References

### Existing Files

| File | Purpose | Status |
|------|---------|--------|
| `contracts/BlyssMembership.sol` | Membership NFT contract | ✅ Complete |
| `server/services/mint-signer.ts` | Backend signature generation | ✅ Complete |
| `shared/schema.ts` | Database schema with referrals | ✅ Complete |
| `server/routes.ts` | API endpoints for referrals | ✅ Complete |
| `client/src/lib/blockchain.ts` | Frontend wallet integration | ✅ Complete |

### Environment Variables Needed

```
# Existing
POLYGON_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/...
DEPLOYER_PRIVATE_KEY=... (secure, for deployment only)
BACKEND_SIGNER_KEY=... (for mint signatures)

# To Add for Web3 Dev
MAINNET_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/...
GNOSIS_SAFE_ADDRESS=...
REFERRAL_PAYOUT_CONTRACT=...
BLYSS_TOKEN_ADDRESS=...
```

---

*Document Version: 1.0*
*Last Updated: January 2026*
*Prepared for: BLYSS DAO Development Team*
