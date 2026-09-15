import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShoppingBag, Plus, Check, Utensils, Sparkles, Smartphone } from 'lucide-react';

export default function MenuAppSimulator() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const menuItems = [
    { id: 1, name: "Signature Espresso", category: "drinks", price: "$4.50", tag: "Popular" },
    { id: 2, name: "Truffle Wagyu Burger", category: "mains", price: "$18.00", tag: "Chef Special" },
    { id: 3, name: "Artisan Margherita Pizza", category: "mains", price: "$14.50", tag: "Woodfired" },
    { id: 4, name: "Matcha Latte", category: "drinks", price: "$5.50", tag: "Organic" },
    { id: 5, name: "Dark Chocolate Fondant", category: "desserts", price: "$8.50", tag: "Decadent" },
  ];

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(i => i.category === activeCategory);

  const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

  const handleSimulateOrder = () => {
    if (cart.length === 0) return;
    setShowOrderSuccess(true);
    setTimeout(() => {
      setShowOrderSuccess(false);
      setCart([]);
    }, 3000);
  };

  return (
    <div className="w-full glass-card rounded-2xl p-5 md:p-6 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Simulator Frame Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase">Live Menu App Simulator</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Table #07 Active</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {["all", "mains", "drinks", "desserts"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              activeCategory === cat
                ? "bg-white text-black font-semibold shadow-sm"
                : "bg-white/5 text-zinc-400 hover:text-white border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all"
          >
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-white">{item.name}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                  {item.tag}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-0.5">{item.price}</span>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
              title="Add to order"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Cart & Order Bar */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-mono text-zinc-300">{cart.length} items (${totalAmount})</span>
        </div>

        <button
          onClick={handleSimulateOrder}
          disabled={cart.length === 0}
          className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center space-x-2 transition-all ${
            cart.length > 0
              ? "bg-white text-black hover:bg-zinc-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-white/10 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {showOrderSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sent to Kitchen!</span>
            </>
          ) : (
            <>
              <QrCode className="w-3.5 h-3.5" />
              <span>Simulate Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
