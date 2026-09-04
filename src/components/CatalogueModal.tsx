import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle2, Shield, Eye, Layers, DoorClosed, AppWindow } from 'lucide-react';
import { DOOR_MODELS, formatPrice } from '../data/doors';
import { WINDOW_MODELS } from '../data/windows';
import { CurrencyCode } from '../types';
import { sound } from '../utils/sound';

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoorModel: (index: number) => void;
  onSelectWindowModel?: (index: number) => void;
  currency?: CurrencyCode;
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({
  isOpen,
  onClose,
  onSelectDoorModel,
  onSelectWindowModel,
  currency = 'AUD',
}) => {
  const [filter, setFilter] = useState<'all' | 'doors' | 'windows'>('all');

  const downloadLookbook = () => {
    sound.playClick();
    const lines = [
      'PORTALUX ARCHITECTURAL LOOKBOOK 2026',
      'Entrances & Window Systems',
      'https://portalux-original.vercel.app/',
      '',
      'GRAND ENTRANCE DOORS',
      ...DOOR_MODELS.map((m) => `- ${m.name} | ${m.subtitle} | from ${formatPrice(m.basePriceAUD, currency)} | ${m.specs.warranty}`),
      '',
      'WINDOW SYSTEMS',
      ...WINDOW_MODELS.map((m) => `- ${m.name} | ${m.subtitle} | from ${formatPrice(m.basePriceAUD, currency)}`),
      '',
      'Lead times: Melbourne 6-8 wks · Dubai 7-9 wks · Karachi 8-10 wks',
      'Concierge: concierge@portalux.design | 1800 840 366',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PORTALUX-Architectural-Lookbook-2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }} className="bg-[#121418] border border-zinc-700 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
              <div>
                <span className="text-xs font-mono uppercase text-[#e4ff3a] tracking-wider">2026 Architectural Master Volume & Sizing Dossier</span>
                <h3 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mt-1">PORTALUX ENTRANCES & WINDOW SYSTEMS</h3>
              </div>
              <button type="button" onClick={() => { sound.playClick(); onClose(); }} className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 sm:px-8 py-3 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto">
              <button type="button" onClick={() => { sound.playClick(); setFilter('all'); }} className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${filter === 'all' ? 'bg-[#e4ff3a] text-black shadow' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}>All Systems ({DOOR_MODELS.length + WINDOW_MODELS.length})</button>
              <button type="button" onClick={() => { sound.playClick(); setFilter('doors'); }} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${filter === 'doors' ? 'bg-[#e4ff3a] text-black shadow' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}><DoorClosed className="w-3.5 h-3.5" /><span>Doors ({DOOR_MODELS.length})</span></button>
              <button type="button" onClick={() => { sound.playClick(); setFilter('windows'); }} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${filter === 'windows' ? 'bg-[#e4ff3a] text-black shadow' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}><AppWindow className="w-3.5 h-3.5" /><span>Windows ({WINDOW_MODELS.length})</span></button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              <div className="bg-[#181b20] border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading text-2xl text-white">Full Architectural Lookbook</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-md">Models, indicative pricing, warranty and city lead times — downloads as a dossier you can forward to the architect.</p>
                </div>
                <button type="button" onClick={downloadLookbook} className="px-5 py-2.5 rounded-full bg-[#e4ff3a] hover:bg-[#d5f02f] text-black font-heading text-lg font-bold flex items-center gap-2 cursor-pointer shrink-0">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
              {(filter === 'all' || filter === 'doors') && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4 flex items-center gap-2"><DoorClosed className="w-4 h-4 text-[#e4ff3a]" /><span>GRAND ENTRANCE DOORS:</span></h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {DOOR_MODELS.map((m, idx) => (
                      <div key={m.id} onClick={() => { sound.playClick(); onSelectDoorModel(idx); onClose(); }} className="bg-zinc-900/90 border border-zinc-800 hover:border-[#e4ff3a] rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-heading text-2xl text-white group-hover:text-[#e4ff3a] transition-colors">{m.name}</span>
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: m.primaryColor }} />
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{m.subtitle}</p>
                        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#e4ff3a] font-bold">{formatPrice(m.basePriceAUD, (currency as CurrencyCode) || 'AUD')}</span>
                          <span className="text-zinc-300">Inspect 3D →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(filter === 'all' || filter === 'windows') && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4 flex items-center gap-2"><AppWindow className="w-4 h-4 text-[#e4ff3a]" /><span>ARCHITECTURAL WINDOW SYSTEMS & GLAZING:</span></h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {WINDOW_MODELS.map((w, idx) => (
                      <div key={w.id} onClick={() => { sound.playClick(); if (onSelectWindowModel) onSelectWindowModel(idx); onClose(); }} className="bg-zinc-900/90 border border-zinc-800 hover:border-[#e4ff3a] rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 group">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-heading text-2xl text-white group-hover:text-[#e4ff3a] transition-colors">{w.name}</span>
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: w.primaryColor }} />
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{w.subtitle}</p>
                        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#e4ff3a] font-bold">{formatPrice(w.basePriceAUD, (currency as CurrencyCode) || 'AUD')}</span>
                          <span className="text-zinc-300">Inspect 3D →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
