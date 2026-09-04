import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  SunMedium,
  RotateCw,
  Eye,
  Sliders,
  Sparkles,
  Compass,
  Layers,
  DoorClosed,
  AppWindow,
} from 'lucide-react';
import {
  DoorModel,
  WindowModel,
  HandleOption,
  WindowHandleOption,
  LightingAtmosphere,
  CameraView,
  CurrencyCode,
  ProductCategory,
  GlassTint,
} from '../types';
import { Door3DViewer } from './Door3DViewer';
import { Window3DViewer } from './Window3DViewer';
import { formatPrice } from '../data/doors';
import { GLASS_TINT_OPTIONS } from '../data/windows';
import { sound } from '../utils/sound';

interface SpotlightStudioProps {
  category: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  // Doors
  models: DoorModel[];
  activeModelIndex: number;
  onSelectModelIndex: (index: number) => void;
  selectedColor: string;
  onSelectColor: (colorHex: string) => void;
  activeHandle: HandleOption;
  opening: 'left' | 'right';
  isOpen: boolean;
  onToggleOpen: () => void;
  // Windows
  windowModels: WindowModel[];
  activeWindowIndex: number;
  onSelectWindowIndex: (index: number) => void;
  selectedWindowColor: string;
  onSelectWindowColor: (colorHex: string) => void;
  activeWindowHardware: WindowHandleOption;
  selectedGlassTint: GlassTint;
  onSelectGlassTint: (tint: GlassTint) => void;
  windowIsOpen: boolean;
  onToggleWindowOpen: () => void;
  // Global Studio Controls
  lightIntensity: number;
  onChangeLightIntensity: (val: number) => void;
  currency: CurrencyCode;
  onOpenSpecs: () => void;
  onOpenQuote: () => void;
}

export const SpotlightStudio: React.FC<SpotlightStudioProps> = ({
  category,
  onSelectCategory,
  models,
  activeModelIndex,
  onSelectModelIndex,
  selectedColor,
  onSelectColor,
  activeHandle,
  opening,
  isOpen,
  onToggleOpen,
  windowModels,
  activeWindowIndex,
  onSelectWindowIndex,
  selectedWindowColor,
  onSelectWindowColor,
  activeWindowHardware,
  selectedGlassTint,
  onSelectGlassTint,
  windowIsOpen,
  onToggleWindowOpen,
  lightIntensity,
  onChangeLightIntensity,
  currency,
  onOpenSpecs,
  onOpenQuote,
}) => {
  const [showDimmerSlider, setShowDimmerSlider] = useState(false);
  const [atmosphere, setAtmosphere] = useState<LightingAtmosphere>('studio');
  const [cameraView, setCameraView] = useState<CameraView>('front');

  const isDoorMode = category === 'doors';
  const currentDoor = models[activeModelIndex];
  const currentWindow = windowModels[activeWindowIndex];

  const currentItem = isDoorMode ? currentDoor : currentWindow;
  const currentPrice = currentItem.basePriceAUD;

  const handlePrev = () => {
    sound.playClick();
    if (isDoorMode) {
      const nextIdx = (activeModelIndex - 1 + models.length) % models.length;
      onSelectModelIndex(nextIdx);
    } else {
      const nextIdx = (activeWindowIndex - 1 + windowModels.length) % windowModels.length;
      onSelectWindowIndex(nextIdx);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (isDoorMode) {
      const nextIdx = (activeModelIndex + 1) % models.length;
      onSelectModelIndex(nextIdx);
    } else {
      const nextIdx = (activeWindowIndex + 1) % windowModels.length;
      onSelectWindowIndex(nextIdx);
    }
  };

  const normLight = lightIntensity / 100;

  // Atmosphere ambiance configuration
  const getAtmosphereStyles = () => {
    switch (atmosphere) {
      case 'golden':
        return {
          bg: `radial-gradient(circle at 50% 30%, rgba(245, 158, 11, ${0.12 * normLight}) 0%, rgba(120, 53, 15, ${0.3 * normLight}) 40%, #07080a 80%)`,
          cone: 'conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0) 150deg, rgba(251, 191, 36, 0.22) 175deg, rgba(253, 230, 138, 0.25) 180deg, rgba(251, 191, 36, 0.22) 185deg, rgba(255,255,255,0) 210deg)',
          pedestalRing: '#fbbf24',
        };
      case 'daylight':
        return {
          bg: `radial-gradient(circle at 50% 30%, rgba(186, 230, 253, ${0.12 * normLight}) 0%, rgba(30, 41, 59, ${0.4 * normLight}) 40%, #07080a 80%)`,
          cone: 'conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0) 150deg, rgba(224, 242, 254, 0.2) 175deg, rgba(255, 255, 255, 0.25) 180deg, rgba(224, 242, 254, 0.2) 185deg, rgba(255,255,255,0) 210deg)',
          pedestalRing: '#38bdf8',
        };
      case 'night':
        return {
          bg: `radial-gradient(circle at 50% 30%, rgba(99, 102, 241, ${0.08 * normLight}) 0%, rgba(15, 23, 42, ${0.5 * normLight}) 40%, #050608 85%)`,
          cone: 'conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0) 160deg, rgba(165, 180, 252, 0.12) 178deg, rgba(199, 210, 254, 0.16) 180deg, rgba(165, 180, 252, 0.12) 182deg, rgba(255,255,255,0) 200deg)',
          pedestalRing: '#818cf8',
        };
      case 'studio':
      default:
        return {
          bg: `radial-gradient(circle at 50% 30%, rgba(228, 255, 58, ${0.07 * normLight}) 0%, rgba(15, 23, 42, ${0.4 * normLight}) 40%, #07080a 80%)`,
          cone: 'conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0) 150deg, rgba(254, 240, 138, 0.14) 175deg, rgba(255, 255, 255, 0.2) 180deg, rgba(254, 240, 138, 0.14) 185deg, rgba(255,255,255,0) 210deg)',
          pedestalRing: '#e4ff3a',
        };
    }
  };

  const atm = getAtmosphereStyles();

  return (
    <section
      id="studio"
      className="relative min-h-[94vh] sm:min-h-screen bg-[#07080a] flex flex-col justify-between pt-20 sm:pt-24 pb-8 overflow-hidden select-none"
    >
      {/* Background Radial Glow & Shadow Ambiance */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: atm.bg }}
      />

      {/* Top Controls Bar: Category Mode Switcher (Doors vs Windows) in Top Center */}
      <div className="absolute top-24 sm:top-26 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/95 border border-zinc-700 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('doors');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
              category === 'doors'
                ? 'bg-[#e4ff3a] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <DoorClosed className="w-3.5 h-3.5" />
            <span>Grand Doors ({models.length})</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onSelectCategory('windows');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
              category === 'windows'
                ? 'bg-[#e4ff3a] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <AppWindow className="w-3.5 h-3.5" />
            <span>Windows & Glazing ({windowModels.length})</span>
          </button>
        </div>
      </div>

      {/* Camera View Switcher (Top Left) */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-8 z-40 hidden md:flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/95 border border-zinc-700 backdrop-blur-md shadow-xl text-xs font-mono">
        <button
          onClick={() => {
            sound.playClick();
            setCameraView('front');
          }}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            cameraView === 'front' ? 'bg-[#e4ff3a] text-black font-bold' : 'text-zinc-300 font-semibold hover:text-white'
          }`}
        >
          0° Elevation
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setCameraView('perspective');
          }}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            cameraView === 'perspective' ? 'bg-[#e4ff3a] text-black font-bold' : 'text-zinc-300 font-semibold hover:text-white'
          }`}
        >
          20° Perspective
        </button>
      </div>

      {/* Hanging Pendant Lamp at Top */}
      <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <div className="w-[1.5px] h-10 sm:h-16 bg-gradient-to-b from-zinc-700 to-zinc-900" />
        <div className="relative">
          <div
            className="w-28 sm:w-36 h-12 sm:h-14 bg-gradient-to-b from-[#181a1d] via-[#111214] to-[#0a0b0d] rounded-t-full border-t border-white/20 shadow-2xl flex items-end justify-center"
            style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
          >
            <div
              className="w-16 sm:w-20 h-3 rounded-b-full transition-all duration-300"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${0.85 * normLight})`,
                boxShadow: `0 4px ${30 * normLight}px ${atm.pedestalRing}`,
              }}
            />
          </div>

          {/* Volumetric Spotlight Cone */}
          <div
            className="absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-[550px] sm:h-[650px] pointer-events-none transition-all duration-500"
            style={{
              opacity: normLight,
              background: atm.cone,
              filter: 'blur(10px)',
            }}
          />
        </div>
      </div>

      {/* Floating Dimmer Button & Atmosphere Picker (Top Right) */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 z-40 flex flex-col items-end gap-2.5">
        <div className="flex items-center gap-2">
          {/* Atmosphere Preset Dropdown */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-zinc-900/95 border border-zinc-700 backdrop-blur-md shadow-xl text-[11px] font-mono">
            {(['studio', 'golden', 'daylight', 'night'] as LightingAtmosphere[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  sound.playLightSwitch();
                  setAtmosphere(mode);
                }}
                className={`px-2.5 py-1 rounded-full capitalize transition-all cursor-pointer ${
                  atmosphere === mode ? 'bg-white text-black font-bold shadow' : 'text-zinc-300 font-medium hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              sound.playLightSwitch();
              setShowDimmerSlider(!showDimmerSlider);
            }}
            className={`w-11 h-11 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xl ${
              showDimmerSlider
                ? 'bg-[#e4ff3a] text-black border-[#e4ff3a] shadow-[0_0_15px_rgba(228,255,58,0.5)]'
                : 'bg-zinc-900/95 text-zinc-200 border-zinc-700 hover:border-zinc-400'
            }`}
            title="Adjust Studio Lighting Intensity"
          >
            {normLight > 0.5 ? <Sun className="w-5 h-5" /> : <SunMedium className="w-5 h-5" />}
          </button>
        </div>

        {/* Vertical Dimmer Slider */}
        <AnimatePresence>
          {showDimmerSlider && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 rounded-2xl p-3 shadow-2xl flex flex-col items-center gap-3 w-12"
            >
              <span className="text-[10px] font-mono text-zinc-300 font-bold">
                {lightIntensity}%
              </span>
              <div className="h-32 flex items-center justify-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => onChangeLightIntensity(Number(e.target.value))}
                  className="accent-[#e4ff3a] cursor-pointer h-28 w-2 -rotate-90 origin-center"
                />
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: atm.pedestalRing, boxShadow: `0 0 6px ${atm.pedestalRing}` }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center Studio Area: Parallax Title + Carousel + 3D Model + Pedestal */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center px-4 mt-8 sm:mt-12">
        {/* Giant Architectural Name Typography across background */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-center w-full px-4"
            >
              <span
                className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-extrabold tracking-widest uppercase transition-all duration-500 block leading-none text-white/[0.10]"
                style={{
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.25)',
                  textShadow: `0 0 ${20 * normLight}px rgba(228, 255, 58, ${0.12 * normLight})`,
                }}
              >
                {currentItem.name}
              </span>
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-zinc-300 font-bold mt-2 block">
                {currentItem.subtitle}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute inset-x-2 sm:inset-x-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={handlePrev}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#e4ff3a] text-white hover:text-black border border-white/10 hover:border-[#e4ff3a] flex items-center justify-center transition-all duration-200 pointer-events-auto backdrop-blur-md cursor-pointer shadow-2xl group"
            title={`Previous ${isDoorMode ? 'Door' : 'Window'} Model`}
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#e4ff3a] text-white hover:text-black border border-white/10 hover:border-[#e4ff3a] flex items-center justify-center transition-all duration-200 pointer-events-auto backdrop-blur-md cursor-pointer shadow-2xl group"
            title={`Next ${isDoorMode ? 'Door' : 'Window'} Model`}
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Interactive 3D Model Representation */}
        <div className="relative z-20 my-auto">
          <AnimatePresence mode="wait">
            {isDoorMode ? (
              <motion.div
                key={currentDoor.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <Door3DViewer
                  model={currentDoor}
                  color={selectedColor || currentDoor.primaryColor}
                  handle={activeHandle}
                  opening={opening}
                  isOpen={isOpen}
                  onToggleOpen={onToggleOpen}
                  lightIntensity={lightIntensity}
                  cameraView={cameraView}
                />
              </motion.div>
            ) : (
              <motion.div
                key={currentWindow.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <Window3DViewer
                  model={currentWindow}
                  color={selectedWindowColor || currentWindow.primaryColor}
                  hardware={activeWindowHardware}
                  glassTint={selectedGlassTint}
                  isOpen={windowIsOpen}
                  onToggleOpen={onToggleWindowOpen}
                  lightIntensity={lightIntensity}
                  cameraView={cameraView}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floor Pedestal & Luminous Ring */}
          <div className="relative -mt-6 sm:-mt-8 flex justify-center items-center pointer-events-none z-10">
            <div
              className="w-[380px] sm:w-[520px] h-20 sm:h-28 rounded-[100%] transition-all duration-300"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 20%, rgba(15,23,42,0.6) 60%, transparent 80%)',
              }}
            />
            <div
              className="absolute w-[320px] sm:w-[440px] h-14 sm:h-20 rounded-[100%] border transition-all duration-300"
              style={{
                borderColor: atm.pedestalRing,
                boxShadow: `0 0 ${25 * normLight}px ${atm.pedestalRing}66, inset 0 0 ${15 * normLight}px ${atm.pedestalRing}44`,
              }}
            />
          </div>
        </div>

        {/* Stage Floating Quick Bar (Color swatches & Open trigger) */}
        <div className="relative z-30 mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Quick Color Swatches */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-zinc-700 backdrop-blur-md shadow-md">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-200 font-bold mr-1 hidden sm:inline">
              Frame Finish
            </span>
            {(isDoorMode ? currentDoor.availableColors : currentWindow.availableColors).map((col) => {
              const activeColor = isDoorMode ? selectedColor : selectedWindowColor;
              const isSelected = activeColor === col.hex;
              return (
                <button
                  key={col.name}
                  onClick={() => {
                    sound.playClick();
                    if (isDoorMode) {
                      onSelectColor(col.hex);
                    } else {
                      onSelectWindowColor(col.hex);
                    }
                  }}
                  title={col.name}
                  className={`w-6 h-6 rounded-full border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#e4ff3a] scale-110 ring-2 ring-[#e4ff3a]/70 shadow-[0_0_8px_#e4ff3a]'
                      : 'border-zinc-500 hover:border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
              );
            })}
          </div>

          {/* Quick Open/Kinematics Button */}
          {isDoorMode ? (
            <button
              onClick={() => {
                sound.playClick();
                onToggleOpen();
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/95 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-400 text-xs font-semibold text-zinc-100 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-md"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#e4ff3a]" />
              <span>{isOpen ? 'Close Door Leaf' : 'Swing Open (3D)'}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onToggleWindowOpen();
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/95 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-400 text-xs font-semibold text-zinc-100 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-md"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#e4ff3a]" />
              <span>
                {windowIsOpen
                  ? 'Close Window'
                  : currentWindow.mechanism === 'slider'
                  ? 'Slide Open (3D)'
                  : currentWindow.mechanism === 'pivot'
                  ? 'Pivot 360° (3D)'
                  : currentWindow.mechanism === 'bifold'
                  ? 'Concertina Fold'
                  : 'Open Casement (3D)'}
              </span>
            </button>
          )}

          {/* Glass Tint Switcher if in Window mode */}
          {!isDoorMode && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/95 border border-zinc-700 backdrop-blur-md shadow-md">
              <span className="text-[10px] font-mono uppercase text-zinc-400 mr-1 hidden md:inline">
                Glass:
              </span>
              {GLASS_TINT_OPTIONS.map((tint) => (
                <button
                  key={tint.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectGlassTint(tint.id);
                  }}
                  title={`${tint.name} (${tint.lightTransmittance})`}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                    selectedGlassTint === tint.id
                      ? 'bg-[#e4ff3a] text-black font-bold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {tint.shortLabel}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Model Carousel Indicator Tabs */}
      <div className="relative z-30 mt-4 flex items-center justify-center gap-2 flex-wrap px-4">
        {isDoorMode
          ? models.map((m, idx) => {
              const isCurrent = idx === activeModelIndex;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectModelIndex(idx);
                  }}
                  className={`px-3.5 py-1 rounded-full text-xs font-heading tracking-wider uppercase transition-all duration-200 cursor-pointer font-bold ${
                    isCurrent
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : 'bg-zinc-900/95 text-zinc-200 hover:text-white border border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {m.name}
                </button>
              );
            })
          : windowModels.map((w, idx) => {
              const isCurrent = idx === activeWindowIndex;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectWindowIndex(idx);
                  }}
                  className={`px-3.5 py-1 rounded-full text-xs font-heading tracking-wider uppercase transition-all duration-200 cursor-pointer font-bold ${
                    isCurrent
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : 'bg-zinc-900/95 text-zinc-200 hover:text-white border border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {w.name}
                </button>
              );
            })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="relative z-30 mt-6 max-w-xl mx-auto w-full px-4">
        <div className="flex items-center justify-center gap-3">
          {/* GET A QUOTE Button with Live Converted Base Price */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenQuote();
            }}
            className="flex-1 px-5 py-3 rounded-full bg-[#1c1f24] hover:bg-zinc-800 text-white font-heading text-lg sm:text-xl tracking-wider uppercase border border-zinc-700/80 transition-all duration-200 cursor-pointer shadow-lg active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <span>Get A Quote</span>
            <span className="text-xs font-mono text-[#e4ff3a] font-normal normal-case hidden sm:inline">
              ({formatPrice(currentPrice, currency)})
            </span>
          </button>

          {/* SPECIFICATIONS Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSpecs();
            }}
            className="flex-1 px-5 py-3 rounded-full bg-[#e4ff3a] hover:bg-[#d4ee30] text-black font-heading text-lg sm:text-xl font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(228,255,58,0.35)] active:scale-95 text-center"
          >
            Specifications
          </button>
        </div>
      </div>
    </section>
  );
};
