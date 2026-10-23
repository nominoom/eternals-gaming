import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartTotal,
    clearCart,
    setCheckoutModalOpen
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080A0E] border-l border-[#00FFDF]/20 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#00FFDF]/15 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF]">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Your Cart</h3>
                <p className="text-xs text-white/50">{cart.length} item{cart.length !== 1 ? 's' : ''} selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="text-base font-heading font-semibold text-white mb-1">Your cart is empty</h4>
                <p className="text-sm text-white/50 font-paragraph mb-6 max-w-xs">
                  Gear up with official Eternals apparel, performance sleeves, and pro peripherals.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-outline-primary text-sm py-2 px-5"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FFDF]/30 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/60 shrink-0 border border-white/10">
                    <img 
                      src={item.product.itemImage} 
                      alt={item.product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-heading font-bold text-white truncate mb-1">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-[#00FFDF] font-medium mb-2">
                      Size/Option: {item.selectedSize}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-white/20 rounded-lg px-2 py-1 bg-black/40">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-heading font-bold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-white/30 hover:text-red-400 p-1 self-start transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/80 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60 font-paragraph">Subtotal</span>
                <span className="text-xl font-heading font-extrabold text-[#00FFDF]">
                  ${cartTotal.toFixed(2)} USD
                </span>
              </div>
              <p className="text-xs text-white/40 font-paragraph">
                Taxes and shipping calculated at checkout. Worldwide tracked delivery.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="btn-primary flex-1 py-3"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={clearCart}
                  className="p-3 rounded-lg border border-white/15 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  title="Clear all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
