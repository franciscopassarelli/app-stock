
import React from 'react';
import { Navbar } from './Navbar';
import { LowStockNotification } from './LowStockNotification';
import { useProducts } from '../context/ProductContext';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lowStockProducts } = useProducts();
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
          {lowStockProducts.length > 0 && <LowStockNotification />}
          {children}
        </main>
        
        <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
          <p>© {new Date().getFullYear()} Gestion Stock</p>
        </footer>
        
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
};
