import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, ShieldCheck, FileText, Globe, Ruler, Contrast, Sun, Moon, Sparkles, Check, ChevronDown } from 'lucide-react';
import { CurrencyCode, UnitSystem, ContrastMode } from '../types';
import { CURRENCY_RATES } from '../data/doors';
import { CONTRAST_THEMES } from '../data/contrastThemes';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenCatalogue: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onScrollToQuote: () => void;
  currency: CurrencyCode;
  onChangeCurrency: (curr: CurrencyCode) => void;
  unit: UnitSystem;
  onChangeUnit: (unit: UnitSystem) => void;
  contrastMode: ContrastMode;
  onChangeContrastMode: (mode: ContrastMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenu,
  onOpenCatalogue,
  soundEnabled,
  onToggleSound,
  onScrollToQuote,
  currency,
  onChangeCurrency,
  unit,
  onChangeUnit,
  contrastMode,
  onChangeContrastMode,
}) => {
  const [showContrastMenu, setShowContrastMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 transition-all duration-300">
      {/* Top domain & international status bar */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1.5 bg-black/70 border-b border-zinc-800/90 text-[11px] text-zinc-300 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e4ff3a] animate-pulse"></span>
          <span className="font-mono tracking-wider text-zinc-200 font-semibold">portalux.design</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">Grand Architectural Entrance & Window Systems</span>
        </div>

        <div className="flex items-center gap-3 text-zinc-300 font-mono">
          {/* Contrast Color Palette Selector */}
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 rounded-full px-2.5 py-1 shadow-sm">
            <Contrast className="w-3.5 h-3.5 text-[#e4ff3a]" />
            <span className="text-[10px] text-zinc-400 font-bold uppercase mr-0.5">Palette:</span>
            <div className="flex items-center gap-1">
              {CONTRAST_THEMES.map((opt) => {
                const active = contrastMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      sound.playClick();
                      onChangeContrastMode(opt.id);
                    }}
                    title={`${opt.label} — ${opt.hint}`}
                    className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-150 relative ${
                      active
                        ? 'ring-2 ring-white scale-125 shadow-md z-10'
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: opt.color }}
                  />
                );
              })}
            </div>
            <span className="text-[10px] font-bold text-zinc-300 ml-1 hidden xl:inline">
              {CONTRAST_THEMES.find((t) => t.id === contrastMode)?.shortLabel}
            </span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 rounded-full px-2 py-0.5">
            <Globe className="w-3 h-3 text-[#e4ff3a]" />
            {(['AUD', 'USD', 'EUR', 'GBP', 'PKR', 'SAR'] as CurrencyCode[]).map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  sound.playClick();
                  onChangeCurrency(curr);
                }}
                title={`${CURRENCY_RATES[curr]?.fullName || curr} (${CURRENCY_RATES[curr]?.flag || ''})`}
                className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer transition-colors font-semibold ${
                  currency === curr ? 'bg-[#e4ff3a] text-black font-bold shadow-sm' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 rounded-full px-2 py-0.5">
            <Ruler className="w-3 h-3 text-[#e4ff3a]" />
            <button
              onClick={() => {
                sound.playClick();
                onChangeUnit('metric');
              }}
              className={`px-1.5 rounded text-[10px] cursor-pointer transition-colors font-medium ${
                unit === 'metric' ? 'bg-[#e4ff3a] text-black font-bold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              MM
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onChangeUnit('imperial');
              }}
              className={`px-1.5 rounded text-[10px] cursor-pointer transition-colors font-medium ${
                unit === 'imperial' ? 'bg-[#e4ff3a] text-black font-bold' : 'text-zinc-300 hover:text-white'
              }`}
            >
              IN
            </button>
          </div>

          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1 text-zinc-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e4ff3a]" /> 15-Yr Atelier Guarantee
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="flex items-baseline">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
              porta
            </span>
            <span className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#e4ff3a]">
              lux
            </span>
            <span className="w-2 h-2 rounded-full bg-[#e4ff3a] ml-1 mb-1 shadow-[0_0_8px_#e4ff3a]"></span>
          </div>
        </a>

        {/* Center quick navigation indicators */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-widest text-zinc-300">
          <a
            href="#studio"
            onClick={() => sound.playClick()}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#e4ff3a] transition-colors cursor-pointer"
          >
            3D Studio
          </a>
          <a
            href="#windows"
            onClick={() => sound.playClick()}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#e4ff3a] transition-colors cursor-pointer text-[#e4ff3a]"
          >
            Windows
          </a>
          <a
            href="#specifications"
            onClick={() => sound.playClick()}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#e4ff3a] transition-colors cursor-pointer"
          >
            Sizing & Quote
          </a>
          <a
            href="#certifications"
            onClick={() => sound.playClick()}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#e4ff3a] transition-colors cursor-pointer"
          >
            Benchmarks
          </a>
          <a
            href="#engineering"
            onClick={() => sound.playClick()}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#e4ff3a] transition-colors cursor-pointer"
          >
            Engineering
          </a>
          <a
            href="#projects"
            onClick={() => sound.playClick()}
            className="hover:text-white hover:underline underline-offset-4 decoration-[#e4ff3a] transition-colors cursor-pointer"
          >
            Portfolio
          </a>
          <button
            onClick={() => {
              sound.playClick();
              onOpenCatalogue();
            }}
            className="flex items-center gap-1.5 hover:text-[#e4ff3a] text-zinc-200 transition-colors cursor-pointer font-bold"
          >
            <FileText className="w-3.5 h-3.5" />
            Catalogue
          </button>
        </div>

        {/* Right action group */}
        <div className="flex items-center gap-2 sm:gap-2.5 relative">
          {/* Quick Contrast Button with Dropdown (Mobile + Desktop) */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowContrastMenu(!showContrastMenu);
                if (showCurrencyMenu) setShowCurrencyMenu(false);
              }}
              title="Change Color Contrast Theme"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#e4ff3a] text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <div
                className="w-3 h-3 rounded-full shadow-sm ring-1 ring-white/30"
                style={{
                  backgroundColor:
                    CONTRAST_THEMES.find((t) => t.id === contrastMode)?.color || '#e4ff3a',
                }}
              />
              <span className="hidden md:inline font-mono text-[11px]">
                {CONTRAST_THEMES.find((t) => t.id === contrastMode)?.shortLabel || 'Contrast'}
              </span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showContrastMenu && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 font-sans max-h-[420px] overflow-y-auto"
              >
                <div className="px-3 py-2 border-b border-zinc-800 text-xs font-mono font-bold text-white flex items-center justify-between">
                  <span>COLOR CONTRAST THEMES</span>
                  <span className="text-[10px] text-[#e4ff3a]">9 Palettes</span>
                </div>
                <div className="mt-1 space-y-1">
                  {CONTRAST_THEMES.map((opt) => {
                    const active = contrastMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sound.playClick();
                          onChangeContrastMode(opt.id);
                          setShowContrastMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'bg-[#e4ff3a] text-black font-bold shadow-md'
                            : 'hover:bg-zinc-800 text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full shrink-0 ring-1 ring-white/40 shadow-sm"
                            style={{ backgroundColor: opt.color }}
                          />
                          <div>
                            <div className="font-semibold">{opt.label}</div>
                            <div className={`text-[10px] ${active ? 'text-black/80' : 'text-zinc-400'}`}>
                              {opt.hint}
                            </div>
                          </div>
                        </div>
                        {active && <Check className="w-4 h-4 text-black shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Currency Selector with Dropdown (Mobile + Desktop) */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowCurrencyMenu(!showCurrencyMenu);
                if (showContrastMenu) setShowContrastMenu(false);
              }}
              title="Select Pricing Currency (PKR, SAR, AUD, USD, EUR, GBP)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#e4ff3a] text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-[#e4ff3a]" />
              <span className="font-mono text-[11px] font-bold text-[#e4ff3a]">{currency}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showCurrencyMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 font-sans">
                <div className="px-3 py-2 border-b border-zinc-800 text-xs font-mono font-bold text-white flex items-center justify-between">
                  <span>INTERNATIONAL CURRENCY</span>
                  <span className="text-[10px] text-[#e4ff3a]">Live Rates</span>
                </div>
                <div className="mt-1 space-y-1">
                  {(['PKR', 'SAR', 'AUD', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((curr) => {
                    const active = currency === curr;
                    const info = CURRENCY_RATES[curr];
                    return (
                      <button
                        key={curr}
                        onClick={() => {
                          sound.playClick();
                          onChangeCurrency(curr);
                          setShowCurrencyMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          active ? 'bg-[#e4ff3a] text-black font-bold' : 'hover:bg-zinc-800 text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{info.flag}</span>
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              <span>{curr}</span>
                              <span className={`text-[10px] font-mono ${active ? 'text-black/80 font-bold' : 'text-zinc-400'}`}>
                                ({info.symbol.trim()})
                              </span>
                            </div>
                            <div className={`text-[10px] ${active ? 'text-black/90 font-semibold' : 'text-zinc-400'}`}>
                              {info.fullName}
                            </div>
                          </div>
                        </div>
                        {active && <Check className="w-4 h-4 text-black shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Interactive Sound' : 'Enable Interactive Sound'}
            className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white hover:border-[#e4ff3a] transition-all cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#e4ff3a]" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
          </button>

          {/* Quick quote button */}
          <button
            onClick={() => {
              sound.playClick();
              onScrollToQuote();
            }}
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-zinc-800 hover:bg-[#e4ff3a] text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-zinc-600 cursor-pointer shadow-sm"
          >
            Get A Quote
          </button>

          {/* Menu button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenMenu();
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-100 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex flex-col gap-1 w-4">
              <span className="w-full h-0.5 bg-zinc-200 group-hover:bg-[#e4ff3a] transition-colors"></span>
              <span className="w-full h-0.5 bg-zinc-200 group-hover:bg-[#e4ff3a] transition-colors"></span>
            </div>
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

