import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Sparkles, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export default function MerchPage() {
  const { merchProducts, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const categories = [
    { key: 'all', name: 'All Items' },
    { key: 'tees', name: 'T-Shirts' },
    { key: 'hoodies', name: 'Hoodies & Sweatshirts' },
    { key: 'pro-gear', name: 'Pro Gear' },
    { key: 'accessories', name: 'Accessories' },
    { key: 'collectibles', name: 'Collectibles' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? merchProducts
    : merchProducts.filter(p => p.category === selectedCategory);

  const getProductImages = (product) => {
    const list = [product.itemImage];
    if (product.designShowcaseImage1) list.push(product.designShowcaseImage1);
    if (product.designShowcaseImage2) list.push(product.designShowcaseImage2);
    return list;
  };

  const handleNextImage = (productId, total) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % total
    }));
  };

  const handlePrevImage = (productId, total) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + total) % total
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#00FFDF] mb-3">
            <ShoppingBag size={14} />
            <span>Apparel & Peripherals</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-4">
            Official Merch Store
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-2xl mx-auto">
            Show your support for EternalsGGs with our exclusive collection of apparel, accessories, and gaming gear. Represent the team in style.
          </p>
        </div>
      </section>

      {/* PRO COLLECTION HERO SHOWCASE (from original live site) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto">
        <div className="glass-card p-8 md:p-12 border-[#00FFDF]/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge-primary mb-4">Championship Performance</span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mb-4 leading-tight">
                Check Out Our Pro Collection
              </h2>
              <p className="text-base sm:text-lg text-white/75 font-paragraph leading-relaxed mb-8">
                Experience the same professional-grade gaming gear trusted by esports champions. Discover premium peripherals, equipment, and accessories curated for competitive gamers who demand excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedCategory('pro-gear')}
                  className="btn-primary py-3.5 px-8 text-sm"
                >
                  <Sparkles size={16} />
                  <span>View Entire Collection</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#00FFDF]/40 shadow-2xl relative">
              <img 
                src="https://static.wixstatic.com/media/66d70e_2083b5c35e8045d3b9d75c39fc70747a~mv2.png?originWidth=1152&originHeight=576" 
                alt="Professional gaming gear collection"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS CATALOG SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto">
        
        {/* Category Navigation Pills */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            Other Apparel & Gear
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const count = cat.key === 'all' 
                ? merchProducts.length 
                : merchProducts.filter(p => p.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-[#00FFDF] text-black shadow-[0_0_15px_rgba(0,255,223,0.3)]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const images = getProductImages(product);
            const currentImgIdx = activeImageIndex[product._id] || 0;
            const currentImg = images[currentImgIdx] || product.itemImage;
            const selectedSize = selectedSizes[product._id] || (product.sizes ? product.sizes[0] : null);

            return (
              <div 
                key={product._id}
                className="glass-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Carousel */}
                  <div className="relative aspect-square w-full bg-black/80 overflow-hidden border-b border-white/10">
                    <img 
                      src={currentImg} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />

                    {product.isExclusive && (
                      <div className="absolute top-3 left-3">
                        <span className="badge-primary">Exclusive Drop</span>
                      </div>
                    )}

                    {/* Carousel Controls */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage(product._id, images.length);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage(product._id, images.length);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {images.map((_, dotIdx) => (
                            <span 
                              key={dotIdx}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                dotIdx === currentImgIdx ? 'bg-[#00FFDF] w-3' : 'bg-white/40'
                              }`}
                            ></span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-heading font-bold text-white group-hover:text-[#00FFDF] transition-colors leading-snug">
                        {product.title}
                      </h3>
                    </div>

                    <div className="text-xl font-heading font-black text-[#00FFDF] mb-3">
                      ${product.price.toFixed(2)} USD
                    </div>

                    <p className="text-xs font-paragraph text-white/60 line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Sizes / Options selector */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[11px] font-heading font-bold text-white/50 uppercase block mb-1.5">
                          Select Variant
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [product._id]: s }))}
                              className={`px-2.5 py-1 rounded text-xs font-heading font-medium transition-colors ${
                                selectedSize === s
                                  ? 'bg-[#00FFDF] text-black font-bold'
                                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => addToCart(product, selectedSize)}
                    className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Perks bar */}
      <section className="py-12 border-t border-white/10 bg-black/60 max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Truck size={24} className="text-[#00FFDF]" />
            <div className="text-left">
              <h4 className="text-sm font-heading font-bold text-white">Global Tracked Delivery</h4>
              <p className="text-xs text-white/50">Dispatched within 24-48 business hours</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck size={24} className="text-[#7F27FF]" />
            <div className="text-left">
              <h4 className="text-sm font-heading font-bold text-white">100% Authentic Quality</h4>
              <p className="text-xs text-white/50">Official tournament grade materials</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Sparkles size={24} className="text-[#00FFDF]" />
            <div className="text-left">
              <h4 className="text-sm font-heading font-bold text-white">Exclusive Member Drops</h4>
              <p className="text-xs text-white/50">Limited batch runs for verified community</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
