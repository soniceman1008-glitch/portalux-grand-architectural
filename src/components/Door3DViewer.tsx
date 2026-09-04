import React from 'react';
import { motion } from 'motion/react';
import { DoorModel, HandleOption, HotspotItem, CameraView } from '../types';
import { sound } from '../utils/sound';

interface Door3DViewerProps {
  model: DoorModel;
  color: string;
  handle: HandleOption;
  opening: 'left' | 'right';
  isOpen: boolean;
  onToggleOpen: () => void;
  lightIntensity: number; // 0 to 100
  cameraView?: CameraView;
  hotspots?: HotspotItem[];
  activeHotspotId?: string | null;
  onSelectHotspot?: (hotspot: HotspotItem) => void;
  showHotspots?: boolean;
}

export const Door3DViewer: React.FC<Door3DViewerProps> = ({
  model,
  color,
  handle,
  opening,
  isOpen,
  onToggleOpen,
  lightIntensity,
  cameraView = 'front',
  hotspots = [],
  activeHotspotId,
  onSelectHotspot,
  showHotspots = false,
}) => {
  const normLight = Math.max(0.15, lightIntensity / 100);
  const isLeftHinged = opening === 'left';

  // Hinged door rotation
  const swingAngle = isOpen ? (isLeftHinged ? -64 : 64) : 0;
  const hingeOrigin = isLeftHinged ? 'left center' : 'right center';

  // Camera perspective rotations based on selected view
  let stageRotateY = 0;
  let stageRotateX = 0;
  let stageScale = 1;

  if (cameraView === 'perspective') {
    stageRotateY = isLeftHinged ? 14 : -14;
    stageRotateX = 2;
  } else if (cameraView === 'detail') {
    stageRotateY = isLeftHinged ? 22 : -22;
    stageScale = 1.05;
  }

  return (
    <motion.div
      animate={{
        rotateY: stageRotateY,
        rotateX: stageRotateX,
        scale: stageScale,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] h-[520px] sm:h-[600px] md:h-[640px] mx-auto perspective-1200 flex items-center justify-center select-none"
    >
      {/* Interior Door Opening Glow (visible when open) */}
      <div
        className={`absolute inset-x-8 top-12 bottom-6 rounded-t-sm transition-opacity duration-500 pointer-events-none flex flex-col justify-end p-6 ${
          isOpen ? 'opacity-90' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(254, 240, 138, 0.28), rgba(254, 215, 170, 0.08) 60%, transparent)',
        }}
      >
        <div className="text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200/70">
            Interior Foyer / Thermal Separation Barrier
          </span>
        </div>
      </div>

      {/* Door Outer Perimeter Frame (Jamb & Threshold) */}
      <div
        className="relative w-full h-full p-3 sm:p-4 rounded-t-md border-t-4 border-x-4 border-b-2 shadow-2xl flex items-center justify-center transition-colors duration-300"
        style={{
          backgroundColor: '#15171a',
          borderColor: model.frameColor || '#23272c',
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 ${45 * normLight}px rgba(228, 255, 58, ${0.12 * normLight})`,
        }}
      >
        {/* Door Leaf (The actual swinging door) */}
        <motion.div
          animate={{
            rotateY: swingAngle,
          }}
          transition={{
            type: 'spring',
            stiffness: 110,
            damping: 18,
            mass: 1.2,
          }}
          style={{
            transformOrigin: hingeOrigin,
            transformStyle: 'preserve-3d',
            backgroundColor: color,
          }}
          onClick={() => {
            if (isOpen) {
              sound.playDoorClose();
            } else {
              sound.playDoorOpen();
            }
            onToggleOpen();
          }}
          className="relative w-full h-full rounded-t-sm shadow-2xl cursor-pointer group transform-style-3d border border-white/10 overflow-hidden"
        >
          {/* Surface Lighting & Specular Reflection Layer */}
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse 90% 60% at 50% 10%, rgba(255,255,255,${0.35 * normLight}) 0%, rgba(255,255,255,${0.08 * normLight}) 40%, rgba(0,0,0,${0.55 * (1.1 - normLight)}) 100%)`,
            }}
          />

          {/* Model-specific Surface Texture (Vertical Grooving / Fluting) */}
          {(model.texture === 'fluted' || model.texture === 'grooved') && (
            <div className="absolute inset-0 flex justify-between px-3 pointer-events-none opacity-40">
              {Array.from({ length: model.grooveLines || 14 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[1.5px] h-full bg-black/45 shadow-[0.5px_0_0_rgba(255,255,255,0.15)]"
                />
              ))}
            </div>
          )}

          {/* Geometric texture if Monaco */}
          {model.texture === 'geometric' && (
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 200">
                <path d="M 10,20 L 50,70 L 90,30" stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" fill="none" />
                <path d="M 10,20 L 50,70 L 90,30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" fill="none" transform="translate(0, 0.5)" />
                <path d="M 50,70 L 50,180" stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" fill="none" />
                <path d="M 10,120 L 50,160 L 90,110" stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          )}

          {/* Glazed Architectural Insert (Sorrento offset strip) */}
          {model.glassType === 'offset-strip' && (
            <div
              className={`absolute top-10 bottom-10 w-14 sm:w-16 rounded-xs overflow-hidden border border-black/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] transition-all ${
                isLeftHinged ? 'right-16 sm:right-20' : 'left-16 sm:left-20'
              }`}
              style={{
                background: 'linear-gradient(135deg, #111417 0%, #0d0e10 50%, #1e2227 100%)',
              }}
            >
              {/* Glass reflection beam */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(115deg, transparent 35%, rgba(255,255,255,${0.35 * normLight}) 45%, rgba(255,255,255,${0.08 * normLight}) 55%, transparent 65%)`,
                }}
              />
              <div className="absolute inset-0 border-x border-white/10" />
            </div>
          )}

          {/* Windsor central slit light column */}
          {model.glassType === 'tinted-slit' && (
            <div
              className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-8 sm:w-10 rounded-xs overflow-hidden border border-black/90 shadow-[inset_0_0_20px_rgba(0,0,0,0.95)]"
              style={{
                background: 'linear-gradient(180deg, #161a1e 0%, #0c0e10 50%, #1a1e23 100%)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,${0.25 * normLight}) 45%, transparent 60%)`,
                }}
              />
              <div className="h-full w-full flex flex-col justify-between py-12 items-center opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>
          )}

          {/* Door Handle & Lock System */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none ${
              isLeftHinged ? 'right-6 sm:right-8' : 'left-6 sm:left-8'
            }`}
          >
            {/* Handle Options Rendering */}
            {handle.type === 'bar-1200' && (
              <div
                className="relative w-3.5 sm:w-4 h-64 sm:h-72 rounded-sm shadow-[4px_10px_20px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(90deg, #d1d5db 0%, #ffffff 40%, #9ca3af 70%, #4b5563 100%)',
                }}
              >
                {/* Stand-offs / mounting brackets */}
                <div className="absolute -left-2 top-6 w-2.5 h-3 bg-zinc-600 rounded-l-xs shadow-inner" />
                <div className="absolute -left-2 bottom-6 w-2.5 h-3 bg-zinc-600 rounded-l-xs shadow-inner" />
                {/* Metallic shine */}
                <div
                  className="absolute inset-y-0 left-1 w-1 bg-white/60 blur-[0.5px]"
                  style={{ opacity: normLight }}
                />
              </div>
            )}

            {handle.type === 'bar-full' && (
              <div
                className="relative w-4 h-96 sm:h-[440px] rounded-sm shadow-[6px_12px_24px_rgba(0,0,0,0.8)]"
                style={{
                  background: 'linear-gradient(90deg, #18181b 0%, #3f3f46 45%, #27272a 75%, #09090b 100%)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div className="absolute -left-2 top-10 w-2.5 h-3 bg-zinc-700 rounded-l-xs" />
                <div className="absolute -left-2 bottom-10 w-2.5 h-3 bg-zinc-700 rounded-l-xs" />
                <div className="absolute inset-y-0 left-1 w-0.5 bg-white/30" />
              </div>
            )}

            {handle.type === 'curved' && (
              <div
                className="relative w-5 h-72 rounded-full shadow-[5px_12px_22px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(90deg, #e5e7eb 0%, #ffffff 50%, #9ca3af 100%)',
                }}
              >
                <div className="absolute -left-2 top-8 w-2.5 h-3 bg-zinc-500 rounded-l-xs" />
                <div className="absolute -left-2 bottom-8 w-2.5 h-3 bg-zinc-500 rounded-l-xs" />
              </div>
            )}

            {handle.type === 'round-knob' && (
              <div
                className="relative w-14 h-14 rounded-full shadow-[4px_8px_20px_rgba(0,0,0,0.8)] border border-white/20 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #9ca3af, #374151 60%, #111827 100%)',
                }}
              >
                <div className="w-4 h-4 rounded-full bg-zinc-900 shadow-inner border border-white/10" />
              </div>
            )}

            {handle.type === 'flat-lever' && (
              <div className="relative flex flex-col items-center">
                <div className="w-8 h-20 bg-zinc-900 border border-zinc-700 rounded-sm p-1 shadow-md flex flex-col items-center justify-between">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                  <div className="w-3 h-5 bg-zinc-700 rounded-sm" />
                </div>
                {/* Horizontal Lever */}
                <div
                  className="absolute top-2 left-4 w-16 h-3.5 rounded-r-md shadow-lg"
                  style={{
                    background: 'linear-gradient(180deg, #4b5563 0%, #1f2937 100%)',
                  }}
                />
              </div>
            )}

            {/* Smart Keyless Biometric Module / Lock Cylinder */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div
                className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center shadow-inner"
                title="Smart Biometric Fingerprint Sensor"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isOpen ? '#22c55e' : '#e4ff3a',
                    boxShadow: isOpen ? '0 0 6px #22c55e' : '0 0 6px #e4ff3a',
                  }}
                />
              </div>
              <div className="w-2.5 h-4 bg-zinc-800 border border-zinc-600 rounded-b-xs shadow-inner flex items-center justify-center">
                <div className="w-0.5 h-2 bg-black" />
              </div>
            </div>
          </div>

          {/* Door Edge Profile & Multi-Point Deadbolts (Visible when open) */}
          <div
            className={`absolute top-0 bottom-0 w-8 bg-[#202428] border-y border-zinc-700 shadow-2xl flex flex-col justify-between py-16 items-center transition-all ${
              isLeftHinged ? 'right-0' : 'left-0'
            }`}
            style={{
              transform: isLeftHinged ? 'rotateY(90deg) translateZ(4px)' : 'rotateY(-90deg) translateZ(4px)',
              transformOrigin: isLeftHinged ? 'right center' : 'left center',
              display: isOpen ? 'flex' : 'none',
            }}
          >
            {/* Top deadbolt */}
            <div className="w-4 h-5 bg-zinc-300 rounded-xs shadow-md border border-white/40" />
            {/* Center deadbolt */}
            <div className="w-4 h-5 bg-zinc-300 rounded-xs shadow-md border border-white/40" />
            {/* Bottom deadbolt */}
            <div className="w-4 h-5 bg-zinc-300 rounded-xs shadow-md border border-white/40" />
          </div>

          {/* Interactive Hotspots Layer */}
          {showHotspots && (
            <div className="absolute inset-0 z-30 pointer-events-auto">
              {hotspots.map((hs) => {
                const isActive = activeHotspotId === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                      onSelectHotspot?.(hs);
                    }}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer p-1.5 focus:outline-none"
                    title={hs.title}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full ${
                          isActive ? 'bg-[#e4ff3a] opacity-90 animate-ping' : 'bg-white/80 animate-hotspot'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-3 w-3 border ${
                          isActive
                            ? 'bg-[#e4ff3a] border-black shadow-[0_0_12px_#e4ff3a]'
                            : 'bg-white border-zinc-800'
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Hover Prompt Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            {isOpen ? 'Click to Latch Door' : 'Click to Swing Open (3D)'}
          </div>
        </motion.div>
      </div>

      {/* Threshold / Step at the bottom */}
      <div
        className="absolute -bottom-2 inset-x-2 h-3.5 rounded-sm bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 border-t border-white/30 shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-10"
      />
    </motion.div>
  );
};
