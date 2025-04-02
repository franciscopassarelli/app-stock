import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, AlertCircle, BarChart3, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

const Index = () => {
  const { products, lowStockProducts } = useProducts();
  
  // Calculate total inventory value
  const totalValue = products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  // Calculate counts by category for the pie chart
  const categoryCounts = products.reduce((acc: Record<string, number>, product) => {
    const { category } = product;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  // Get the top 5 products with lowest stock relative to threshold
  const criticalStock = [...products]
    .sort((a, b) => {
      const aRatio = a.quantity / a.lowStockThreshold;
      const bRatio = b.quantity / b.lowStockThreshold;
      return aRatio - bRatio;
    })
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Panel</h1>
            <p className="text-muted-foreground mt-1">Descripción general del inventario de su quiosco</p>
          </div>
          <Link
            to="/add-product"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 button-hover"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar producto
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Productos totales</p>
                <h3 className="text-2xl font-bold mt-1">{products.length}</h3>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor de inventario</p>
                <h3 className="text-2xl font-bold mt-1">${totalValue.toFixed(2)}</h3>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categorías</p>
                <h3 className="text-2xl font-bold mt-1">{Object.keys(categoryCounts).length}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Artículos con pocas existencias</p>
                <h3 className="text-2xl font-bold mt-1">{lowStockProducts.length}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            {lowStockProducts.length > 0 && (
              <Link to="/products" className="text-xs font-medium text-primary mt-2 block link-hover inline-block">
                Ver artículos
              </Link>
            )}
          </div>
        </div>

        {/* Chart and Critical Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Category Distribution */}
          <div className="glass-card rounded-lg shadow-sm lg:col-span-2 overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="p-5 border-b">
              <h3 className="font-medium">Categorías de productos</h3>
            </div>
            <div className="p-5 h-80">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No hay datos de categoría disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Critical Stock Items */}
          <div className="glass-card rounded-lg shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="p-5 border-b">
              <h3 className="font-medium">Artículos críticos en stock</h3>
              <p className="text-sm text-muted-foreground mt-1">Productos que necesitan atención</p>
            </div>
            <div className="divide-y">
              {criticalStock.length > 0 ? (
                criticalStock.map((product) => (
                  <div key={product.id} className="p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">{product.code}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        product.quantity <= product.lowStockThreshold
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      )}>
                        {product.quantity} left
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            product.quantity <= product.lowStockThreshold / 2
                              ? "bg-red-500"
                              : product.quantity <= product.lowStockThreshold
                              ? "bg-amber-500"
                              : "bg-green-500"
                          )}
                          style={{
                            width: `${Math.min(
                              100,
                              (product.quantity / (product.lowStockThreshold * 2)) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No hay artículos críticos en stock</p>
                </div>
              )}
              
              {criticalStock.length > 0 && (
                <div className="p-4">
                  <Link
                    to="/products"
                    className="text-sm text-primary font-medium link-hover flex items-center justify-center"
                  >
                    Ver todos los productos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
