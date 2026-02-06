import { JsonRpcProvider, FallbackProvider, BrowserProvider } from "ethers";

const POLYGON_RPC_ENDPOINTS = [
  "https://polygon-rpc.com",
  "https://rpc-mainnet.matic.network",
  "https://matic-mainnet.chainstacklabs.com",
  "https://rpc.ankr.com/polygon",
  "https://polygon-mainnet.public.blastapi.io",
];

let cachedProvider: FallbackProvider | null = null;

export function getPolygonProvider(): FallbackProvider {
  if (cachedProvider) return cachedProvider;

  const providers = POLYGON_RPC_ENDPOINTS.map((url, index) => ({
    provider: new JsonRpcProvider(url, 137),
    priority: index + 1,
    stallTimeout: 2000,
    weight: 1,
  }));

  cachedProvider = new FallbackProvider(providers, 137, {
    quorum: 1,
  });

  return cachedProvider;
}

export async function getReadOnlyProvider(): Promise<JsonRpcProvider> {
  for (const url of POLYGON_RPC_ENDPOINTS) {
    try {
      const provider = new JsonRpcProvider(url, 137);
      await provider.getBlockNumber();
      return provider;
    } catch {
      continue;
    }
  }
  throw new Error("All RPC endpoints failed");
}

export function getWalletProvider(): BrowserProvider | null {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new BrowserProvider(window.ethereum);
  }
  return null;
}

export async function isBlockchainAvailable(): Promise<boolean> {
  try {
    const provider = getPolygonProvider();
    await provider.getBlockNumber();
    return true;
  } catch {
    return false;
  }
}
