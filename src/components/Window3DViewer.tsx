import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WindowModel, WindowHandleOption, CameraView, GlassTint } from '../types';
import { GLASS_TINT_OPTIONS } from '../data/windows';
import { sound } from '../utils/sound';
import { Sparkles, Shield, Wind, Volume2, Eye } from 'lucide-react';

interface Window3DViewerProps {
  model: WindowModel;
  color: string;
  hardware: WindowHandleOption;
  glassTint: GlassTint;
  isOpen: boolean;
  onToggleOpen: () => void;
  lightIntensity: number;
  cameraView?: CameraView;
}

export const Window3DViewer: React.FC<Window3DViewerProps> = ({
  model,
  color,
  hardware,
  glassTint,
  isOpen,
  onToggleOpen,
  lightIntensity,
  cameraView = 'front',
}) => {
  const [smartGlassOpaque, setSmartGlassOpaque] = useState(false);
  const normLight = Math.max(0.15, lightIntensity / 100);

  // Camera perspective rotations
  let stageRotateY = 0;
  let stageRotateX = 0;
  let stageScale = 1;

  if (cameraView === 'perspective') {
    stageRotateY = -12;
    stageRotateX = 3;
  } else if (cameraView === 'detail') {
    stageRotateY = 16;
    stageScale = 1.06;
  }

  const selectedTintConfig =
    GLASS_TINT_OPTIONS.find((t) => t.id === glassTint) || GLASS_TINT_OPTIONS[0];

  // Mechanism-specific animations
  // Slider: X translation
  const sliderTranslateX = isOpen ? 110 : 0;
  // Pivot: Rotate around vertical center axis
  const pivotRotateY = isOpen ? 52 : 0;
  // Casement: Rotate Y around left hinge
  const casementRotateY = isOpen ? -58 : 0;
  // Crittall: French door twin swing
  const crittallRotateLeft = isOpen ? -48 : 0;
  const crittallRotateRight = isOpen ? 48 : 0;
  // Bi-fold: Concertina fold
  const bifoldTranslateX = isOpen ? 130 : 0;
  // Awning: Rotate X around top hinge
  const awningRotateX = isOpen ? -38 : 0;

  return (
    <motion.div
      animate={{
        rotateY: stageRotateY,
        rotateX: stageRotateX,
        scale: stageScale,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px] h-[480px] sm:h-[560px] md:h-[600px] mx-auto perspective-1200 flex items-center justify-center select-none"
    >
      {/* Background Volumetric Sunlight through Glass */}
      <div
        className="absolute inset-x-4 top-8 bottom-4 rounded-xl pointer-events-none transition-all duration-700 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, rgba(228, 255, 58, ${
            0.15 * normLight
          }) 0%, rgba(56, 189, 248, ${0.08 * normLight}) 45%, transparent 70%)`,
        }}
      >
        {/* Exterior Horizon Landscape Silhouette / Skylight */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-40">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 tracking-wider">
            <span>NATURAL PANORAMIC DAYLIGHT</span>
            <span>{model.specs.sightline}</span>
          </div>
          <div className="text-center pb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              Outdoor Horizon • {model.specs.windResistance}
            </span>
          </div>
        </div>
      </div>

      {/* Outer Structural Window Frame */}
      <div
        id="window-structural-frame"
        className="relative w-full h-full p-3 sm:p-4 rounded-lg border-4 shadow-2xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: '#0f1115',
          borderColor: color || model.frameColor || '#1c2024',
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.95), 0 0 ${
            40 * normLight
          }px rgba(56, 189, 248, ${0.12 * normLight})`,
        }}
      >
        {/* Top/Bottom Integrated Sub-Sill & Drainage Tracks */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-black/80 to-transparent border-b border-zinc-700/60" />
        <div className="absolute bottom-0 inset-x-0 h-3 bg-zinc-900 border-t border-zinc-700/80 flex items-center justify-around px-4">
          <span className="w-12 h-0.5 bg-zinc-700 rounded-full" />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">
            Flush In-Floor Threshold Drainage
          </span>
          <span className="w-12 h-0.5 bg-zinc-700 rounded-full" />
        </div>

        {/* ================= MECHANISM RENDERING ================= */}

        {/* 1. SLIDER (PANORAMA SLIM-50) */}
        {model.mechanism === 'slider' && (
          <div className="relative w-full h-full flex overflow-hidden rounded-md border border-zinc-800 bg-[#080a0d]">
            {/* Fixed Left Glass Panel (50% width) */}
            <div className="relative w-1/2 h-full border-r border-zinc-700/80 overflow-hidden flex flex-col justify-between p-3">
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  smartGlassOpaque ? 'bg-indigo-950/90 backdrop-blur-md' : selectedTintConfig.overlayClass
                }`}
              />
              {/* Glass Diagonal Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="relative z-10 text-[9px] font-mono text-zinc-400">
                FIXED STRUCTURAL LEAF
              </div>
              <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                <span>{selectedTintConfig.shortLabel}</span>
                <span>{model.specs.thermalRating.split(' ')[0]}</span>
              </div>
            </div>

            {/* Sliding Right Glass Panel (Can slide left/right) */}
            <motion.div
              animate={{ x: -sliderTranslateX }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              onClick={onToggleOpen}
              className="relative w-1/2 h-full cursor-pointer overflow-hidden flex flex-col justify-between p-3 border-2 border-zinc-700/80 shadow-2xl group"
              style={{
                backgroundColor: 'rgba(10, 15, 22, 0.7)',
              }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  smartGlassOpaque ? 'bg-indigo-950/90 backdrop-blur-md' : selectedTintConfig.overlayClass
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-white/5 pointer-events-none" />

              {/* Ultra-Slim Interlock Stile (20mm) */}
              <div
                className="absolute left-0 top-0 bottom-0 w-2.5 shadow-md flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <div className="w-0.5 h-16 bg-zinc-800 rounded-full" />
              </div>

              {/* Hardware / Pull Handle on Sliding Stile */}
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 px-1.5 py-3 rounded bg-zinc-900/90 border border-zinc-700 text-zinc-300 text-[9px] font-mono shadow-md group-hover:border-[#e4ff3a] transition-colors"
                title={`Hardware: ${hardware.name}`}
              >
                <div className="w-1 h-6 bg-zinc-400 rounded-full mx-auto mb-1 group-hover:bg-[#e4ff3a]" />
                <span className="text-[8px] font-bold">PULL</span>
              </div>

              <div className="relative z-10 text-[9px] font-mono text-[#e4ff3a] flex items-center justify-between">
                <span>SLIDING SASH</span>
                <span className="text-xs">{isOpen ? '◄ OPEN' : '► CLOSED'}</span>
              </div>

              <div className="relative z-10 text-[8px] font-mono text-zinc-400 text-right">
                <span>Stainless Micro-Rollers</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. PIVOT (LUMINA PIVOT-X) */}
        {model.mechanism === 'pivot' && (
          <div className="relative w-full h-full flex items-center justify-center perspective-1000 bg-[#080a0d] rounded-md border border-zinc-800 overflow-hidden">
            {/* Center Vertical Pivot Axis Indicator Line */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-zinc-700/60 border-dashed border-zinc-500 z-0 pointer-events-none" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[8px] font-mono text-amber-300 z-30">
              360° HYDRAULIC PIVOT AXIS
            </div>

            {/* Kinetic Pivot Window Sash */}
            <motion.div
              animate={{ rotateY: pivotRotateY }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              onClick={onToggleOpen}
              className="relative w-4/5 h-4/5 rounded border-4 shadow-2xl cursor-pointer flex flex-col justify-between p-4 group"
              style={{
                borderColor: color,
                backgroundColor: 'rgba(12, 16, 22, 0.75)',
                transformOrigin: '50% 50%',
              }}
            >
              <div
                className={`absolute inset-0 rounded transition-colors duration-500 ${
                  smartGlassOpaque ? 'bg-indigo-950/90 backdrop-blur-md' : selectedTintConfig.overlayClass
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

              {/* Architectural Pivot Lock Handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-900/90 border border-zinc-700 shadow-xl group-hover:border-[#e4ff3a] transition-colors">
                <div className="w-1.5 h-8 bg-zinc-300 rounded-full mx-auto group-hover:bg-[#e4ff3a]" />
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#e4ff3a] font-bold">LUMINA SASH</span>
                <span className="text-zinc-400">{isOpen ? 'ROTATED 52°' : 'HERMETIC SEAL'}</span>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span>{selectedTintConfig.name}</span>
                <span className="text-amber-300 font-bold">{model.specs.acousticRating}</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* 3. CASEMENT / TILT & TURN (VISTA SKYLINE) */}
        {model.mechanism === 'casement' && (
          <div className="relative w-full h-full flex items-center justify-center perspective-1000 bg-[#080a0d] rounded-md border border-zinc-800 overflow-hidden p-2">
            <motion.div
              animate={{ rotateY: casementRotateY }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              onClick={onToggleOpen}
              className="relative w-full h-full rounded border-4 shadow-2xl cursor-pointer flex flex-col justify-between p-4 group"
              style={{
                borderColor: color,
                backgroundColor: 'rgba(10, 14, 20, 0.75)',
                transformOrigin: 'left center',
              }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  smartGlassOpaque ? 'bg-indigo-950/90 backdrop-blur-md' : selectedTintConfig.overlayClass
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* German Multipoint Turn Handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 shadow-xl group-hover:border-[#e4ff3a]">
                <div className="w-2 h-7 bg-zinc-300 rounded group-hover:bg-[#e4ff3a]" />
                <span className="text-[7px] font-mono text-zinc-400 block text-center mt-1">TURN</span>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#e4ff3a] font-bold">GERMAN TILT & TURN</span>
                <span className="text-zinc-300">{isOpen ? 'OPEN 58°' : 'COMPRESSED'}</span>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span>Passive House Uw 0.68</span>
                <span>8-Point Cam Lock</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* 4. CRITTALL GRID (ATELIER CRITTALL-STEEL) */}
        {model.mechanism === 'crittall' && (
          <div className="relative w-full h-full flex bg-[#080a0d] rounded-md border border-zinc-800 overflow-hidden perspective-1000">
            {/* Left French Leaf */}
            <motion.div
              animate={{ rotateY: crittallRotateLeft }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              onClick={onToggleOpen}
              className="relative w-1/2 h-full border-r-2 cursor-pointer shadow-xl flex flex-col justify-between p-2 group"
              style={{
                borderColor: color,
                backgroundColor: 'rgba(12, 14, 18, 0.8)',
                transformOrigin: 'left center',
              }}
            >
              <div className={`absolute inset-0 ${selectedTintConfig.overlayClass}`} />
              {/* Muntin Grid Overlays (3x2 Panes) */}
              <div className="absolute inset-0 grid grid-rows-3 grid-cols-2 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-zinc-700/80 relative" />
                ))}
              </div>
              <div className="relative z-10 text-[9px] font-mono text-zinc-300">BAUHAUS STEEL</div>
              <div className="relative z-10 text-[8px] font-mono text-[#e4ff3a]">
                {isOpen ? 'SWUNG OPEN' : 'CLICK TO SWING'}
              </div>
            </motion.div>

            {/* Right French Leaf */}
            <motion.div
              animate={{ rotateY: crittallRotateRight }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              onClick={onToggleOpen}
              className="relative w-1/2 h-full border-l-2 cursor-pointer shadow-xl flex flex-col justify-between p-2 group"
              style={{
                borderColor: color,
                backgroundColor: 'rgba(12, 14, 18, 0.8)',
                transformOrigin: 'right center',
              }}
            >
              <div className={`absolute inset-0 ${selectedTintConfig.overlayClass}`} />
              {/* Muntin Grid Overlays */}
              <div className="absolute inset-0 grid grid-rows-3 grid-cols-2 pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border border-zinc-700/80 relative" />
                ))}
              </div>

              {/* Cremone Bolt Vertical Rod */}
              <div className="absolute left-2 top-2 bottom-2 w-1.5 bg-amber-600/80 rounded-full shadow-md flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
              </div>

              <div className="relative z-10 text-[9px] font-mono text-right text-zinc-300">
                CREMONE BOLT
              </div>
              <div className="relative z-10 text-[8px] font-mono text-right text-zinc-400">
                Acoustic 41 dB
              </div>
            </motion.div>
          </div>
        )}

        {/* 5. BI-FOLD (HORIZON BI-FOLD 80) */}
        {model.mechanism === 'bifold' && (
          <div className="relative w-full h-full flex bg-[#080a0d] rounded-md border border-zinc-800 overflow-hidden cursor-pointer" onClick={onToggleOpen}>
            {/* 3 Concertina Folding Leaves */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  x: isOpen ? idx * 25 : 0,
                  rotateY: isOpen ? (idx % 2 === 0 ? 42 : -42) : 0,
                }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                className="relative flex-1 h-full border-r border-zinc-700 flex flex-col justify-between p-2 overflow-hidden shadow-lg"
                style={{
                  borderColor: color,
                  backgroundColor: 'rgba(14, 17, 22, 0.75)',
                  transformOrigin: idx % 2 === 0 ? 'left center' : 'right center',
                }}
              >
                <div className={`absolute inset-0 ${selectedTintConfig.overlayClass}`} />
                <div className="relative z-10 text-[8px] font-mono text-zinc-400">PANEL 0{idx + 1}</div>
                {idx === 1 && (
                  <div className="relative z-10 text-center text-[9px] font-mono text-[#e4ff3a] font-bold">
                    {isOpen ? 'CONCERTINA FOLDED' : 'CONCERTINA CLOSED'}
                  </div>
                )}
                <div className="relative z-10 text-[8px] font-mono text-zinc-500">Flush Guide</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 6. AWNING / CLERESTORY (AERIS CLERESTORY) */}
        {model.mechanism === 'awning' && (
          <div className="relative w-full h-full flex items-center justify-center perspective-1000 bg-[#080a0d] rounded-md border border-zinc-800 overflow-hidden p-3">
            <motion.div
              animate={{ rotateX: awningRotateX }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              onClick={onToggleOpen}
              className="relative w-full h-4/5 rounded border-4 shadow-2xl cursor-pointer flex flex-col justify-between p-4 group"
              style={{
                borderColor: color,
                backgroundColor: 'rgba(12, 16, 22, 0.8)',
                transformOrigin: 'center top',
              }}
            >
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  smartGlassOpaque ? 'bg-indigo-950/90 backdrop-blur-md' : selectedTintConfig.overlayClass
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* Concealed Chain Actuator Arms at Bottom */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="w-1.5 h-6 bg-zinc-500 rounded-full group-hover:bg-[#e4ff3a] transition-colors" />
                <span className="text-[8px] font-mono text-zinc-400 uppercase">24V Motorized Chain</span>
                <div className="w-1.5 h-6 bg-zinc-500 rounded-full group-hover:bg-[#e4ff3a] transition-colors" />
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#e4ff3a] font-bold">TOP-HUNG AWNING</span>
                <span className="text-zinc-300">{isOpen ? 'TILTED OUT' : 'HERMETIC SHUT'}</span>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span>Rain Sensor Active</span>
                <span>KNX Automation</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Interactive Smart Glass Privacy Switch Button (Bottom Pill) */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/95 border border-zinc-700 shadow-xl font-mono text-[11px]">
        <button
          onClick={() => {
            sound.playClick();
            setSmartGlassOpaque(!smartGlassOpaque);
          }}
          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-colors ${
            smartGlassOpaque ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-200 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#e4ff3a]" />
          <span>{smartGlassOpaque ? 'Smart Privacy: Opaque Frost' : 'Smart Privacy: Transparent'}</span>
        </button>
      </div>
    </motion.div>
  );
};
