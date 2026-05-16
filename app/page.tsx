'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BarChart3, Crosshair, Layers, Magnet, Zap, Activity, ShieldCheck, RefreshCcw, Target } from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line, CartesianGrid, Legend, ComposedChart, Bar } from 'recharts';
import { MasterclassSection } from '@/components/MasterclassSection';

const gammaSimDataPositive = [
  { time: '09:30', price: 4400 },
  { time: '10:00', price: 4420 },
  { time: '10:30', price: 4440 },
  { time: '11:00', price: 4452 }, // Hits level 4450
  { time: '11:30', price: 4445 }, // Reversal
  { time: '12:00', price: 4430 },
  { time: '12:30', price: 4425 },
  { time: '13:00', price: 4435 },
  { time: '13:30', price: 4448 }, // Touches again
  { time: '14:00', price: 4442 }, // Reversal
  { time: '14:30', price: 4430 },
  { time: '15:00', price: 4420 },
];

const gammaSimDataNegative = [
  { time: '09:30', price: 4400 },
  { time: '10:00', price: 4410 },
  { time: '10:30', price: 4435 },
  { time: '11:00', price: 4448 }, // Approaches
  { time: '11:30', price: 4455 }, // Breaks level
  { time: '12:00', price: 4475 }, // Accelerates 
  { time: '12:30', price: 4490 },
  { time: '13:00', price: 4515 },
  { time: '13:30', price: 4530 }, 
  { time: '14:00', price: 4510 }, 
  { time: '14:30', price: 4490 },
  { time: '15:00', price: 4470 },
];

const volumeData = [
  { year: '2015', eqTheme: 50, opTheme: 15 },
  { year: '2017', eqTheme: 55, opTheme: 22 },
  { year: '2019', eqTheme: 58, opTheme: 35 },
  { year: '2021', eqTheme: 65, opTheme: 70 },
  { year: '2023', eqTheme: 67, opTheme: 150 },
  { year: 'Today', eqTheme: 70, opTheme: 300 },
];

const odteSpikes = [
  { time: '09:30', price: 5210, volume: 10 },
  { time: '10:30', price: 5205, volume: 15 },
  { time: '11:30', price: 5215, volume: 12 },
  { time: '12:30', price: 5220, volume: 80 },
  { time: '13:30', price: 5218, volume: 20 },
  { time: '14:30', price: 5225, volume: 30 },
  { time: '15:30', price: 5240, volume: 250 },
  { time: '16:00', price: 5244, volume: 40 },
];

export default function Home() {
  const [activeRegime, setActiveRegime] = useState<'positive'|'negative'>('positive');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'masterclass'>('dashboard');

  return (
    <main className="min-h-screen relative font-sans text-foreground">
      {/* Background elements */}
      <div className="fixed inset-0 bg-dot-pattern opacity-30 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none -z-10" />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/40 pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-sans font-extrabold text-xl tracking-tighter text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-black">Q</div>
            <span>flo<span className="text-primary">Q</span></span>
          </div>
          <div className="text-[10px] sm:text-xs font-mono flex gap-4 sm:gap-8 uppercase tracking-widest relative z-50">
            {['dashboard', 'masterclass'].map((tab, idx) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`min-h-[44px] min-w-[44px] cursor-pointer transition-colors px-2 py-3 ${activeTab === tab ? 'text-primary border-b border-primary' : 'text-muted-foreground opacity-50 hover:opacity-100'}`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/10 text-primary text-[10px] uppercase font-mono tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_#22d3ee] animate-pulse" />
            MARKET STRUCTURE INSIGHTS
          </div>
          <h1 className="font-sans text-5xl sm:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6 text-white">
            The Hidden Math of <br className="hidden sm:block" /> <span className="text-primary glow-cyan">Market Moves</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-light mb-10">
            Stop relying on lagging signals. Discover the 5 impactful takeaways from institutional gamma flow that dictate intraday market structure and volatility.
          </p>
          <div className="flex items-center gap-4">
            <motion.a 
              href="#takeaways"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 min-h-[44px] min-w-[44px] rounded bg-primary text-black flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors font-bold uppercase tracking-widest text-[10px]"
            >
              Explore Insights <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-white/10 relative">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[10px] tracking-widest text-primary uppercase mb-4 sticky top-24 italic opacity-50">
              00 // Introduction
            </h2>
          </div>
          <div className="md:col-span-8 p-6 bg-white/5 border border-white/10 rounded-lg">
            <h3 className="font-sans font-bold text-2xl tracking-tighter uppercase text-white mb-4">The Relatable Problem of &quot;Trading Blind&quot;</h3>
            <div className="prose prose-invert prose-sm max-w-none prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed">
              <p>
                Retail traders frequently fall into the trap of &quot;lagging signal reliance,&quot; meticulously charting Relative Strength Index (RSI) divergences or standard support and resistance lines only to be blindsided by sudden, violent price action. This frustration stems from a fundamental misunderstanding of the market&apos;s structural plumbing.
              </p>
              <p>
                Post-COVID, the financial landscape has shifted; option volumes have exploded to all-time highs, elevating option flow—specifically Gamma—to the primary driver of market structure.
              </p>
              
              <div className="my-8 p-6 bg-black border border-white/10 rounded-lg">
                <h4 className="font-sans font-bold text-white uppercase tracking-tighter mb-4 text-center">Options Flow Now Dictates Underlying Price Action</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volumeData}>
                      <XAxis dataKey="year" stroke="#52525b" fontSize={11} />
                      <YAxis stroke="#52525b" fontSize={11} hide />
                      <Tooltip contentStyle={{ backgroundColor: '#020408', borderColor: 'rgba(34,211,238,0.2)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '10px' }} itemStyle={{ color: '#fafafa' }} />
                      <Line type="monotone" name="Traditional Equity Volume" dataKey="eqTheme" stroke="#94a3b8" strokeWidth={2} dot={false} />
                      <Line type="monotone" name="Total Options Volume" dataKey="opTheme" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4 font-mono text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full" /> Traditional Equities</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-primary shadow-[0_0_5px_#22d3ee] rounded-full" /> Total Options (0DTE Explosion)</div>
                </div>
              </div>

              <p className="italic glow-cyan text-primary my-6">
                &quot;When price stalls at a &apos;random&apos; level or accelerates through a &apos;solid&apos; floor without a news catalyst, it isn&apos;t an anomaly. It is the mechanical result of dealer hedging.&quot;
              </p>
              <p>
                To navigate today’s tape, you must stop looking at the candles and start looking at where the dealers are forced to hedge their books.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaways Section */}
      <section id="takeaways" className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="space-y-32">
          
          <TakeawayRow 
            num="01"
            title="Gamma Isn’t Just for Options Traders"
            subtitle="The Secret Pulse of the Futures Market"
            icon={<Zap className="w-6 h-6 text-primary" />}
          >
            <p>
              Gamma is often viewed as an abstract Greek reserved for sophisticated derivatives desks, but for a futures trader, it is the single most important force behind intraday flow. Gamma measures the rate of change in an option&apos;s Delta. Because market makers are not in the business of taking directional risk—their business model relies on volume and remaining &quot;Delta-Neutral&quot;—they must offset every change in an option&apos;s Delta by buying or selling the underlying asset, typically index futures.
            </p>
            <p>
              A futures trader ignoring the options chain is effectively flying blind. In today&apos;s environment, options flow creates futures flow. When institutional players move in the options market, the resulting Delta hedging creates a mechanical feedback loop that dictates the direction and speed of futures movement.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 p-6 bg-black rounded-lg border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-50 pointer-events-none"></div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">Step 1</div>
                <div className="text-xs text-white font-bold uppercase">Retail/Inst Flow</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">Step 2</div>
                <div className="text-xs text-white font-bold uppercase">Market Maker</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-secondary" />
                </div>
                <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">Step 3</div>
                <div className="text-xs text-white font-bold uppercase">Delta Neutrality</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <RefreshCcw className="w-5 h-5 text-secondary animate-spin-slow" />
                </div>
                <div className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">Step 4</div>
                <div className="text-xs text-white font-bold uppercase">Forced Hedging</div>
              </div>
            </div>

            <blockquote className="border-l-2 border-primary pl-4 italic text-white/80 my-6 bg-white/5 py-4 pr-4 rounded-r-lg">
              &quot;We separate the 0DTE flow and the zero-day options from the full option chain to filter out long-dated noise. This allows us to focus on where intraday hedging flow will be most reactive, helping us identify high-conviction support, resistance, and potential breakout zones.&quot;
            </blockquote>
          </TakeawayRow>

          <TakeawayRow 
            num="02"
            title="The 'HVL' is Your Regime Compass"
            subtitle="Not All Support is Created Equal"
            icon={<Crosshair className="w-6 h-6 text-primary" />}
          >
            <p>
              One of the most powerful tools in a strategist’s arsenal is the High Volatility Level (HVL). Technically, the HVL is defined as the inflection point in the slope of the cumulative gamma exposure curve. It serves as a &quot;Regime Compass,&quot; marking the boundary between a stabilizing market and a chaotic one.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <button 
                className={`p-6 min-h-[44px] rounded-lg border text-left cursor-pointer transition-all relative z-50 ${activeRegime === 'positive' ? 'border-primary shadow-[0_0_15px_rgba(34,211,238,0.1)] bg-cyan-900/10 glow-border' : 'border-white/10 opacity-60 bg-white/5 hover:bg-white/10 hover:opacity-100'} order-2 md:order-1 overflow-hidden pointer-events-auto`}
                onClick={() => setActiveRegime('positive')}
              >
                {activeRegime === 'positive' && <div className="absolute inset-0 regime-bg-pos opacity-40 pointer-events-none"></div>}
                <div className="relative z-10 pointer-events-none">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${activeRegime === 'positive' ? 'bg-primary shadow-[0_0_10px_#22d3ee]' : 'bg-slate-600'}`} />
                    <h4 className="font-sans font-bold tracking-tighter uppercase text-white shadow-sm">Positive Gamma</h4>
                  </div>
                  <div className={`font-mono text-[10px] mb-2 uppercase tracking-widest ${activeRegime === 'positive' ? 'text-primary/80' : 'text-slate-500'}`}>Liquidity-Providing</div>
                  <p className="text-sm text-slate-400">Above the HVL, dealers trade against the trend—buying dips and selling rallies. This creates a mean-reverting environment where the HVL acts as a magnet, dampening volatility and leading to &quot;pinning&quot; behavior.</p>
                </div>
              </button>
              <div className="bg-black p-6 rounded-xl border border-white/10 relative overflow-hidden order-1 md:order-2 md:row-span-2 flex flex-col pointer-events-auto z-40">
                 <div className="flex justify-between items-center mb-2 z-10">
                   <h4 className="font-sans font-bold tracking-tighter uppercase text-white">Price Action Simulation</h4>
                   <div className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded border border-white/20 text-white font-bold">{activeRegime.toUpperCase()}</div>
                 </div>
                 <p className="text-xs text-slate-400 mb-6 z-10 font-mono tracking-widest uppercase">Visualizing {activeRegime === 'positive' ? 'Mean Reversion' : 'Breakout / Acceleration'}.</p>
                 <div className="flex-1 min-h-[250px] w-full -ml-4 relative z-50 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRegime}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activeRegime === 'positive' ? gammaSimDataPositive : gammaSimDataNegative}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                          <XAxis dataKey="time" stroke="#52525b" fontSize={11} />
                          <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="#52525b" fontSize={11} tickFormatter={(val) => `$${val}`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#020408', borderColor: activeRegime === 'positive' ? 'rgba(34,211,238,0.3)' : 'rgba(244,63,94,0.3)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} 
                            itemStyle={{ color: activeRegime === 'positive' ? '#22d3ee' : '#f43f5e', fontWeight: 'bold' }} 
                            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                            formatter={(value) => [`$${value}`, 'Price']}
                          />
                          <ReferenceLine y={4450} stroke={activeRegime === 'positive' ? "#22d3ee" : "#f43f5e"} strokeWidth={1} strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Major Options Level (4450)', fill: '#94a3b8', fontSize: 10 }} />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke={activeRegime === 'positive' ? "#22d3ee" : "#f43f5e"} 
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#0a0c10', stroke: activeRegime === 'positive' ? '#22d3ee' : '#f43f5e', strokeWidth: 2 }} 
                            activeDot={{ r: 6, fill: activeRegime === 'positive' ? '#22d3ee' : '#f43f5e' }} 
                            animationDuration={1500} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </AnimatePresence>
                 </div>
              </div>
              <button 
                className={`p-6 text-left min-h-[44px] rounded-lg border cursor-pointer transition-all relative z-50 ${activeRegime === 'negative' ? 'border-secondary shadow-[0_0_15px_rgba(244,63,94,0.15)] bg-rose-900/10' : 'border-white/10 opacity-60 bg-white/5 hover:bg-white/10 hover:opacity-100'} order-3 overflow-hidden pointer-events-auto`}
                onClick={() => setActiveRegime('negative')}
              >
                {activeRegime === 'negative' && <div className="absolute inset-0 regime-bg-neg opacity-40 pointer-events-none"></div>}
                <div className="relative z-10 pointer-events-none">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${activeRegime === 'negative' ? 'bg-secondary shadow-[0_0_10px_#f43f5e] animate-pulse' : 'bg-slate-600'}`} />
                    <h4 className="font-sans font-bold tracking-tighter uppercase text-white shadow-sm">Negative Gamma</h4>
                  </div>
                  <div className={`font-mono text-[10px] mb-2 uppercase tracking-widest ${activeRegime === 'negative' ? 'text-secondary/80' : 'text-slate-500'}`}>Liquidity-Taking</div>
                  <p className="text-sm text-slate-400">Below the HVL, the regime flips. Dealers hedge with the move—selling as the market drops and buying as it rises. This amplifies volatility, turning the HVL into a &quot;launchpad&quot; for explosive moves.</p>
                </div>
              </button>
            </div>
            <p>
              Knowing the regime is more critical than knowing the price; it determines whether your strategy should favor mean reversion or momentum.
            </p>
          </TakeawayRow>

          <TakeawayRow 
            num="03"
            title="The 0DTE Magnet"
            subtitle="Why 'Options Expiring Today' Rule Intraday Action"
            icon={<Magnet className="w-6 h-6 text-primary" />}
          >
            <p>
              Options with zero days to expiration (0DTE) have fundamentally altered the intraday landscape. Because these contracts are at their expiration point, they possess extremely high Gamma, specifically near-the-money. A move of just a few points in the S&P 500 can cause a massive, instantaneous shift in 0DTE Delta, forcing dealers to hedge rapidly using futures.
            </p>
            <p>
              This explains why the market often pauses or &quot;pins&quot; at specific strikes on a Tuesday afternoon for no apparent reason. By isolating 0DTE flow, traders can strip away the noise of long-dated institutional positions and identify the structural barriers most likely to trigger a reversal or an acceleration in the current session.
            </p>

            <div className="my-8 p-6 bg-black border border-white/10 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-sans font-bold text-white uppercase tracking-tighter">0DTE Intraday Pinning Effect</h4>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Live Spikes</span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={odteSpikes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="time" stroke="#52525b" fontSize={11} />
                    <YAxis yAxisId="left" stroke="#52525b" fontSize={11} domain={['dataMin - 10', 'dataMax + 10']} />
                    <YAxis yAxisId="right" orientation="right" stroke="#52525b" fontSize={11} hide />
                    <Tooltip contentStyle={{ backgroundColor: '#020408', borderColor: 'rgba(34,211,238,0.2)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '10px' }} itemStyle={{ color: '#fafafa' }} />
                    <Bar yAxisId="right" dataKey="volume" fill="#f43f5e" opacity={0.3} name="0DTE Volume Spike" />
                    <Line yAxisId="left" type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4, fill: '#0a0c10', stroke: '#22d3ee', strokeWidth: 2 }} name="Index Price" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TakeawayRow>

          <TakeawayRow 
            num="04"
            title="The JPM Collar and 'Fault Lines'"
            subtitle="A Counter-Intuitive Truth"
            icon={<Layers className="w-6 h-6 text-primary" />}
          >
            <p>
              Traders often speak of &quot;pinning&quot; regarding large institutional positions like the JPMorgan (JPM) put spread collar, but they often get the mechanics backward. In the March 2026 cycle, for example, the lower put strike sat near 6475, while the call strike was significantly higher at 7155.
            </p>
            <p>
              The distinction lies in whether dealers are long or short Gamma. At a long Gamma strike (typically the 7155 call), dealer hedging compresses price, acting like a magnet. However, at a short Gamma strike (like the 6475 lower put), the level behaves like a &quot;fault line.&quot;
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="bg-white/5 glow-border p-6 rounded-lg relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute inset-0 regime-bg-pos opacity-20"></div>
                <Magnet className="w-8 h-8 text-primary mb-4 relative z-10" />
                <h5 className="font-sans font-bold text-white mb-2 tracking-tighter uppercase relative z-10">Long Option Strike</h5>
                <span className="font-mono text-[10px] text-primary/80 uppercase tracking-widest mb-3 relative z-10">The Magnet</span>
                <p className="text-xs text-slate-400 relative z-10">Markets naturally pin to these strikes. Dealer hedging compresses the price, acting as a stabilizer.</p>
              </div>
              <div className="bg-white/5 border border-secondary/20 p-6 rounded-lg relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute inset-0 regime-bg-neg opacity-20"></div>
                <Zap className="w-8 h-8 text-secondary mb-4 relative z-10" />
                <h5 className="font-sans font-bold text-white mb-2 tracking-tighter uppercase relative z-10">Short Option Strike</h5>
                <span className="font-mono text-[10px] text-secondary/80 uppercase tracking-widest mb-3 relative z-10">The Fault Line</span>
                <p className="text-xs text-slate-400 relative z-10">Approaching this strike reduces liquidity and violently accelerates price movement. It acts as a fault line, not a magnet.</p>
              </div>
            </div>
            <div className="bg-primary/5 border border-primary/20 glow-border rounded-lg p-6 my-6">
              <p className="text-white/90 m-0 text-sm">
                Instead of attracting price, these short Gamma strikes repel it. As price approaches a major short Gamma level, dealer selling accelerates the move downward to stay hedged. This instability is often reinforced by &quot;Charm,&quot; a force that causes Delta to change rapidly as expiration approaches, kicking off violent moves away from the level.
              </p>
            </div>
          </TakeawayRow>

          <TakeawayRow 
            num="05"
            title="Hidden Floors Found in Translation"
            subtitle="The Power of Level Conversion"
            icon={<BarChart3 className="w-6 h-6 text-primary" />}
          >
            <p>
              The heaviest institutional volume is concentrated in the underlying indices (SPX, QQQ) and ETFs (GLD), but the liquidity for execution is in the futures (ES, NQ, GC). Strategic traders use &quot;Level Conversion&quot; to map these institutional heavyweights onto their futures charts.
            </p>
            <p>
              By applying a &quot;Manual Ratio&quot;—such as the 41.26 ratio for QQQ to NQ or specific ratios for Nvidia—traders can reveal &quot;hidden&quot; structural levels. 
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 my-8 p-6 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 100 100" className="fill-cyan-400">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                  <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left relative z-10">
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">Index Options Volume</div>
                <div className="text-2xl font-sans font-bold tracking-tighter text-white">QQQ / SPY</div>
              </div>
              <div className="flex flex-col items-center justify-center shrink-0 relative z-10">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">FloQ model API</div>
                <ArrowRight className="w-6 h-6 text-primary glow-cyan" />
              </div>
              <div className="flex-1 text-center md:text-right relative z-10">
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">Executable Futures Levels</div>
                <div className="text-2xl font-sans font-bold tracking-tighter text-white">NQ / ES</div>
              </div>
            </div>
            <p>
              This is perfectly illustrated in the &quot;Gold Playbook,&quot; where a trader can convert GLD volume strikes (like the 410 strike) or 0DTE Gamma clusters onto the GC gold futures chart to find floors that simply do not exist on a standard technical futures chart.
            </p>
            <p>
              Furthermore, by incorporating &quot;Secondary Levels&quot; (GEX 1-10), which represent the next most significant concentrations of Gamma, traders can identify a full structural map of where the market is likely to stall or accelerate.
            </p>
          </TakeawayRow>

        </div>
      </section>

            {/* Conclusion */}
            <section className="py-24 px-6 border-t border-white/10 bg-black/50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-sans font-extrabold text-4xl text-white mb-6 uppercase tracking-tighter">Beyond the Candles</h2>
                <p className="text-lg text-slate-400 font-light mb-12">
                  In the modern market, successful trading is no longer about identifying simple geometric patterns on a chart; it is a game of strategic betting backed by institutional-grade math. By tracking dealer positioning, understanding the transition between liquidity-providing and liquidity-taking postures, and respecting the &quot;fault lines&quot; created by short Gamma, retail traders can finally move from reacting to price to anticipating the flow.
                </p>
                <div className="p-8 border border-primary/20 rounded-lg bg-cyan-900/10 glow-border backdrop-blur">
                  <div className="text-primary font-mono font-bold text-[10px] mb-2 uppercase opacity-60">System Check</div>
                  <h3 className="font-sans font-bold text-2xl text-white mb-4 uppercase tracking-tighter flex items-center justify-center gap-3">
                    The next time you see a massive intraday reversal with zero news catalysts:
                  </h3>
                  <p className="text-primary text-xl font-mono tracking-tighter mb-8">
                    Will you look at your candles, or will you look at the inflection point where the dealers were forced to hedge?
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 min-h-[44px] min-w-[44px] bg-primary text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-white hover:text-black transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                      Start Tracking Gamma
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 min-h-[44px] min-w-[44px] border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-all">
                      Run Simulation
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="masterclass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <MasterclassSection />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-8 px-6 bg-black/80 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-[10px] sm:text-xs text-slate-500 font-light leading-relaxed">
            <strong className="font-mono text-slate-400 uppercase tracking-widest text-[10px] mr-2">Disclaimer:</strong>
            The tips, strategies, and classes provided on this site are shared strictly based on our personal trading experience. We do not provide financial advice. You must seek your own confirmations and think critically before taking any market action. We assume no responsibility or liability if you blindly trust the information stated on this website and subsequently lose your trades. Trade at your own risk.
          </p>
        </div>
      </div>

      <footer className="h-10 bg-black border-t border-white/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between px-8 text-[9px] font-mono text-white/40 tracking-widest uppercase relative z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="flex gap-6 mb-2 sm:mb-0">
        </div>
        <div>© 2026 FLOQ STRATEGIC RESEARCH. BEYOND THE CANDLES.</div>
      </footer>
    </main>
  );
}

function TakeawayRow({ num, title, subtitle, icon, children }: { num: string, title: string, subtitle: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-12 gap-8 md:gap-12 group p-6 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
    >
      <div className="md:col-span-4 flex flex-col md:items-start items-center text-center md:text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded glow-cyan bg-cyan-900/10 border border-primary/20 group-hover:glow-border transition-all">
            {icon}
          </div>
          <div>
             <h4 className="font-mono text-[10px] tracking-widest text-primary uppercase">Takeaway {num}</h4>
             <div className="w-8 h-[1px] bg-primary/30 mt-1"></div>
          </div>
        </div>
        <h3 className="font-sans font-extrabold text-2xl text-white mb-2 leading-tight tracking-tighter uppercase">{title}</h3>
        <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono block">{subtitle}</span>
      </div>
      <div className="md:col-span-8 prose prose-invert prose-sm sm:prose-base max-w-none prose-p:text-slate-400 prose-p:font-light prose-p:leading-relaxed prose-strong:text-white">
        {children}
      </div>
    </motion.div>
  );
}
