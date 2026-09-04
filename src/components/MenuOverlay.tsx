import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Phone, Mail, MapPin, Globe, Contrast } from 'lucide-react';
import { CurrencyCode, ContrastMode } from '../types';
import { CURRENCY_RATES } from '../data/doors';
import { CONTRAST_THEMES } from '../data/contrastThemes';
import { sound } from '../utils/sound';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
  currency?: CurrencyCode;
  onChangeCurrency?: (c: CurrencyCode) => void;
  contrastMode?: ContrastMode;
  onChangeContrastMode?: (mode: ContrastMode) => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  currency = 'AUD',
  onChangeCurrency,
  contrastMode = 'high-dark',
  onChangeContrastMode,
}) => {
  const menuItems = [
    { num: '01', title: '3D Studio', target: 'studio', desc: 'Interactive 3D entrance & window visualizer' },
    { num: '02', title: 'Window Systems', target: 'windows', desc: 'Minimalist sliding, pivot & crittall glazing' },
    { num: '03', title: 'Grand Entrances', target: 'modern-doors', desc: '3mm marine aluminium pivot & thermal doors' },
    { num: '04', title: 'Engineering & Sizing', target: 'specifications', desc: 'Technical specifications, ratings & quote' },
    { num: '05', title: 'Certifications', target: 'certifications', desc: 'AS2047, DIN EN 1627 & acoustic benchmarks' },
    { num: '06', title: 'Global Projects', target: 'projects', desc: 'International portfolio across GCC & worldwide' },
  ];

  const handleNav = (target: string) => {
    sound.playClick();
    onClose();
    onSelectSection(target);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Top header inside overlay */}
          <div className="flex items-center justify-between max-w-4xl mx-auto w-full border-b border-zinc-800/80 pb-6">
            <div className="flex items-baseline">
              <span className="font-heading text-3xl font-extrabold text-white">porta</span>
              <span className="font-heading text-3xl font-extrabold text-[#e4ff3a]">lux</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#e4ff3a] flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Grid matching video */}
          <div className="max-w-4xl mx-auto w-full my-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => handleNav(item.target)}
                  className="group relative bg-[#131518] hover:bg-[#1a1e23] border border-zinc-800/90 hover:border-zinc-600 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[120px] shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-[#e4ff3a] transition-colors">
                      {item.num}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#e4ff3a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* High-voltage Contact Us Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="mt-4"
            >
              <button
                onClick={() => handleNav('footer-contact')}
                className="w-full bg-[#e4ff3a] hover:bg-[#d5f02f] text-black font-heading text-2xl sm:text-3xl py-4 px-8 rounded-2xl font-bold tracking-wide transition-all shadow-[0_4px_25px_rgba(228,255,58,0.25)] hover:shadow-[0_6px_30px_rgba(228,255,58,0.4)] cursor-pointer flex items-center justify-center gap-3"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Color Contrast Palette Switcher inside Menu */}
            {onChangeContrastMode && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="mt-6 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-bold">
                    <Contrast className="w-3.5 h-3.5 text-[#e4ff3a]" />
                    <span className="uppercase">Select Color Contrast Theme</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#e4ff3a]">9 WCAG Palettes</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CONTRAST_THEMES.map((theme) => {
                    const active = contrastMode === theme.id;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          sound.playClick();
                          onChangeContrastMode(theme.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          active
                            ? 'bg-[#e4ff3a] text-black border-[#e4ff3a] font-bold shadow-md'
                            : 'bg-zinc-900/90 text-zinc-200 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full shrink-0 ring-1 ring-white/30"
                            style={{ backgroundColor: theme.color }}
                          />
                          <div>
                            <div className="font-bold text-xs leading-tight">{theme.label}</div>
                            <div className={`text-[10px] mt-0.5 line-clamp-1 ${active ? 'text-black/80' : 'text-zinc-400'}`}>
                              {theme.hint}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Currency Selector Bar inside Menu */}
            {onChangeCurrency && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="mt-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-bold">
                    <Globe className="w-3.5 h-3.5 text-[#e4ff3a]" />
                    <span className="uppercase">Select Pricing Currency</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#e4ff3a]">Real-Time Atelier Rates</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {(['PKR', 'SAR', 'AUD', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((curr) => {
                    const active = currency === curr;
                    const info = CURRENCY_RATES[curr];
                    return (
                      <button
                        key={curr}
                        onClick={() => {
                          sound.playClick();
                          onChangeCurrency(curr);
                        }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          active
                            ? 'bg-[#e4ff3a] text-black border-[#e4ff3a] font-bold shadow-md'
                            : 'bg-zinc-900/90 text-zinc-200 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{info.flag}</span>
                          <div>
                            <div className="font-bold text-xs leading-none">{curr}</div>
                            <div className={`text-[10px] font-mono mt-0.5 ${active ? 'text-black/80' : 'text-zinc-400'}`}>
                              {info.symbol.trim()}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom info banner */}
          <div className="max-w-4xl mx-auto w-full pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#e4ff3a]" />
              <span className="font-mono text-white">1800 840 366</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#e4ff3a]" />
              <span>concierge@portalux.design</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#e4ff3a]" />
              <span>490 Architecture Quarter, Design Precinct</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
