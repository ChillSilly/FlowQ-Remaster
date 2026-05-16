import { motion } from 'motion/react';
import { Target, Activity, Zap, Clock, Maximize, Layers, Compass } from 'lucide-react';

const levels = [
  {
    id: '01',
    title: 'Core Resistance (The Gamma Wall)',
    color: 'emerald',
    icon: <Target className="w-6 h-6 text-emerald-400" />,
    what: 'The Core Resistance is the strike price across the options chain with the highest concentration of net call gamma exposure. Visually, on our Net Gamma Exposure chart, it is the widest green bar.',
    mechanics: 'Think of the Core Resistance as a structural ceiling. As the price rallies and approaches this level, dealers who are "long gamma" must sell the underlying asset (or futures) to stay delta-neutral. This creates massive mechanical selling pressure into the rally, even if there is no fundamental news. Furthermore, many retail and institutional traders naturally take profits on their call options as the price hits this major strike. As they close their trades, market makers unwind their long hedges by selling the underlying, which further reinforces the ceiling and causes a pullback.',
    trade: [
      {
        name: 'The Rejection Play',
        desc: 'Expect the price to stall, reject, or reverse when it hits this level due to the overwhelming hedging flow. You can use this as an absolute take-profit target for long positions or a zone to enter a short (fade) trade.'
      },
      {
        name: 'The Breakout Play',
        desc: 'If the market is incredibly bullish, traders may refuse to sell and instead roll their call options to even higher strikes. This forces the Gamma Wall to shift higher, forcing dealers to rapidly buy the underlying asset to hedge. This turns the old resistance into a launchpad for an explosive breakout.'
      }
    ]
  },
  {
    id: '02',
    title: 'Put Support',
    color: 'rose',
    icon: <Target className="w-6 h-6 text-rose-400" />,
    what: 'The Put Support is the exact opposite of the Core Resistance. It is the strike price with the highest net put gamma exposure across the option chain. On our charts, it is the widest red bar.',
    mechanics: 'This level acts as the market\'s structural floor. As the price drops towards this level, dealers are generally short gamma and must hedge by selling the underlying asset. However, as the price reaches this major strike, traders who own puts will frequently "monetize" (take their profits). When investors close these put positions, the market makers no longer need their short hedges, so they quickly buy back the underlying asset. This sudden burst of buying pressure creates a strong bounce.',
    trade: [
      {
        name: 'The Bounce Play',
        desc: 'Look for the market to bottom out and bounce at this level as puts are monetized and short hedges are covered.'
      },
      {
        name: 'The Breakdown Play',
        desc: 'If the market is experiencing extreme fear, investors will not take profits. Instead, they will roll their put options to lower strikes to maintain downside protection. This forces dealers to aggressively short the market to hedge the new, lower strikes. The support breaks, creating mechanical selling pressure that causes the price to plunge rapidly.'
      }
    ]
  },
  {
    id: '03',
    title: 'High Volatility Level (HVL)',
    color: 'cyan',
    icon: <Activity className="w-6 h-6 text-cyan-400" />,
    what: 'The HVL is arguably the most important level in our models. It is the exact transition zone—the inflection point on the cumulative gamma curve—where the overall market shifts from a positive gamma regime to a negative gamma regime (or vice versa).',
    mechanics: 'The HVL acts as your "regime compass". Above the HVL, dealers buy dips and sell rallies to hedge, dampening volatility (mean-reversion). The HVL acts as a magnet. Below the HVL, gamma flips negative. Dealers must sell when the market drops and buy when it rises, amplifying volatility.',
    trade: [
      {
        name: 'Rules of Engagement',
        desc: 'Never trade the same way on both sides of the HVL. Above the HVL, use range-bound, mean-reversion strategies and expect choppy conditions. Below the HVL, do not blindly "buy the dip". Prepare for fast, trend-following momentum days and wide price swings.'
      }
    ]
  },
  {
    id: '04',
    title: '1-Day Expected Move (1D Min and 1D Max)',
    color: 'purple',
    icon: <Maximize className="w-6 h-6 text-purple-400" />,
    what: 'This is a forward-looking volatility indicator that calculates the estimated upper boundary (1D Max) and lower boundary (1D Min) for the asset\'s daily price movement, driven purely by the options market\'s implied volatility.',
    mechanics: 'Unlike visual chart patterns, this gives you the exact statistical odds of the day\'s range. Based on four years of backtested option data on the S&P 500, the market closed above the 1D Minimum 87% of the time, and below the 1D Maximum 85% of the time.',
    trade: [
      {
        name: 'Fade Extremes',
        desc: 'Because the market stays inside this boundary the vast majority of the time, touching the 1D Max or 1D Min early in the session without a major news catalyst suggests the market is statistically overextended. You can use these lines to fade the extremes (entering a reversal trade), or use them as highly accurate take-profit targets for your intraday trends.'
      },
      {
        name: 'Breakout Confirmation',
        desc: 'If price breaks outside these boundaries and holds, it confirms an extraordinarily strong momentum day.'
      }
    ]
  },
  {
    id: '05',
    title: '0DTE Levels (Zero Days to Expiration)',
    color: 'amber',
    icon: <Clock className="w-6 h-6 text-amber-400" />,
    what: 'These are the Core Resistance, Put Support, and HVL calculated exclusively from options that expire on the current trading day.',
    mechanics: '0DTE options have the absolute highest gamma because they expire in mere hours. Because they have almost no time value left, even a tiny shift in the underlying price causes a massive swing in their delta. This forces market makers to hedge aggressively in real-time, stripping away the noise of long-dated options.',
    trade: [
      {
        name: 'Intraday Roadmap',
        desc: 'If you are an intraday trader or a scalper, 0DTE levels are your primary roadmap. These levels serve as massive intraday magnets causing immediate pinning behavior, fast breakouts, or sharp mid-day reversals without any fundamental news.'
      }
    ]
  },
  {
    id: '06',
    title: 'GEX Levels (GEX 1 through 10)',
    color: 'slate',
    icon: <Layers className="w-6 h-6 text-slate-400" />,
    what: 'Beyond the primary Core Resistance and Put Support, the GEX levels rank the remaining strike prices by their net gamma and delta exposure.',
    mechanics: 'GEX 1 represents the specific strike with the second-highest gamma exposure in the entire option chain, GEX 2 is the third-highest, all the way down to GEX 10. The lower the number, the stronger the structural weight of the level.',
    trade: [
      {
        name: 'Secondary Reaction Zones',
        desc: 'When the market breaks past a primary level, it naturally travels to the next highest liquidity pocket. Day traders frequently use GEX 1 and GEX 2 as precise areas to scalp bounces or as step-by-step take-profit targets as a trend develops.'
      }
    ]
  },
  {
    id: '07',
    title: 'Supplementary Models: Blind Spots & Swing Levels',
    color: 'indigo',
    icon: <Compass className="w-6 h-6 text-indigo-400" />,
    what: 'To complete your quantitative edge, the FloQ model incorporates factors outside of pure gamma.',
    mechanics: 'These give context beyond immediate options flow, allowing you to avoid hidden friction and hold for longer horizons.',
    trade: [
      {
        name: 'Blind Spots',
        desc: 'Hidden market reaction zones derived from correlated assets (such as bonds, the dollar, or other indices). They highlight areas where overlapping cross-asset liquidity will cause your target asset to stall or react sharply. Excellent for taking partial profits and avoiding entering trades right into invisible friction.'
      },
      {
        name: 'Swing Trading Levels',
        desc: 'Designed for 5 to 20-day horizons, these levels establish a daily directional bias using Upper Bands (resistance), Lower Bands (support), and a critical "Risk Trigger". Reclaiming the Risk Trigger level confirms that momentum is shifting back into the primary trend.'
      }
    ]
  }
];

export function MasterclassSection() {
  return (
    <section id="education" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10 relative">
      <div className="absolute top-0 right-10 w-[1px] h-32 bg-gradient-to-b from-primary to-transparent opacity-30"></div>
      
      <div className="mb-24">
        <div className="max-w-3xl mb-16">
          <h2 className="font-mono text-[10px] tracking-widest text-primary uppercase mb-4 opacity-70">
            Education Module // 01
          </h2>
          <h3 className="font-sans font-extrabold text-5xl md:text-6xl text-white tracking-tighter leading-[1.1] mb-6">
            FloQ Model Masterclass:<br/>
            <span className="text-white/50">Options-Driven Price Levels</span>
          </h3>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            To trade successfully in today’s markets, you must look beyond traditional technical analysis. Institutional players like market makers do not take directional bets; they hedge their risk mechanically based on options flow. Because of this, their buying and selling dictates where the market stalls, reverses, or accelerates.
          </p>
          <p className="text-base text-slate-500 font-light mt-6 max-w-2xl">
            Below is a detailed, class-style breakdown of every core FloQ model level. By the end of this module, you will understand exactly what these levels mean, the mechanics behind them, and how to use them to map your daily trading strategy.
          </p>
        </div>

        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-sans font-extrabold text-2xl text-white tracking-tight">
                  Chart-Only Navigation
                </h4>
              </div>
              <p className="text-base text-slate-400 font-light max-w-2xl leading-relaxed">
                To determine the market&apos;s bias and strongest reaction zones directly from your chart without looking at the dashboard, you must monitor how the current spot price interacts with the plotted <strong className="text-white font-medium">Gamma Levels</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-cyan-400" />
                </div>
                <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">Directional Bias</h5>
              </div>
              <div className="text-sm text-slate-400 font-light space-y-5">
                <p>The <strong className="text-white font-medium">High Volatility Level (HVL)</strong> acts as your regime compass.</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex flex-shrink-0 items-center justify-center text-xs mt-0.5">↑</div>
                    <p className="leading-relaxed"><strong className="text-white font-medium block mb-1">Above HVL:</strong> Positive regime. Anticipate choppy, mean-reverting price action (pinning).</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex flex-shrink-0 items-center justify-center text-xs mt-0.5">↓</div>
                    <p className="leading-relaxed"><strong className="text-white font-medium block mb-1">Below HVL:</strong> Negative regime. Bias for high-volatility, fast-moving momentum setups.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
                <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">Extreme Reactions</h5>
              </div>
              <div className="text-sm text-slate-400 font-light space-y-4">
                <p className="leading-relaxed"><strong className="text-white font-medium block">Core Resistance & Put Support</strong> Structural ceilings and floors where dealer hedging typically forces sharp pullbacks or bounces.</p>
                <div className="h-[1px] w-full bg-white/5 my-3"></div>
                <p className="leading-relaxed"><strong className="text-white font-medium block">0DTE Levels</strong> Massive magnets that draw price in for immediate pinning or sharp mid-day reversals.</p>
                <div className="h-[1px] w-full bg-white/5 my-3"></div>
                <p className="leading-relaxed"><strong className="text-white font-medium block">GEX Levels (1-10)</strong> Secondary reaction zones step-by-step for scalping bounces or profit taking.</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 hover:border-white/10 transition-colors md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center">
                  <Maximize className="w-4 h-4 text-purple-400" />
               </div>
               <h5 className="font-bold text-white uppercase tracking-widest text-[10px]">Statistical Extremes</h5>
              </div>
              <div className="text-sm text-slate-400 font-light space-y-4">
                <p>Watch the <strong className="text-white font-medium">1-Day Expected Move (Min & Max)</strong> lines.</p>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-xs text-slate-300 leading-relaxed font-mono">
                  Historical data shows the market stays inside these boundaries roughly <span className="text-primary font-bold">85% to 87%</span> of the time.
                </div>
                <p className="leading-relaxed">Touching these charted extremes indicates the market is statistically overextended and highly likely to have a reversal reaction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-32">
        {levels.map((level, i) => (
          <div key={level.id} className="relative group">
            {/* The Line */}
            <div className="absolute left-6 md:left-[5rem] top-12 bottom-0 w-[1px] bg-white/5 -z-10 group-last:bg-transparent"></div>
            
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              
              {/* Header col */}
              <div className="md:col-span-4 relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center bg-white/5 border border-white/10 mt-1">
                    {level.icon}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block mb-2">{level.id} / 07</span>
                    <h4 className={`font-sans font-extrabold text-3xl uppercase tracking-tighter leading-none text-white`}>
                      {level.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Content col */}
              <div className="md:col-span-8 pl-16 md:pl-0">
                
                <div className="mb-12">
                  <h5 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    What It Means
                  </h5>
                  <p className="text-lg text-slate-300 font-light leading-relaxed">
                    {level.what}
                  </p>
                </div>
                
                <div className="mb-12">
                  <h5 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    The Mechanics (Why it works)
                  </h5>
                  <div className="border-l border-white/10 pl-6 py-2">
                    <p className="text-base text-slate-400 font-light leading-relaxed">
                      {level.mechanics}
                    </p>
                  </div>
                </div>

                <div>
                   <h5 className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                    How To Trade It
                  </h5>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {level.trade.map((t, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/5 rounded p-5 hover:bg-white/10 hover:border-white/10 transition-colors">
                        <div className="font-sans font-bold text-white uppercase text-sm tracking-tight mb-2">{t.name}</div>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                          {t.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
