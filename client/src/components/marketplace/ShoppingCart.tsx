import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart as CartIcon, X, Plus, Minus, Trash2, CreditCard,
  Wallet, Check, Loader2, ChevronRight, Shield, Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { useCart } from "@/contexts/CartContext";

type PaymentMethod = "credit-card" | "usdt" | "usdc" | "dai" | "eth";

const CRYPTO_OPTIONS = [
  { id: "usdt", name: "USDT", symbol: "Tether", icon: "₮", color: "text-green-400" },
  { id: "usdc", name: "USDC", symbol: "USD Coin", icon: "$", color: "text-blue-400" },
  { id: "dai", name: "DAI", symbol: "Dai", icon: "◈", color: "text-yellow-400" },
  { id: "eth", name: "ETH", symbol: "Ethereum", icon: "Ξ", color: "text-purple-400" },
];

export function ShoppingCartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { isConnected, address, connect } = useWallet();
  const { items, updateQuantity, removeItem, clearCart, itemCount, total } = useCart();

  const handleCheckout = async () => {
    if (paymentMethod !== "credit-card" && !isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to pay with crypto.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order Placed!",
      description: paymentMethod === "credit-card" 
        ? "Your order has been placed successfully." 
        : `Payment of ${total.toLocaleString()} ${paymentMethod.toUpperCase()} initiated.`,
    });
    
    setIsProcessing(false);
    setIsCheckout(false);
    clearCart();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white/70 hover:text-gold"
          data-testid="button-open-cart"
        >
          <CartIcon className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/95 border-gold/30 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <CartIcon className="w-5 h-5 text-gold" />
            Shopping Cart
            {itemCount > 0 && (
              <Badge className="bg-gold/20 text-gold border-gold/30 ml-2">
                {itemCount} items
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {!isCheckout ? (
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <CartIcon className="w-16 h-16 text-gold/30 mx-auto mb-4" />
                <p className="text-white/60">Your cart is empty</p>
                <p className="text-white/40 text-sm mt-2">Add some wellness products to get started</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <Card key={item.id} className="bg-black/40 border-gold/20">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-black rounded-lg flex items-center justify-center shrink-0">
                            <Coins className="w-8 h-8 text-gold/40" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white truncate" data-testid={`text-cart-item-${item.id}`}>
                              {item.title}
                            </h4>
                            <p className="text-xs text-white/50">{item.shop}</p>
                            <p className="text-gold font-bold mt-1">${item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              onClick={() => removeItem(item.id)}
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white/60 hover:text-white"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 text-center text-white text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-white/60 hover:text-white"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t border-gold/20 pt-4 space-y-3">
                  <div className="flex justify-between text-white">
                    <span className="text-white/60">Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span className="text-white/60">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-gold/20">
                    <span>Total</span>
                    <span className="text-gold">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-6"
                  onClick={() => setIsCheckout(true)}
                  data-testid="button-proceed-checkout"
                >
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-gold -ml-2"
              onClick={() => setIsCheckout(false)}
              data-testid="button-back-to-cart"
            >
              ← Back to Cart
            </Button>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
              
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <Card className={`bg-black/40 border-2 transition-all cursor-pointer ${paymentMethod === "credit-card" ? 'border-gold' : 'border-gold/20 hover:border-gold/40'}`}>
                  <CardContent className="p-4">
                    <label className="flex items-center gap-4 cursor-pointer">
                      <RadioGroupItem value="credit-card" className="border-gold text-gold" data-testid="radio-credit-card" />
                      <CreditCard className="w-6 h-6 text-white/70" />
                      <div className="flex-1">
                        <p className="font-semibold text-white">Credit / Debit Card</p>
                        <p className="text-xs text-white/50">Visa, Mastercard, Amex</p>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">VISA</div>
                        <div className="w-8 h-5 bg-red-500 rounded text-white text-[8px] flex items-center justify-center font-bold">MC</div>
                      </div>
                    </label>
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <p className="text-sm text-white/60 mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-gold" />
                    Pay with Crypto (Stablecoins)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {CRYPTO_OPTIONS.map((crypto) => (
                      <Card 
                        key={crypto.id}
                        className={`bg-black/40 border-2 transition-all cursor-pointer ${paymentMethod === crypto.id ? 'border-gold' : 'border-gold/20 hover:border-gold/40'}`}
                      >
                        <CardContent className="p-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <RadioGroupItem value={crypto.id} className="border-gold text-gold" data-testid={`radio-${crypto.id}`} />
                            <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                            <div>
                              <p className="font-semibold text-white text-sm">{crypto.name}</p>
                              <p className="text-[10px] text-white/50">{crypto.symbol}</p>
                            </div>
                          </label>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod !== "credit-card" && !isConnected && (
              <Card className="bg-gold/10 border-gold/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-gold" />
                      <div>
                        <p className="font-semibold text-white text-sm">Connect Wallet</p>
                        <p className="text-xs text-white/50">Required for crypto payment</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gold hover:bg-gold/90 text-black"
                      onClick={connect}
                      data-testid="button-connect-wallet-checkout"
                    >
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod !== "credit-card" && isConnected && (
              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-semibold text-white text-sm">Wallet Connected</p>
                      <p className="text-xs text-white/50 font-mono">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentMethod === "credit-card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Card Number</Label>
                  <Input
                    placeholder="4242 4242 4242 4242"
                    className="bg-black/40 border-gold/30 text-white"
                    data-testid="input-card-number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Expiry</Label>
                    <Input
                      placeholder="MM/YY"
                      className="bg-black/40 border-gold/30 text-white"
                      data-testid="input-card-expiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">CVC</Label>
                    <Input
                      placeholder="123"
                      className="bg-black/40 border-gold/30 text-white"
                      data-testid="input-card-cvc"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gold/20 pt-4">
              <div className="flex justify-between text-xl font-bold text-white mb-4">
                <span>Total</span>
                <span className="text-gold">${total.toLocaleString()}</span>
              </div>

              <Button
                className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-6"
                onClick={handleCheckout}
                disabled={isProcessing || (paymentMethod !== "credit-card" && !isConnected)}
                data-testid="button-complete-payment"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {paymentMethod === "credit-card" ? (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay ${total.toLocaleString()}
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5 mr-2" />
                        Pay with {paymentMethod.toUpperCase()}
                      </>
                    )}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/50">
                <Shield className="w-4 h-4" />
                Secure payment powered by Blyss DAO
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { ShoppingCartButton as ShoppingCart };
