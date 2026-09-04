import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Layers,
  Sparkles,
  CheckCircle,
  Cpu,
  Flame,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { HOTSPOTS } from '../data/doors';
import { HotspotItem } from '../types';
import { sound } from '../utils/sound';

export const FeaturesHotspotsSection: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotItem>(HOTSPOTS[0]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const featureCards = [
    {
      title: 'DURABLE ALUMINIUM SHEETS',
      badge: '3.0mm Heavy Gauge',
      body: 'Each PORTALUX grand entrance features 3mm thick aerospace-grade aluminium sheets on both the front and back, providing unparalleled structural longevity and resistance to harsh coastal winds, UV radiation, and extreme weather.',
      icon: Layers,
    },
    {
      title: 'Thermally Broken Aluminium Profile',
      badge: 'Rockwool & Aerogel Core',
      body: 'Whilst the Thermally Broken Aluminium frames prevent heat and cold bridging, the structural core is filled with high-density rock wool, enhancing both thermal efficiency and acoustic privacy.',
      icon: Flame,
    },
    {
      title: 'PREMIUM HARDWARE',
      badge: 'European 3-Point System',
      body: 'We engineer precision 3D-adjustable hinges and 3-point European multi-locking hook mechanisms, ensuring fortress-grade security and frictionless tactile operation for decades.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="engineering" className="relative bg-[#090a0d] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 select-none overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e4ff3a]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e4ff3a]">
            Precision Architectural Engineering
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl text-white tracking-wide mt-2">
            WHY CHOOSE PORTALUX?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Click on the interactive component hotspots below to inspect how every millimeter of our entrance systems is engineered for extreme strength, thermal efficiency, and timeless modern aesthetics.
          </p>
        </div>

        {/* 3 Core Highlight Feature Cards matching video text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-[#121418] border border-zinc-800/80 hover:border-zinc-600 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-[#e4ff3a] border border-zinc-700">
                      {feat.badge}
                    </span>
                    <Icon className="w-5 h-5 text-zinc-500 group-hover:text-[#e4ff3a] transition-colors" />
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {feat.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Hotspots Door Showcase Stage (Exact match of video 01:08 - 01:18) */}
        <div className="bg-[#121418] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase text-[#e4ff3a]">Interactive Anatomy Explorer</span>
              <h3 className="font-heading text-3xl sm:text-4xl text-white tracking-wide">
                EXPLODED HARDWARE & PROFILE BREAKDOWN
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-[#e4ff3a] animate-ping" />
              <span>Click Hotspot Pins</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Door Representation with Glowing Interactive Hotspot Callout Pins */}
            <div className="lg:col-span-6 relative flex justify-center py-4">
              <div className="relative w-[280px] sm:w-[320px] h-[520px] bg-[#1a1d22] border-4 border-zinc-700 rounded-t-lg shadow-2xl p-3 overflow-hidden">
                {/* Vertical grooves */}
                <div className="absolute inset-0 flex justify-between px-3 pointer-events-none opacity-20">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="w-[1.5px] h-full bg-white" />
                  ))}
                </div>

                {/* Glazed slot */}
                <div className="absolute top-10 bottom-10 right-14 w-12 bg-black border border-white/10 rounded-xs shadow-inner" />

                {/* Pull Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 right-6 w-3 h-64 bg-gradient-to-r from-zinc-400 via-white to-zinc-500 rounded-xs shadow-xl" />

                {/* Door slightly open / hinged angle */}
                <div className="absolute inset-y-0 right-0 w-4 bg-[#23272d] border-l border-white/10 shadow-2xl" />

                {/* Hotspot Pins */}
                {HOTSPOTS.map((hs) => {
                  const isSelected = selectedHotspot.id === hs.id;
                  return (
                    <div
                      key={hs.id}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedHotspot(hs);
                        }}
                        className="relative flex items-center justify-center p-2 focus:outline-none cursor-pointer group"
                        title={hs.title}
                      >
                        <span
                          className={`absolute w-7 h-7 rounded-full transition-all ${
                            isSelected
                              ? 'bg-[#e4ff3a]/40 animate-ping'
                              : 'bg-white/20 group-hover:scale-125'
                          }`}
                        />
                        <span
                          className={`relative w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#e4ff3a] border-black shadow-[0_0_15px_#e4ff3a]'
                              : 'bg-white border-zinc-800 group-hover:bg-[#e4ff3a]'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        </span>
                      </button>

                      {/* Connection Callout Line if selected */}
                      {isSelected && (
                        <div className="hidden lg:block absolute left-5 top-2 w-16 h-[2px] bg-[#e4ff3a] shadow-[0_0_8px_#e4ff3a] pointer-events-none">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#e4ff3a]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hotspot Detailed Specifications Card */}
            <div className="lg:col-span-6 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHotspot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#181b20] border border-zinc-700/80 rounded-2xl p-6 sm:p-8 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#e4ff3a] bg-[#e4ff3a]/10 px-3 py-1 rounded-full border border-[#e4ff3a]/20">
                      {selectedHotspot.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Component Spec</span>
                  </div>

                  <h4 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mt-2">
                    {selectedHotspot.title}
                  </h4>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4">
                    {selectedHotspot.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-800 bg-[#121417] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#e4ff3a] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                        Technical Benchmark
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-white">
                        {selectedHotspot.techDetails}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quick Selectors for other hotspots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {HOTSPOTS.map((hs) => {
                  const isSelected = selectedHotspot.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedHotspot(hs);
                      }}
                      className={`text-left px-4 py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1e2227] border-[#e4ff3a] text-[#e4ff3a]'
                          : 'bg-[#14161a] border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <span className="truncate">{hs.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
