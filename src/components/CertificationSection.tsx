import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Thermometer, Volume2, Wind, Award, CheckCircle2, FileText, ChevronRight, X } from 'lucide-react';
import { PERFORMANCE_CERTIFICATIONS } from '../data/doors';
import { PerformanceCertification } from '../types';
import { sound } from '../utils/sound';

export const CertificationSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<PerformanceCertification | null>(null);

  const icons = [Thermometer, ShieldCheck, Volume2, Wind];

  return (
    <section id="certifications" className="relative bg-[#08090b] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#e4ff3a] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>GLOBAL TESTING STANDARDS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none">
            ENGINEERING ACCREDITATIONS & BENCHMARKS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Every PORTALUX architectural entrance is independently lab-tested and verified to surpass the strictest European and Australian building codes for extreme thermal efficiency, anti-burglary resistance, and weather tightness.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERFORMANCE_CERTIFICATIONS.map((cert, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={cert.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCert(cert);
                }}
                className="bg-[#111317] border border-zinc-800/80 hover:border-[#e4ff3a]/70 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/80 text-[#e4ff3a] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded uppercase">
                      {cert.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-[#e4ff3a] tracking-wider block">
                    {cert.standard}
                  </span>
                  <h3 className="font-heading text-2xl text-white mt-1 group-hover:text-zinc-100 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-sm font-mono font-bold text-white">
                    {cert.rating}
                  </div>
                  <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-[#e4ff3a] transition-colors">
                  <span>Tested by {cert.authority.split(' ')[0]}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Compliance Bar */}
        <div className="mt-8 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#e4ff3a] shrink-0" />
            <span>Compliant with Australian AS 2047, AS 4284, & AS 1288 Glazing Standards</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#e4ff3a] shrink-0" />
            <span>CE Marking & EU Construction Products Regulation (CPR) Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#e4ff3a] shrink-0" />
            <span>Qualicoat Seaside Class 2 Anodizing / Powder-Coating</span>
          </div>
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#14161a] border border-zinc-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#e4ff3a]">
                    <Award className="w-4 h-4" />
                    <span>OFFICIAL TEST SUMMARY</span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedCert(null);
                    }}
                    className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-heading text-3xl text-white">
                  {selectedCert.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Standard: <span className="text-white font-bold">{selectedCert.standard}</span>
                </p>

                <div className="my-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Official Rating:</span>
                    <span className="text-[#e4ff3a] font-bold text-sm">{selectedCert.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Accredited Laboratory:</span>
                    <span className="text-white">{selectedCert.authority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Test Procedure:</span>
                    <span className="text-white">Cyclic Pressure & Thermal Chamber</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedCert.description}
                </p>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => {
                      sound.playClick();
                      alert(`Downloading official test certificate: ${selectedCert.standard}-PORTALUX.pdf`);
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#e4ff3a] hover:bg-[#d5f02f] text-black font-heading text-lg font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Test Report</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
