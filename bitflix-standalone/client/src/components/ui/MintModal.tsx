import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, AlertCircle, CheckCircle, Loader2, Smartphone } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Contract } from "ethers";
import { useToast } from "@/hooks/use-toast";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    id: number;
    tier: string;
    price: string;
    benefits: string[];
  };
}

const MEMBERSHIP_ABI = [
  "function mint(uint256 tierId, uint256 nonce, bytes memory signature) external payable",
  "function prices(uint256) view returns (uint256)",
];

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "";

export default function MintModal({ isOpen, onClose, tier }: MintModalProps) {
  const { 
    address, 
    isConnected, 
    connect, 
    signer, 
    chainId, 
    isCorrectChain, 
    isMobile, 
    switchToPolygon, 
    openMetaMaskMobile 
  } = useWallet();
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAutoSwitching, setIsAutoSwitching] = useState(false);

  useEffect(() => {
    if (isOpen && isConnected && !isCorrectChain && status === 'idle' && !isAutoSwitching) {
      autoSwitchChain();
    }
  }, [isOpen, isConnected, isCorrectChain]);

  const autoSwitchChain = async () => {
    setIsAutoSwitching(true);
    try {
      await switchToPolygon();
    } catch (error) {
      // User may have rejected switch
    } finally {
      setIsAutoSwitching(false);
    }
  };

  const handleConnect = async () => {
    if (isMobile && !window.ethereum) {
      openMetaMaskMobile();
      return;
    }
    await connect();
  };

  const handleMint = async () => {
    if (!isConnected || !signer) {
      await handleConnect();
      return;
    }

    if (!CONTRACT_ADDRESS) {
      setErrorMessage("Contract not deployed yet. Please check back soon!");
      setStatus('error');
      return;
    }

    if (!isCorrectChain) {
      setIsAutoSwitching(true);
      try {
        await switchToPolygon();
        setIsAutoSwitching(false);
        // Retry minting after successful switch
        setTimeout(() => handleMint(), 500);
      } catch (error) {
        setIsAutoSwitching(false);
        toast({
          title: "Network Switch Required",
          description: "Please approve the network switch in MetaMask",
          variant: "destructive",
        });
      }
      return;
    }

    try {
      setStatus('minting');
      setErrorMessage("");

      // Request signature from backend
      const signatureResponse = await fetch('/api/nft/request-mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          tierId: tier.id,
        }),
      });

      if (!signatureResponse.ok) {
        const error = await signatureResponse.json();
        throw new Error(error.error || 'Failed to get mint authorization');
      }

      const { signature, nonce } = await signatureResponse.json();

      // Get contract and price
      const contract = new Contract(CONTRACT_ADDRESS, MEMBERSHIP_ABI, signer);
      const price = await contract.prices(tier.id);
      
      // Send mint transaction with signature and nonce
      const tx = await contract.mint(tier.id, nonce, signature, { value: price });
      
      setTxHash(tx.hash);
      
      // Wait for confirmation
      await tx.wait();
      
      setStatus('success');
      
      // Record mint in backend (requires authentication)
      await fetch('/api/nft/record-mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          walletAddress: address,
          tierId: tier.id,
          txHash: tx.hash,
        }),
      });
      
    } catch (error: any) {
      setStatus('error');
      
      if (error.code === 'ACTION_REJECTED') {
        setErrorMessage("Transaction was rejected");
      } else if (error.message?.includes('insufficient funds')) {
        setErrorMessage("Insufficient MATIC balance");
      } else if (error.message?.includes('Invalid signature')) {
        setErrorMessage("Mint authorization failed. Please try again.");
      } else if (error.message?.includes('Max supply reached')) {
        setErrorMessage("This tier has reached maximum supply");
      } else {
        setErrorMessage(error.message || "Failed to mint NFT");
      }
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setTxHash("");
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-black border border-gold w-full max-w-lg p-8 relative"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
              data-testid="button-close-mint-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Mint {tier.tier} Pass</h2>
            <p className="text-gold text-3xl font-mono mb-6">{tier.price}</p>

            {!isConnected && isMobile && !window.ethereum && status === 'idle' && (
              <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/50 rounded-sm">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-1">Mobile Wallet Required</p>
                    <p className="text-xs text-white/70 mb-3">
                      Tap the button below to open this page in the MetaMask mobile app
                    </p>
                    <button
                      onClick={openMetaMaskMobile}
                      className="w-full text-sm bg-purple-500 text-white px-5 py-3 font-bold uppercase tracking-wider hover:bg-purple-400 transition-colors"
                      data-testid="button-open-metamask-mobile"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Open in MetaMask App
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isConnected && !isCorrectChain && status === 'idle' && isAutoSwitching && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-sm">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
                  <p className="text-sm text-white">Switching to Polygon network...</p>
                </div>
              </div>
            )}

            {status === 'idle' && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider text-white/60 mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-white/80 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleMint}
                  disabled={isAutoSwitching}
                  className={`w-full py-4 ${isMobile ? 'py-5' : 'py-4'} text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
                    isAutoSwitching
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gold text-black hover:bg-white active:scale-95'
                  }`}
                  data-testid="button-mint-nft"
                >
                  {isAutoSwitching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Switching Network...
                    </>
                  ) : !isConnected ? (
                    <>
                      <Wallet className="w-5 h-5" />
                      {isMobile ? 'Connect Wallet' : 'Connect Wallet to Mint'}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Mint {tier.tier} Pass
                    </>
                  )}
                </button>
              </>
            )}

            {status === 'minting' && (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
                <p className="text-white text-lg mb-2">Minting your NFT...</p>
                <p className="text-white/60 text-sm">Please confirm the transaction in your wallet</p>
                {txHash && (
                  <a
                    href={`https://polygonscan.com/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold hover:underline mt-4 inline-block"
                  >
                    View on PolygonScan
                  </a>
                )}
              </div>
            )}

            {status === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-white text-xl font-bold mb-2">Success!</p>
                <p className="text-white/80 mb-6">Your {tier.tier} Pass has been minted</p>
                {txHash && (
                  <a
                    href={`https://polygonscan.com/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gold hover:underline"
                  >
                    View on PolygonScan →
                  </a>
                )}
                <button
                  onClick={handleClose}
                  className="w-full mt-6 bg-transparent border border-white/30 text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Close
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-white text-xl font-bold mb-2">Error</p>
                <p className="text-white/80 mb-6">{errorMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="w-full bg-transparent border border-white/30 text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
