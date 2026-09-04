import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowDown } from 'lucide-react';
import { sound } from '../utils/sound';

interface ExploreBannerProps {
  onExploreClick: () => void;
}

export const ExploreBanner: React.FC<ExploreBannerProps> = ({ onExploreClick }) => {
  return (
    <section className="relative py-20 bg-[#07080a] overflow-hidden text-center select-none border-t border-zinc-900">
      {/* Background Spotlight Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(228,255,58,0.05)_0%,transparent_70%)]" />

      {/* Hanging lamp hint at top */}
      <div className="w-20 h-6 mx-auto bg-[#181a1d] rounded-b-full border-t border-white/10 shadow-[0_4px_20px_rgba(228,255,58,0.2)] mb-8" />

      <div className="max-w-xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-5xl sm:text-7xl font-extrabold tracking-wide text-white"
        >
          WANNA SEE MORE?
        </motion.h2>

        <p className="text-zinc-400 text-sm sm:text-base mt-2 mb-8">
          Explore our complete catalogue of bespoke architectural pivots, sidelites, and flush modern entries.
        </p>

        {/* Explore Button matching video style */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onExploreClick();
            }}
            className="group px-8 py-3.5 rounded-full bg-[#15171a] hover:bg-[#e4ff3a] text-white hover:text-black border border-zinc-700 hover:border-[#e4ff3a] font-heading text-xl sm:text-2xl tracking-wider transition-all duration-300 cursor-pointer shadow-xl flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-[#e4ff3a] text-black group-hover:bg-black group-hover:text-[#e4ff3a] flex items-center justify-center transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <span>EXPLORE DOORS</span>
          </button>
        </div>

        {/* Pedestal Ring below button matching video */}
        <div className="relative mt-8 flex justify-center pointer-events-none">
          <div className="w-80 h-16 rounded-[100%] border border-[#e4ff3a]/40 shadow-[0_0_20px_rgba(228,255,58,0.25)]" />
        </div>
      </div>
    </section>
  );
};
