
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/9d9a2937f9c6c78521a6ffb21852b87b95a339ed?placeholderIfAbsent=true"
              alt="ByteMinds Systems Logo"
              className="aspect-[1] object-contain w-[32px]"
            />
            <span className="font-bold text-xl hidden md:inline-block">ByteMinds Systems</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="inline-flex items-center justify-center rounded-md md:hidden ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          <NavigationMenu className="mx-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none",
                  isActive('/') ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/features" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none",
                  isActive('/features') ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                  Features
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  isActive('/faq') ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Documentation
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Learn how to use ByteMinds Systems for your business.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">FAQs</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Frequently asked questions about our platform.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">Support</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get help with your ByteMinds Systems account.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn more about ByteMinds Systems.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none",
                  isActive('/contact') ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex">
              Log in
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] bg-background p-6 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-base ${isActive('/') ? 'font-medium' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className={`text-base ${isActive('/features') ? 'font-medium' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <div className="text-base">Resources</div>
              <div className="ml-4 flex flex-col space-y-2 text-sm">
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
                <Link to="/support" onClick={() => setMobileMenuOpen(false)}>Support</Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              </div>
              <Link 
                to="/contact" 
                className={`text-base ${isActive('/contact') ? 'font-medium' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-4 pt-4">
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
                <Button className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
