import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Shield, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

import villaImg from '../assets/images/modern_villa_door_1788512590823.jpg';
import detailImg from '../assets/images/door_detail_facade_1788512606170.jpg';

interface ModernDoorsSectionProps {
  onOpenCatalogue: () => void;
  onScrollToStudio: () => void;
}

export const ModernDoorsSection: React.FC<ModernDoorsSectionProps> = ({
  onOpenCatalogue,
  onScrollToStudio,
}) => {
  return (
    <section id="modern-doors" className="relative bg-[#ffffff] text-[#121417] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        {/* Architectural Villa Showcase Cards from Video */}
        <div className="relative mb-16">
          {/* Main Primary Modern House Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 aspect-[16/9] sm:aspect-[21/9] max-h-[500px]"
          >
            <img
              src={villaImg}
              alt="Contemporary Modern Architecture with Bespoke Aluminium Entrance"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Subtle architectural overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            {/* Badges on image */}
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                Toorak Pavilion Residence • Custom Brighton System
              </span>
            </div>
          </motion.div>

          {/* Floating Detail Thumbnail 1 (Top Right matching video layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block absolute -top-8 -right-4 w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
          >
            <img
              src={detailImg}
              alt="Aluminium Door Facade Detail"
              className="w-full h-36 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-2.5 bg-zinc-900 text-white flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-300">Precision Flutes</span>
              <span className="text-[10px] font-mono text-[#e4ff3a]">3mm Sheet</span>
            </div>
          </motion.div>

          {/* Floating Detail Thumbnail 2 (Bottom Left matching video layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden sm:block absolute -bottom-8 -left-4 w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white"
          >
            <div className="p-4 bg-[#14161a] text-white">
              <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase">RC3 Certified</span>
              </div>
              <p className="text-xs text-zinc-300 font-medium leading-snug">
                German multi-point hook locking tested to 5,000 N pry force.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Text & Content matching video */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl sm:text-6xl font-extrabold tracking-wide text-zinc-950 uppercase"
          >
            MODERN CONTEMPORARY DOORS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-700 text-sm sm:text-base sm:leading-relaxed mt-4 font-normal"
          >
            We are dedicated to making your home look its best with our premium aluminium entrance doors.
            Combining contemporary design with robust engineering, we bring innovation, customisation,
            and unmatched quality to every entrance, ensuring your home exudes prestige and security.
          </motion.p>

          {/* Action Buttons matching video layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {/* LEARN MORE Button */}
            <button
              onClick={() => {
                sound.playClick();
                onScrollToStudio();
              }}
              className="px-8 py-3 rounded-full bg-[#181a1d] hover:bg-[#272b30] text-white font-heading text-xl sm:text-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg flex items-center gap-2"
            >
              <span>LEARN MORE</span>
            </button>

            {/* CATALOGUE Button (Electric Yellow pill from video) */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCatalogue();
              }}
              className="px-8 py-3 rounded-full bg-[#e4ff3a] hover:bg-[#d5f02f] text-black font-heading text-xl sm:text-2xl font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(228,255,58,0.4)] flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-black" />
              <span>CATALOGUE</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
