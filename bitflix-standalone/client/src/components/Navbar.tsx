import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import WalletConnect from "@/components/ui/WalletConnect";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatDropdown from "@/components/chat/ChatDropdown";
import { ShoppingCartButton } from "@/components/marketplace/ShoppingCart";
import logoImage from "@assets/generated_images/clean_blyss_dao_logo_flat_black.png";

type DropdownMenu = {
  name: string;
  items: { name: string; href: string }[];
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Check if user is Council tier or above (council=2, builder=3, custodian=4, founder=5)
  const tierOrder = ['community', 'creator', 'council', 'builder', 'custodian', 'founder'];
  const userTierIndex = user?.membershipNftTier ? tierOrder.indexOf(user.membershipNftTier.toLowerCase()) : 0;
  const isCouncilOrAbove = userTierIndex >= 2;

  const dropdownMenus: DropdownMenu[] = [
    {
      name: "Community Access",
      items: isAuthenticated ? [
        { name: "Soul Family", href: "/members" },
        { name: "BLYSS Temple", href: "/temple" },
        { name: "Brotherhood", href: "/brotherhood" },
        { name: "Flow Dojo", href: "/flow-dojo" },
        { name: "Events", href: "/events" },
        { name: "Academy", href: "/academy" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Marketplace", href: "/marketplace" },
        { name: "Forum", href: "/forum" },
      ] : [
        { name: "About BLYSS Temple", href: "/about/temple" },
        { name: "About Academy", href: "/about/academy" },
        { name: "About Events & Retreats", href: "/about/events" },
        { name: "Member Dashboard", href: "/about/dashboard" },
        { name: "Join Community", href: "/join/community" },
        { name: "Member Login", href: "/login" },
      ]
    },
    {
      name: "DAO Projects",
      items: [
        { name: "LightPods Overview", href: "/lightpods" },
        { name: "TokenTrader.io", href: "/tokentrader" },
        { name: "BITFLIX Ecosystem", href: "/bitflix" },
        { name: "Blyss.AI", href: "/projects/blyss-ai" },
        { name: "BlyssLabs", href: "/projects/blysslabs" },
        { name: "LUXARA", href: "/projects/luxara" },
        { name: "BlyssRise360", href: "/projects/blyssrise360" },
        { name: "LightPay", href: "/projects/lightpay" },
        { name: "Regenerative Assets", href: "/projects/regenerative-assets" },
        { name: "Four Worlds Alliance", href: "/alliances" },
      ]
    },
    {
      name: "BlyssDAO Mothership",
      items: isAuthenticated ? [
        ...(isCouncilOrAbove ? [{ name: "Projects Portal", href: "/projects" }] : []),
        { name: "Blyss.Ai", href: "/blyss-ai" },
        { name: "Creator Studio", href: "/creator-studio" },
        { name: "LightRok Capitol", href: "/lightrok" },
        { name: "Lawful.ai", href: "/lawguru" },
        { name: "DAO Governance", href: "/dao" },
        { name: "Library", href: "/library" },
        { name: "Alliance Hub", href: "/alliance" },
        { name: "Treasury", href: "/treasury" },
      ] : [
        { name: "About Blyss.Ai", href: "/about/blyssai" },
        { name: "Invest in BLYSS", href: "/invest" },
        { name: "Join the DAO", href: "/join/dao" },
      ]
    },
    ...(user?.isAdmin ? [{
      name: "Dev Portal",
      items: [
        { name: "AI Twin Creator", href: "/create-twin" },
        { name: "Blyss.AI Landing", href: "/about/blyssai" },
        { name: "Brotherhood", href: "/brotherhood" },
        { name: "Ubuntu Sharing", href: "/ubuntu-sharing" },
        { name: "Admin Calendar", href: "/admin-calendar" },
        { name: "Advisors", href: "/advisors" },
        { name: "Agent Program", href: "/agent-program" },
        { name: "Asset Spotlight", href: "/asset-spotlight" },
        { name: "BLYSS Academy (Alt)", href: "/blyss-academy" },
        { name: "Booking", href: "/booking" },
        { name: "Bounties", href: "/bounties" },
        { name: "Chat", href: "/chat" },
        { name: "Creator Toolkit", href: "/creator-toolkit" },
        { name: "Delegates", href: "/delegates" },
        { name: "DEX", href: "/dex" },
        { name: "DEX Trade", href: "/dex-trade" },
        { name: "Ecosystem Page", href: "/ecosystem" },
        { name: "Feed", href: "/feed" },
        { name: "Governance (Alt)", href: "/governance" },
        { name: "Incubation Apply", href: "/incubation-apply" },
        { name: "LightRok Treasury", href: "/lightrok-treasury" },
        { name: "LoomEx", href: "/loomex" },
        { name: "Luxara Agency", href: "/projects/luxara" },
        { name: "Member Bio Builder", href: "/member-bio-builder" },
        { name: "Onboarding", href: "/onboarding" },
        { name: "Referrals", href: "/referrals" },
        { name: "Resources", href: "/resources" },
        { name: "Synterex", href: "/synterex" },
        { name: "Token Marketplace", href: "/token-marketplace" },
        { name: "Token Trader", href: "/token-trader" },
        { name: "TokenTrader Lightpaper", href: "/tokentrader-lightpaper" },
        { name: "Trader Profile", href: "/trader-profile" },
        { name: "WhiteHat Zone", href: "/whitehat-zone" },
      ]
    }] : [])
  ];

  const mobileMenuSections = [
    {
      title: "Community Access",
      links: isAuthenticated ? [
        { name: "Soul Family", href: "/members" },
        { name: "BLYSS Temple", href: "/temple" },
        { name: "Brotherhood", href: "/brotherhood" },
        { name: "Flow Dojo", href: "/flow-dojo" },
        { name: "Events", href: "/events" },
        { name: "Academy", href: "/academy" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Marketplace", href: "/marketplace" },
        { name: "Forum", href: "/forum" },
      ] : [
        { name: "About BLYSS Temple", href: "/about/temple" },
        { name: "About Academy", href: "/about/academy" },
        { name: "About Events & Retreats", href: "/about/events" },
        { name: "Member Dashboard", href: "/about/dashboard" },
        { name: "Join Community", href: "/join/community" },
        { name: "Member Login", href: "/login" },
      ]
    },
    {
      title: "BlyssDAO Mothership",
      links: isAuthenticated ? [
        ...(isCouncilOrAbove ? [{ name: "Projects Portal", href: "/projects" }] : []),
        { name: "TokenTrader.io", href: "/tokentrader" },
        { name: "Blyss.Ai", href: "/blyss-ai" },
        { name: "Creator Studio", href: "/creator-studio" },
        { name: "LightRok Capitol", href: "/lightrok" },
        { name: "Lawful.ai", href: "/lawguru" },
        { name: "DAO Governance", href: "/dao" },
        { name: "Library", href: "/library" },
        { name: "Alliance Hub", href: "/alliance" },
        { name: "Treasury", href: "/treasury" },
      ] : [
        { name: "About Blyss.Ai", href: "/about/blyssai" },
        { name: "Invest in BLYSS", href: "/invest" },
        { name: "Join the DAO", href: "/join/dao" },
      ]
    },
    ...(user?.isAdmin ? [{
      title: "Dev Portal",
      links: [
        { name: "Brotherhood", href: "/brotherhood" },
        { name: "Ubuntu Sharing", href: "/ubuntu-sharing" },
        { name: "Admin Calendar", href: "/admin-calendar" },
        { name: "Advisors", href: "/advisors" },
        { name: "Agent Program", href: "/agent-program" },
        { name: "Asset Spotlight", href: "/asset-spotlight" },
        { name: "BLYSS Academy (Alt)", href: "/blyss-academy" },
        { name: "Booking", href: "/booking" },
        { name: "Bounties", href: "/bounties" },
        { name: "Chat", href: "/chat" },
        { name: "Creator Toolkit", href: "/creator-toolkit" },
        { name: "Delegates", href: "/delegates" },
        { name: "DEX", href: "/dex" },
        { name: "DEX Trade", href: "/dex-trade" },
        { name: "Ecosystem Page", href: "/ecosystem" },
        { name: "Feed", href: "/feed" },
        { name: "Governance (Alt)", href: "/governance" },
        { name: "Incubation Apply", href: "/incubation-apply" },
        { name: "LightRok Treasury", href: "/lightrok-treasury" },
        { name: "LoomEx", href: "/loomex" },
        { name: "Luxara Agency", href: "/projects/luxara" },
        { name: "Member Bio Builder", href: "/member-bio-builder" },
        { name: "Onboarding", href: "/onboarding" },
        { name: "Referrals", href: "/referrals" },
        { name: "Resources", href: "/resources" },
        { name: "Synterex", href: "/synterex" },
        { name: "Token Marketplace", href: "/token-marketplace" },
        { name: "Token Trader", href: "/token-trader" },
        { name: "TokenTrader Lightpaper", href: "/tokentrader-lightpaper" },
        { name: "Trader Profile", href: "/trader-profile" },
        { name: "WhiteHat Zone", href: "/whitehat-zone" },
      ]
    }] : [])
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isOpen || location !== '/' ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-sm" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        <Link href="/">
          <div className="cursor-pointer group" data-testid="link-home">
            <img 
              src={logoImage} 
              alt="BLYSS.DAO" 
              className="h-16 md:h-20 lg:h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </Link>

        <div className="hidden xl:flex space-x-6 items-center">
          {dropdownMenus.map((menu) => (
            <div 
              key={menu.name}
              className="relative"
              onMouseEnter={() => setOpenDropdown(menu.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase hover:text-gold transition-colors duration-300 text-white/90 whitespace-nowrap"
                data-testid={`dropdown-${menu.name.toLowerCase()}`}
              >
                {menu.name}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === menu.name ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openDropdown === menu.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 py-2 bg-black/95 border border-gold/20 rounded-sm min-w-[180px] backdrop-blur-md shadow-xl"
                  >
                    {menu.items.map((item) => (
                      item.href.startsWith('/api/') ? (
                        <a 
                          key={item.href} 
                          href={item.href}
                          className="block px-4 py-2 text-[11px] font-bold tracking-wider uppercase text-white/80 hover:text-gold hover:bg-gold/10 transition-colors duration-200"
                          data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          className="block px-4 py-2 text-[11px] font-bold tracking-wider uppercase text-white/80 hover:text-gold hover:bg-gold/10 transition-colors duration-200"
                          data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <ShoppingCartButton />
          <WalletConnect />
          
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <ChatDropdown />
              <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-[11px] font-bold tracking-wider uppercase text-gold" data-testid="link-dashboard">
                Dashboard
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity" data-testid="link-avatar">
                <Avatar className="w-8 h-8 border border-gold">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                  <AvatarFallback className="bg-gold/20 text-gold text-xs">
                    {(user.firstName || user.email || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <a 
                href="/api/logout" 
                className="text-white/60 hover:text-red-400 transition-colors p-2"
                data-testid="button-logout"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <a 
              href="/login" 
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-[11px] font-bold tracking-wider uppercase hover:bg-gold transition-colors duration-300 whitespace-nowrap"
              data-testid="button-login"
            >
              <User className="w-4 h-4" /> Sign In
            </a>
          )}
          
          {!isAuthenticated && (
            <Link href="/membership" className="bg-gold text-black px-5 py-2 text-[11px] font-bold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap" data-testid="button-join-dao">
              Join DAO
            </Link>
          )}
        </div>

        <div className="xl:hidden flex items-center gap-4">
          {/* WalletConnect moved to mobile menu to prevent conflict */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-start items-center xl:hidden overflow-y-auto"
            style={{ top: 0, paddingTop: '80px' }}
          >
            <div className="flex flex-col items-center space-y-5 p-6 w-full">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <img src={logoImage} alt="BLYSS DAO" className="h-16 w-auto object-contain" />
              </Link>
              {mobileMenuSections.map((section) => (
                <div key={section.title} className="w-full">
                  <h3 className="text-gold text-sm font-bold tracking-widest uppercase mb-3 text-center border-b border-gold/20 pb-2">
                    {section.title}
                  </h3>
                  <div className="flex flex-col items-center space-y-3 mb-6">
                    {section.links.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        onClick={() => setIsOpen(false)} 
                        className="text-lg font-medium tracking-wide text-white hover:text-gold transition-colors"
                        data-testid={`mobile-link-${item.href.slice(1)}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-3">
                <WalletConnect />
              </div>

              {/* Auth section for mobile */}
              <div className="w-full border-t border-white/10 pt-6 mt-4 space-y-4">
                {isAuthenticated && user ? (
                  <>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center justify-center gap-2 text-lg font-bold tracking-widest uppercase text-gold hover:text-white transition-colors"
                      data-testid="mobile-link-dashboard"
                    >
                      <User className="w-5 h-5" /> My Dashboard
                    </Link>
                    <Link 
                      href={`/users/${user.username || user.id}`} 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center justify-center gap-2 text-lg font-bold tracking-widest uppercase text-white/80 hover:text-gold transition-colors"
                      data-testid="mobile-link-profile"
                    >
                      View My Profile
                    </Link>
                    <a 
                      href="/api/logout" 
                      className="flex items-center justify-center gap-2 text-lg font-bold tracking-widest uppercase text-white/60 hover:text-red-400 transition-colors"
                      data-testid="mobile-button-logout"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </a>
                  </>
                ) : (
                  <a 
                    href="/login" 
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black text-lg font-bold tracking-widest uppercase hover:bg-gold transition-colors"
                    data-testid="mobile-button-login"
                  >
                    <User className="w-5 h-5" /> Sign In
                  </a>
                )}
              </div>

              {!isAuthenticated && (
                <Link href="/membership" onClick={() => setIsOpen(false)} className="mt-3 bg-gold text-black px-8 py-3 text-sm font-bold tracking-widest uppercase">
                  Join DAO
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
