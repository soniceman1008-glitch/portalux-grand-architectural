import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Shield,
  Wind,
  Volume2,
  Sparkles,
  Maximize2,
  ArrowRight,
  Sun,
  Layers,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { WINDOW_MODELS, GLASS_TINT_OPTIONS } from '../data/windows';
import { formatPrice } from '../data/doors';
import { CurrencyCode, WindowModel } from '../types';
import { sound } from '../utils/sound';

interface WindowSystemsSectionProps {
  onSelectWindowInStudio: (index: number) => void;
  onOpenCatalogue: () => void;
  currency: CurrencyCode;
}

export const WindowSystemsSection: React.FC<WindowSystemsSectionProps> = ({
  onSelectWindowInStudio,
  onOpenCatalogue,
  currency,
}) => {
  const [activeWindowIndex, setActiveWindowIndex] = useState(0);
  const [selectedTint, setSelectedTint] = useState<'clear-lowe' | 'bronze-solar' | 'charcoal-privacy' | 'smart-electrochromic'>('clear-lowe');

  const currentWindow = WINDOW_MODELS[activeWindowIndex];

  return (
    <section id="windows" className="py-24 bg-[#090b0e] border-b border-zinc-800 relative overflow-hidden">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#e4ff3a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-800/80 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-[#e4ff3a] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3a] animate-pulse" />
              <span>HIGH-PERFORMANCE GLAZING & SIGHTLINE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
              ARCHITECTURAL WINDOW SYSTEMS
            </h2>
            <p className="mt-2 text-zinc-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Engineered in unison with our grand entrance doors. From ultra-narrow 20mm panoramic sliding walls and monolithic 360° pivot glass to Passivhaus tilt-and-turn casements and motorized high-level sky clerestories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenCatalogue();
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Full Glazing Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#e4ff3a]" />
            </button>
          </div>
        </div>

        {/* 6 Window Systems Quick Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {WINDOW_MODELS.map((win, idx) => (
            <button
              key={win.id}
              onClick={() => {
                sound.playClick();
                setActiveWindowIndex(idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeWindowIndex === idx
                  ? 'bg-zinc-900 border-[#e4ff3a] text-white shadow-lg'
                  : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1 flex items-center justify-between">
                <span>0{idx + 1}</span>
                <span className="text-[#e4ff3a] uppercase font-bold text-[9px]">
                  {win.mechanism}
                </span>
              </div>
              <div className="font-heading font-bold text-xs truncate text-white">{win.name}</div>
              <div className="mt-1 text-[11px] font-mono text-zinc-400">
                {formatPrice(win.basePriceAUD, currency)}
              </div>
            </button>
          ))}
        </div>

        {/* Active Window Feature Stage & Technical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Architectural Showcase & Mechanism Preview */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-[#e4ff3a] uppercase">
                  {currentWindow.mechanism} system • {currentWindow.specs.sightline}
                </span>
                <span className="text-xl font-mono font-bold text-[#e4ff3a]">
                  Starting at {formatPrice(currentWindow.basePriceAUD, currency)}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-2">
                {currentWindow.name}
              </h3>
              <p className="text-sm font-mono text-zinc-300 mb-4">{currentWindow.subtitle}</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">{currentWindow.description}</p>

              {/* Glass Coating & Tint Selector for this showcase */}
              <div className="mb-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <div className="text-xs font-mono text-zinc-300 font-bold mb-2 flex items-center justify-between">
                  <span>SELECT ARCHITECTURAL GLASS BUILD:</span>
                  <span className="text-[#e4ff3a] text-[11px]">
                    {GLASS_TINT_OPTIONS.find((t) => t.id === selectedTint)?.shortLabel}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GLASS_TINT_OPTIONS.map((tint) => (
                    <button
                      key={tint.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedTint(tint.id);
                      }}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                        selectedTint === tint.id
                          ? 'border-[#e4ff3a] bg-zinc-800 text-white'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: tint.previewColor }}
                        />
                        <span className="text-[10px] font-mono font-bold truncate">{tint.shortLabel}</span>
                      </div>
                      <div className="text-[9px] text-zinc-400">{tint.lightTransmittance}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Glass Performance Visual Spec */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800/80 font-mono text-xs text-zinc-300 mb-6">
                <div className="text-[11px] text-zinc-400 mb-1">ACOUSTIC & THERMAL MULTI-PANE COMPOSITION:</div>
                <div className="text-zinc-200 text-xs">{currentWindow.specs.glassComposition}</div>
              </div>
            </div>

            {/* Launch into 3D Studio Action Button */}
            <div className="relative z-10 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-zinc-400">
                <span>Certified Warranty: </span>
                <span className="text-white font-bold">{currentWindow.specs.warranty}</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectWindowInStudio(activeWindowIndex);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#e4ff3a] hover:bg-[#d6f030] text-black font-bold font-mono text-xs uppercase tracking-wider transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Launch in 3D Studio</span>
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Key Laboratory Benchmark Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* 1. Thermal Insulation Passivhaus Benchmark */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#e4ff3a]">
                <Sun className="w-4 h-4" />
                <span className="font-bold">THERMAL TRANSMITTANCE (U-VALUE)</span>
              </div>
              <div className="text-2xl font-mono font-bold text-white mb-1">
                {currentWindow.specs.thermalRating.split(' ')[0]}{' '}
                {currentWindow.specs.thermalRating.split(' ')[1]}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {currentWindow.specs.thermalRating} — continuous polyamide thermal isolators prevent exterior summer heat or winter cold conduction.
              </p>
            </div>

            {/* 2. Acoustic Decibel Damper */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400">
                <Volume2 className="w-4 h-4" />
                <span className="font-bold">ACOUSTIC DAMPING CHAMBER</span>
              </div>
              <div className="text-2xl font-mono font-bold text-white mb-1">
                {currentWindow.specs.acousticRating.split(' ')[0]} dB
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {currentWindow.specs.acousticRating} — acoustic PVB silence interlayers silence freeway traffic, heavy rainfall, and urban commotion.
              </p>
            </div>

            {/* 3. Cyclone & Hurricane Windload Endurance */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-amber-400">
                <Wind className="w-4 h-4" />
                <span className="font-bold">HURRICANE & CYCLONE WINDLOAD</span>
              </div>
              <div className="text-lg font-mono font-bold text-white mb-1">
                {currentWindow.specs.windResistance}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tested to 3,000 Pa cyclic positive and negative pressure to endure high-altitude and coastal cliff exposure without deflection.
              </p>
            </div>

            {/* 4. Watertightness & Security */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Air & Water Standard</div>
                <div className="text-sm font-mono font-bold text-zinc-200">
                  {currentWindow.specs.airTightness.split(' ')[0]} / {currentWindow.specs.waterTightness.split(' ')[0]}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Security Rating</div>
                <div className="text-sm font-mono font-bold text-[#e4ff3a]">
                  {currentWindow.specs.securityClass.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
