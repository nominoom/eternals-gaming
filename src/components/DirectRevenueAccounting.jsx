import React, { useState } from 'react';
import { INITIAL_DIRECT_REVENUE_METRICS } from '../services/hostingerDb';
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Percent, 
  Download, 
  Layers, 
  ShieldCheck, 
  Plus, 
  Sparkles,
  ArrowUpRight,
  Clock,
  Package,
  X
} from 'lucide-react';

export default function DirectRevenueAccounting() {
  const [metrics, setMetrics] = useState(() => {
    try {
      const saved = localStorage.getItem('eternals_direct_revenue_metrics');
      return saved ? JSON.parse(saved) : INITIAL_DIRECT_REVENUE_METRICS;
    } catch {
      return INITIAL_DIRECT_REVENUE_METRICS;
    }
  });

  // Interactive garment unit cost calculator
  const [calcState, setCalcState] = useState({
    itemTitle: "Custom Pro Hoodie Run",
    blankGarmentCost: 14.50,
    decorationPrintCost: 5.00,
    packagingCost: 1.00,
    retailSellingPrice: 75.00,
    batchQuantity: 50
  });

  const totalUnitProductionCost = Number(calcState.blankGarmentCost) + Number(calcState.decorationPrintCost) + Number(calcState.packagingCost);
  const netDirectProfitPerUnit = Number(calcState.retailSellingPrice) - totalUnitProductionCost;
  const directProfitMarginPct = ((netDirectProfitPerUnit / Number(calcState.retailSellingPrice)) * 100).toFixed(1);
  const batchGrossRevenue = Number(calcState.retailSellingPrice) * Number(calcState.batchQuantity);
  const batchProductionCost = totalUnitProductionCost * Number(calcState.batchQuantity);
  const batchNetDirectProfit = netDirectProfitPerUnit * Number(calcState.batchQuantity);

  // POD Printify split comparison (where POD platforms take ~70-75% of retail price)
  const podPlatformSplitCut = batchGrossRevenue * 0.72;
  const podRetainedProfit = batchGrossRevenue - podPlatformSplitCut;
  const directExtraProfitRetained = batchNetDirectProfit - podRetainedProfit;

  // Add order to table
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    itemTitle: "Pro Team Pullover 2026",
    category: "Apparel",
    quantity: 25,
    retailPriceUnit: 65.00,
    productionCostUnit: 16.50
  });

  const handleAddBatch = (e) => {
    e.preventDefault();
    const qty = parseInt(newOrderForm.quantity) || 1;
    const retail = parseFloat(newOrderForm.retailPriceUnit) || 0;
    const cost = parseFloat(newOrderForm.productionCostUnit) || 0;
    const gross = qty * retail;
    const totalCost = qty * cost;
    const net = gross - totalCost;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `ETRN-${Math.floor(1000 + Math.random() * 9000)}`,
      itemTitle: newOrderForm.itemTitle,
      category: newOrderForm.category,
      quantity: qty,
      retailPriceUnit: retail,
      productionCostUnit: cost,
      grossRevenue: gross,
      totalProductionCost: totalCost,
      netDirectProfit: net,
      printifyEquivalentProfit: gross * 0.25,
      status: "Producing",
      date: new Date().toISOString().slice(0, 10)
    };

    const updatedOrders = [newOrder, ...metrics.orders];
    const updatedMetrics = {
      ...metrics,
      totalGrossRevenue: metrics.totalGrossRevenue + gross,
      totalProductionCost: metrics.totalProductionCost + totalCost,
      totalNetDirectRevenue: metrics.totalNetDirectRevenue + net,
      directAdvantageRetained: metrics.directAdvantageRetained + (net - (gross * 0.25)),
      orders: updatedOrders
    };

    setMetrics(updatedMetrics);
    try {
      localStorage.setItem('eternals_direct_revenue_metrics', JSON.stringify(updatedMetrics));
    } catch (err) {
      console.error(err);
    }
    setShowAddModal(false);
  };

  const handleExportCSV = () => {
    const headers = "Order Number,Item Title,Quantity,Retail Price Unit,Production Cost Unit,Gross Revenue,Production Cost,Net Direct Profit,Status,Date\n";
    const rows = metrics.orders.map(o => 
      `"${o.orderNumber}","${o.itemTitle}",${o.quantity},${o.retailPriceUnit},${o.productionCostUnit},${o.grossRevenue},${o.totalProductionCost},${o.netDirectProfit},"${o.status}","${o.date}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `eternals_direct_revenue_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Overview Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-eyebrow text-xs">// FINANCIAL ACCOUNTING ENGINE</span>
          <h2 className="text-2xl font-heading font-black text-white mt-1 flex items-center gap-2">
            <DollarSign size={22} className="text-green-400" />
            <span>Direct Revenue & In-House Apparel Economics</span>
          </h2>
          <p className="text-xs text-white/60 font-paragraph mt-1">
            Tracking direct apparel sales with zero third-party platform revenue splits (e.g. Printify/Printful). 100% of proceeds retained after production costs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary py-2 px-4 text-xs font-heading font-bold"
          >
            <Plus size={14} />
            <span>Add Apparel Run</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="btn-outline-white py-2 px-4 text-xs font-heading font-bold"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 border-[#00FFDF]/30">
          <span className="text-[11px] font-mono text-white/50 block">GROSS MERCH REVENUE</span>
          <div className="text-3xl font-heading font-black text-white mt-1">
            ${metrics.totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-[#00FFDF] mt-1">
            Total merchandise retail volume
          </div>
        </div>

        <div className="glass-card p-6 border-white/10">
          <span className="text-[11px] font-mono text-white/50 block">CLOTHING PRODUCTION COST</span>
          <div className="text-3xl font-heading font-black text-red-400 mt-1">
            ${metrics.totalProductionCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-white/40 mt-1">
            Garment blanks & print production
          </div>
        </div>

        <div className="glass-card p-6 border-green-500/40 bg-green-500/5">
          <span className="text-[11px] font-mono text-green-300 block">NET DIRECT REVENUE RETAINED</span>
          <div className="text-3xl font-heading font-black text-green-400 mt-1">
            ${metrics.totalNetDirectRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-green-400 mt-1 font-bold">
            73.0% net margin kept in organization
          </div>
        </div>

        <div className="glass-card p-6 border-[#7F27FF]/40 bg-[#7F27FF]/5">
          <span className="text-[11px] font-mono text-[#c499ff] block">DIRECT REVENUE ADVANTAGE</span>
          <div className="text-3xl font-heading font-black text-[#c499ff] mt-1">
            +${metrics.directAdvantageRetained.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] font-mono text-white/50 mt-1">
            Saved vs 3rd-party POD revenue splits
          </div>
        </div>
      </div>

      {/* Model Comparison Breakdown: Direct In-House vs Printify / 3rd Party POD */}
      <div className="glass-card p-8 border-[#00FFDF]/25 relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#00FFDF]" />
              <span>Direct In-House Production vs Printify POD Split Analysis</span>
            </h3>
            <p className="text-xs text-white/60 font-paragraph mt-1">
              Why our direct production architecture maximizes organization profits without external revenue splits.
            </p>
          </div>
          <span className="badge-primary text-[10px]">Zero Third-Party Cut</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Direct Model (Current) */}
          <div className="p-6 rounded-2xl bg-[#00FFDF]/5 border border-[#00FFDF]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-heading font-bold text-[#00FFDF]">
                ETERNALS DIRECT MODEL (IN-HOUSE)
              </span>
              <span className="badge-primary text-[10px]">Active System</span>
            </div>

            <p className="text-xs text-white/70 font-paragraph">
              You manufacture garments directly with trusted blank vendors and screenprinters. You pay only the true cost of production and keep 100% of remaining revenue.
            </p>

            <div className="space-y-2 text-xs font-mono bg-black/60 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between">
                <span className="text-white/60">Retail Sale Price:</span>
                <span className="text-white font-bold">$75.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Garment Production Cost:</span>
                <span className="text-red-400">-$20.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Third-Party Split:</span>
                <span className="text-green-400">$0.00 (Zero)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                <span className="text-[#00FFDF] font-bold">Net Direct Profit Kept:</span>
                <strong className="text-green-400">$54.50 (72.7%)</strong>
              </div>
            </div>
          </div>

          {/* Traditional Printify POD Model */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 opacity-75">
            <div className="flex items-center justify-between">
              <span className="text-sm font-heading font-bold text-white/70">
                TRADITIONAL PRINTIFY / POD MODEL
              </span>
              <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded">Legacy Split</span>
            </div>

            <p className="text-xs text-white/60 font-paragraph">
              Print-on-demand platforms charge heavy base manufacturing, platform fees, and fulfillment margins, leaving only 20-28% net profit for the organization.
            </p>

            <div className="space-y-2 text-xs font-mono bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between">
                <span className="text-white/60">Retail Sale Price:</span>
                <span className="text-white">$75.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Printify Base + Platform Fee:</span>
                <span className="text-red-400">-$56.25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Third-Party Revenue Cut:</span>
                <span className="text-amber-400">75% taken by POD</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm">
                <span className="text-white/70 font-bold">Net Profit Left:</span>
                <strong className="text-amber-400">$18.75 (25.0%)</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Garment Cost & Margin Calculator */}
      <div className="glass-card p-8 border-white/10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Layers size={20} className="text-[#7F27FF]" />
              <span>Garment Unit Cost & Direct Margin Calculator</span>
            </h3>
            <p className="text-xs text-white/60 font-paragraph mt-0.5">
              Simulate new clothing runs by adjusting blank prices, print methods, and retail targets.
            </p>
          </div>
          <span className="badge-secondary text-[10px]">Real-Time Simulator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-white/60 mb-1">GARMENT TITLE</label>
            <input 
              type="text"
              value={calcState.itemTitle}
              onChange={(e) => setCalcState(prev => ({ ...prev, itemTitle: e.target.value }))}
              className="input-field text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-white/60 mb-1">BLANK COST ($)</label>
            <input 
              type="number"
              step="0.50"
              value={calcState.blankGarmentCost}
              onChange={(e) => setCalcState(prev => ({ ...prev, blankGarmentCost: e.target.value }))}
              className="input-field text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-white/60 mb-1">PRINT / EMBROIDERY ($)</label>
            <input 
              type="number"
              step="0.50"
              value={calcState.decorationPrintCost}
              onChange={(e) => setCalcState(prev => ({ ...prev, decorationPrintCost: e.target.value }))}
              className="input-field text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-white/60 mb-1">RETAIL PRICE ($)</label>
            <input 
              type="number"
              step="1.00"
              value={calcState.retailSellingPrice}
              onChange={(e) => setCalcState(prev => ({ ...prev, retailSellingPrice: e.target.value }))}
              className="input-field text-xs font-bold text-[#00FFDF]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-white/60 mb-1">BATCH RUN UNITS</label>
            <input 
              type="number"
              value={calcState.batchQuantity}
              onChange={(e) => setCalcState(prev => ({ ...prev, batchQuantity: e.target.value }))}
              className="input-field text-xs"
            />
          </div>
        </div>

        {/* Live Simulation Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
          <div>
            <span className="text-white/40 block">UNIT PRODUCTION COST</span>
            <strong className="text-white text-lg">${totalUnitProductionCost.toFixed(2)}</strong>
          </div>
          <div>
            <span className="text-white/40 block">DIRECT PROFIT PER UNIT</span>
            <strong className="text-green-400 text-lg">${netDirectProfitPerUnit.toFixed(2)}</strong>
            <span className="text-[10px] text-green-400 ml-1">({directProfitMarginPct}%)</span>
          </div>
          <div>
            <span className="text-white/40 block">BATCH TOTAL DIRECT PROFIT</span>
            <strong className="text-green-400 text-lg">${batchNetDirectProfit.toFixed(2)}</strong>
          </div>
          <div>
            <span className="text-white/40 block">SAVED OVER 3RD-PARTY POD</span>
            <strong className="text-[#c499ff] text-lg">+${directExtraProfitRetained.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Production & Direct Sales Orders Table */}
      <div className="glass-card p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Package size={18} className="text-[#00FFDF]" />
            <span>Apparel Production Batches & Direct Orders</span>
          </h3>
          <span className="text-xs font-mono text-white/50">{metrics.orders.length} Logged Runs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Garment Item</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Retail Unit</th>
                <th className="py-3 px-4 text-right">Unit Cost</th>
                <th className="py-3 px-4 text-right">Gross Rev</th>
                <th className="py-3 px-4 text-right">Net Direct Profit</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {metrics.orders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{order.orderNumber}</td>
                  <td className="py-3 px-4 text-white">
                    <div>{order.itemTitle}</div>
                    <span className="text-[10px] text-white/40">{order.category} • {order.date}</span>
                  </td>
                  <td className="py-3 px-4 text-center">{order.quantity}</td>
                  <td className="py-3 px-4 text-right">${order.retailPriceUnit.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-red-400">-${order.productionCostUnit.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-white font-bold">${order.grossRevenue.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-green-400 font-bold">${order.netDirectProfit.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      order.status === 'Dispatched' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : (order.status === 'Producing' ? 'bg-[#00FFDF]/20 text-[#00FFDF] border border-[#00FFDF]/30' : 'bg-white/10 text-white/70')
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Apparel Run */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 border-[#00FFDF]/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="font-heading font-bold text-white text-base">Record In-House Apparel Batch</h4>
              <button onClick={() => setShowAddModal(false)} className="text-white/50 hover:text-white" aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddBatch} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">GARMENT TITLE</label>
                <input 
                  type="text"
                  required
                  value={newOrderForm.itemTitle}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, itemTitle: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1">QUANTITY</label>
                  <input 
                    type="number"
                    required
                    value={newOrderForm.quantity}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, quantity: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1">CATEGORY</label>
                  <select 
                    value={newOrderForm.category}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field bg-[#0A0D14]"
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1">RETAIL PRICE ($)</label>
                  <input 
                    type="number"
                    step="0.50"
                    required
                    value={newOrderForm.retailPriceUnit}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, retailPriceUnit: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1">PRODUCTION COST ($)</label>
                  <input 
                    type="number"
                    step="0.50"
                    required
                    value={newOrderForm.productionCostUnit}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, productionCostUnit: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-xs font-heading font-bold mt-2">
                Commit Direct Apparel Run
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
