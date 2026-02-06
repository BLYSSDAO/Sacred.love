import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, X, Copy, Check, Loader2 } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

export default function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => isConnected ? setIsOpen(true) : connect()}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${
          isConnected 
            ? "bg-gold/10 border-gold text-gold hover:bg-gold hover:text-black" 
            : "bg-transparent border-white/30 text-white hover:bg-white hover:text-black"
        }`}
        data-testid="button-connect-wallet"
      >
        {isConnecting ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <Wallet className="w-3 h-3" />
        )}
        {isConnecting ? "Connecting..." : isConnected && address ? formatAddress(address) : "Connect"}
      </button>

      <AnimatePresence>
        {isOpen && isConnected && address && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-black border border-gold w-full max-w-md p-6 relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-white mb-6">Your Wallet</h3>
              
              <div className="bg-white/5 p-4 mb-6 flex items-center justify-between border border-white/10">
                <span className="font-mono text-gold text-sm">{formatAddress(address)}</span>
                <button 
                  onClick={copyAddress}
                  className="text-white/50 hover:text-white"
                  data-testid="button-copy-address"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Network</span>
                  <span className="text-white font-mono font-bold text-sm">Polygon</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Access Tier</span>
                  <span className="text-white font-mono font-bold text-sm">None</span>
                </div>
              </div>

              <button 
                onClick={() => { disconnect(); setIsOpen(false); }}
                className="w-full py-3 text-xs font-bold uppercase tracking-widest border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                data-testid="button-disconnect-wallet"
              >
                Disconnect
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
