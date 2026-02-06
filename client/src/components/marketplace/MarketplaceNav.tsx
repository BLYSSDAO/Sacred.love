import { Link, useLocation } from "wouter";
import { Store, Package, Star, Grid3X3, Search, Plus, ChevronDown, Heart, Zap, Leaf, Home, Users, BookOpen, Landmark, Wallet, MessageSquare, GraduationCap, Wrench } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCartButton } from "./ShoppingCart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Products", icon: Grid3X3 },
  { id: "wellness", label: "Wellness", icon: Heart },
  { id: "healing-tech", label: "Healing Tech", icon: Zap },
  { id: "sacred-medicine", label: "Sacred Medicine", icon: Leaf },
  { id: "supplements", label: "Supplements", icon: Package },
  { id: "courses", label: "Courses", icon: Star },
];

const BLYSS_DAO_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: Landmark },
  { name: "Membership", href: "/membership", icon: Users },
  { name: "LightRok Capitol", href: "/lightrok", icon: Wallet },
  { name: "Academy", href: "/academy", icon: GraduationCap },
  { name: "Forum", href: "/forum", icon: MessageSquare },
  { name: "Library", href: "/library", icon: BookOpen },
  { name: "Creator Toolkit", href: "/creator-toolkit", icon: Wrench },
];

interface MarketplaceNavProps {
  currentPage?: "products" | "shops" | "featured" | "product" | "shop" | "official";
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  canUpload?: boolean;
  onTabChange?: (tab: string) => void;
}

export function MarketplaceNav({ 
  currentPage = "products",
  searchQuery = "",
  onSearchChange,
  activeCategory = "all",
  onCategoryChange,
  canUpload = false,
  onTabChange
}: MarketplaceNavProps) {
  const { itemCount } = useCart();
  const [, setLocation] = useLocation();

  const navLinks = [
    { name: "Products", key: "products", icon: Package },
    { name: "Shops", key: "shops", icon: Store },
    { name: "Featured", key: "featured", icon: Star },
  ];

  const currentCategory = PRODUCT_CATEGORIES.find(c => c.id === activeCategory) || PRODUCT_CATEGORIES[0];
  const CategoryIcon = currentCategory.icon;

  const handleNavClick = (key: string) => {
    if (onTabChange) {
      onTabChange(key);
    }
    // Also update URL hash for bookmarking
    window.location.hash = key;
    // Scroll to content
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 bg-black/95 border-b border-gold/20 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="flex items-center gap-1.5 text-gold font-bold text-sm mr-2 hover:text-gold/80 transition-colors cursor-pointer"
                  data-testid="dropdown-blyss-dao"
                >
                  BLYSS DAO
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-gold/20 backdrop-blur-md min-w-[180px]">
                {BLYSS_DAO_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <DropdownMenuItem 
                      key={link.href}
                      onClick={() => setLocation(link.href)}
                      className="cursor-pointer text-white/80 hover:text-gold"
                      data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator className="bg-gold/20" />
                <DropdownMenuItem 
                  onClick={() => setLocation("/marketplace")}
                  className="cursor-pointer text-gold font-medium"
                  data-testid="link-marketplace"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Marketplace
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="h-4 w-[1px] bg-gold/30 mr-2 hidden md:block" />
            
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = currentPage === link.key;
                return (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.key)}
                    className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-sm text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
                      active
                        ? "bg-gold/20 text-gold border border-gold/30"
                        : "text-white/70 hover:text-gold hover:bg-gold/10"
                    }`}
                    data-testid={`nav-${link.key}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{link.name}</span>
                  </button>
                );
              })}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-sm text-xs font-medium tracking-wide uppercase transition-all duration-200 text-white/70 hover:text-gold hover:bg-gold/10"
                    data-testid="nav-categories"
                  >
                    <CategoryIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{currentCategory.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/95 border-gold/20 backdrop-blur-md">
                  {PRODUCT_CATEGORIES.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <DropdownMenuItem 
                        key={cat.id}
                        onClick={() => onCategoryChange?.(cat.id)}
                        className={`cursor-pointer ${activeCategory === cat.id ? "text-gold bg-gold/10" : "text-white/80 hover:text-gold"}`}
                        data-testid={`category-${cat.id}`}
                      >
                        <CatIcon className="w-4 h-4 mr-2" />
                        {cat.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-8 h-8 bg-black/40 border-gold/20 focus:border-gold/50 w-32 md:w-48 text-xs"
                data-testid="input-search"
              />
            </div>
            
            {canUpload && (
              <Link href="/marketplace/upload">
                <Button size="sm" className="bg-gold hover:bg-gold/90 text-black h-8 text-xs" data-testid="button-add-product">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span className="hidden md:inline">Add Product</span>
                </Button>
              </Link>
            )}
            
            <ShoppingCartButton />
            
            {itemCount > 0 && (
              <span className="text-xs text-white/60 hidden md:inline">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
