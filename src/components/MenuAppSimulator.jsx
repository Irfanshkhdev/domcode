import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, ShoppingBag, Plus, Check, Utensils, Menu, Sparkles, X, Trash2, Coffee, CheckCircle2 } from 'lucide-react';

export default function MenuAppSimulator() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Interactive Modals
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCafeInfoModal, setShowCafeInfoModal] = useState(false);

  const menuItems = [
    { 
      id: 1, 
      name: "Signature Espresso", 
      category: "drinks", 
      price: "₹150", 
      tag: "Popular",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=120&q=80"
    },
    { 
      id: 2, 
      name: "Truffle Wagyu Burger", 
      category: "mains", 
      price: "₹450", 
      tag: "Chef Special",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&q=80"
    },
    { 
      id: 3, 
      name: "Margherita Pizza", 
      category: "mains", 
      price: "₹350", 
      tag: "Woodfired",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=120&q=80"
    },
    { 
      id: 4, 
      name: "Organic Matcha Latte", 
      category: "drinks", 
      price: "₹220", 
      tag: "Organic",
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=120&q=80"
    },
    { 
      id: 5, 
      name: "Dark Choco Fondant", 
      category: "desserts", 
      price: "₹280", 
      tag: "Decadent",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=120&q=80"
    },
  ];

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(i => i.category === activeCategory);

  const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('₹', '')), 0).toFixed(0);

  const handleSimulateOrder = () => {
    if (cart.length === 0) return;
    setShowCartModal(false);
    setShowOrderSuccess(true);
    setTimeout(() => {
      setShowOrderSuccess(false);
      setCart([]);
    }, 3500);
  };

  return (
    <div className="relative mx-auto w-[300px] h-[600px] bg-zinc-950 border-[9px] border-zinc-700/80 rounded-[2.5rem] shadow-[0_0_35px_rgba(255,255,255,0.15)] ring-1 ring-white/20 overflow-hidden flex flex-col justify-between text-white font-sans transition-all duration-300">
      
      {/* iPhone Dynamic Island Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800/90 w-32 mx-auto rounded-b-xl z-30 border-b border-white/10 flex items-center justify-center">
        <div className="w-10 h-1.5 rounded-full bg-zinc-900" />
      </div>

      {/* Mobile Glass Header */}
      <div className="pt-7 px-4 pb-3 bg-zinc-900/95 backdrop-blur-md border-b border-white/10 z-20 flex items-center justify-between">
        <button 
          onClick={() => setShowCafeInfoModal(true)}
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-90"
          title="Open Cafe Info"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold font-mono tracking-wide text-white">Artisan Cafe</span>
          <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Table #07 Active
          </span>
        </div>

        {/* Working Cart Button */}
        <button 
          onClick={() => setShowCartModal(true)}
          className="relative p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer active:scale-90 border border-white/15"
          title="View Cart"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-sm">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Category Navigation Pills */}
      <div className="px-3 pt-3 pb-1 border-b border-white/5 bg-zinc-900/50 flex space-x-1.5 overflow-x-auto scrollbar-none z-10">
        {["all", "mains", "drinks", "desserts"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-white text-black font-bold shadow-sm"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Screen Menu Items List with Food Images */}
      <div className="flex-1 px-3 py-2.5 overflow-y-auto space-y-2 scrollbar-none z-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all space-x-2.5"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium text-white truncate">{item.name}</span>
                <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-white/10 text-zinc-300 flex-shrink-0">
                  {item.tag}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">{item.price}</span>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black transition-colors flex-shrink-0 cursor-pointer active:scale-90"
              title="Add to order"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Order Bar (Clicking opens Cart Modal) */}
      <div className="p-3 bg-zinc-900 border-t border-white/10 z-20 space-y-2">
        <div 
          onClick={() => setShowCartModal(true)}
          className="flex items-center justify-between text-[11px] font-mono cursor-pointer hover:text-emerald-400 transition-colors"
        >
          <span className="text-zinc-400 flex items-center space-x-1">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Cart Items:</span>
          </span>
          <span className="text-white font-bold">{cart.length} items (₹{totalAmount})</span>
        </div>

        <button
          onClick={handleSimulateOrder}
          disabled={cart.length === 0}
          className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all active:scale-95 ${
            cart.length > 0
              ? "bg-white text-black hover:bg-zinc-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              : "bg-white/10 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {showOrderSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sent to Kitchen Sync!</span>
            </>
          ) : (
            <>
              <QrCode className="w-3.5 h-3.5" />
              <span>Simulate Order</span>
            </>
          )}
        </button>
      </div>

      {/* SHOPPING CART MODAL */}
      <AnimatePresence>
        {showCartModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md z-40 p-4 pt-9 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono text-white">Table #07 Cart</span>
                </div>
                <button 
                  onClick={() => setShowCartModal(false)}
                  className="p-1 rounded-full bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto" />
                  <div className="text-xs font-mono text-zinc-400">Cart is empty</div>
                  <div className="text-[10px] text-zinc-500">Tap + on any menu item to add</div>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-none pr-1">
                  {cart.map((cItem, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <img src={cItem.image} alt={cItem.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="text-white font-medium text-[11px]">{cItem.name}</div>
                          <div className="text-[10px] font-mono text-emerald-400">{cItem.price}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(idx)}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Total Bill:</span>
                <span className="text-white font-bold text-sm">₹{totalAmount}</span>
              </div>
              <button
                onClick={handleSimulateOrder}
                disabled={cart.length === 0}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold ${
                  cart.length > 0 ? "bg-white text-black hover:bg-zinc-200 cursor-pointer" : "bg-white/10 text-zinc-500 cursor-not-allowed"
                }`}
              >
                Send Order to Kitchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CAFE INFO MODAL */}
      <AnimatePresence>
        {showCafeInfoModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-md z-40 p-4 pt-9 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono text-white">Artisan Cafe Details</span>
                </div>
                <button 
                  onClick={() => setShowCafeInfoModal(false)}
                  className="p-1 rounded-full bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-white font-semibold">📲 Zero App Installation</div>
                  <div className="text-[10px] font-mono text-zinc-400">Scan Table QR → Order Instantly</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-white font-semibold">🍳 Kitchen Display Sync</div>
                  <div className="text-[10px] font-mono text-emerald-400">Sub-100ms instant ticket dispatch</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCafeInfoModal(false)}
              className="w-full py-2 rounded-xl bg-white text-black text-xs font-mono font-bold"
            >
              Back to Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
