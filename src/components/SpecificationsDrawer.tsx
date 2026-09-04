import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Send,
  Sparkles,
  ShieldCheck,
  Thermometer,
  Volume2,
  Lock,
  Download,
  Fingerprint,
  Cpu,
  Layers,
  CheckCircle2,
  Wind,
  Sun,
  Eye,
  Sliders,
} from 'lucide-react';
import {
  DoorModel,
  WindowModel,
  HandleOption,
  WindowHandleOption,
  QuoteFormData,
  CurrencyCode,
  UnitSystem,
  ProductCategory,
  GlassTint,
} from '../types';
import { STANDARD_SIZES, formatPrice } from '../data/doors';
import { WINDOW_STANDARD_SIZES, GLASS_TINT_OPTIONS } from '../data/windows';
import { sound } from '../utils/sound';

interface SpecificationsDrawerProps {
  category?: ProductCategory;
  // Door props
  model: DoorModel;
  selectedColor: string;
  onSelectColor: (colorHex: string) => void;
  standardSize: string;
  onSelectStandardSize: (sizeLabel: string) => void;
  customWidth: string;
  customHeight: string;
  customEntrance: string;
  isCustomSize: boolean;
  onUpdateCustomSize: (width: string, height: string, entrance: string) => void;
  onToggleCustomSize: (isCustom: boolean) => void;
  opening: 'left' | 'right';
  onSelectOpening: (opening: 'left' | 'right') => void;
  handles: HandleOption[];
  activeHandleId: string;
  onSelectHandle: (handleId: string) => void;
  // Window props
  windowModel: WindowModel;
  selectedWindowColor: string;
  onSelectWindowColor: (colorHex: string) => void;
  windowStandardSize: string;
  onSelectWindowStandardSize: (sizeLabel: string) => void;
  customWindowWidth: string;
  customWindowHeight: string;
  isCustomWindowSize: boolean;
  onUpdateCustomWindowSize: (width: string, height: string) => void;
  onToggleCustomWindowSize: (isCustom: boolean) => void;
  windowHardwareList: WindowHandleOption[];
  activeWindowHardwareId: string;
  onSelectWindowHardware: (hardwareId: string) => void;
  selectedGlassTint: GlassTint;
  onSelectGlassTint: (tint: GlassTint) => void;
  // Global
  currency: CurrencyCode;
  unit: UnitSystem;
}

export const SpecificationsDrawer: React.FC<SpecificationsDrawerProps> = ({
  category = 'doors',
  model,
  selectedColor,
  onSelectColor,
  standardSize,
  onSelectStandardSize,
  customWidth,
  customHeight,
  customEntrance,
  isCustomSize,
  onUpdateCustomSize,
  onToggleCustomSize,
  opening,
  onSelectOpening,
  handles,
  activeHandleId,
  onSelectHandle,
  windowModel,
  selectedWindowColor,
  onSelectWindowColor,
  windowStandardSize,
  onSelectWindowStandardSize,
  customWindowWidth,
  customWindowHeight,
  isCustomWindowSize,
  onUpdateCustomWindowSize,
  onToggleCustomWindowSize,
  windowHardwareList,
  activeWindowHardwareId,
  onSelectWindowHardware,
  selectedGlassTint,
  onSelectGlassTint,
  currency,
  unit,
}) => {
  const [readMoreOpen, setReadMoreOpen] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [motorizedLockEnabled, setMotorizedLockEnabled] = useState(false);
  // Window specific extras
  const [rainSensorEnabled, setRainSensorEnabled] = useState(true);
  const [motorizedActuatorEnabled, setMotorizedActuatorEnabled] = useState(false);

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Australia',
    state: 'VIC',
    postcode: '3121',
    address: '',
    projectType: 'Residential Villa',
    biometricScanner: true,
    motorizedLocking: false,
    message: 'Please provide certified engineering drawings, thermal calculations, and international shipping lead time.',
  });
  const [submitted, setSubmitted] = useState(false);

  const isDoorMode = category === 'doors';

  // Active handle / hardware
  const activeDoorHandle = handles.find((h) => h.id === activeHandleId) || handles[0];
  const activeWindowHardware =
    windowHardwareList.find((h) => h.id === activeWindowHardwareId) || windowHardwareList[0];

  // Dynamic price calculations
  let totalCalculatedAUD = 0;

  if (isDoorMode) {
    const basePrice = model.basePriceAUD;
    const customSurcharge = isCustomSize ? 680 : 0;
    const handleSurcharge = activeDoorHandle.priceDeltaAUD;
    const biometricSurcharge = biometricEnabled ? 450 : 0;
    const motorizedSurcharge = motorizedLockEnabled ? 780 : 0;
    totalCalculatedAUD = basePrice + customSurcharge + handleSurcharge + biometricSurcharge + motorizedSurcharge;
  } else {
    const basePrice = windowModel.basePriceAUD;
    const customSurcharge = isCustomWindowSize ? 540 : 0;
    const hardwareSurcharge = activeWindowHardware.priceDeltaAUD;
    const smartGlassSurcharge = selectedGlassTint === 'smart-electrochromic' ? 680 : 0;
    const motorizedSurcharge = motorizedActuatorEnabled ? 720 : 0;
    totalCalculatedAUD = basePrice + customSurcharge + hardwareSurcharge + smartGlassSurcharge + motorizedSurcharge;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setSubmitted(true);
  };

  const handleDownloadSpecSheet = () => {
    sound.playClick();
    let specSheetText = '';

    if (isDoorMode) {
      specSheetText = `PORTALUX GRAND ARCHITECTURAL ENTRANCES
OFFICIAL SPECIFICATION DATA SHEET
--------------------------------------------------
Project Reference: PORTALUX-${model.name.toUpperCase()}-${Date.now().toString().slice(-6)}
Product Type: GRAND ARCHITECTURAL ENTRANCE DOOR
Model: ${model.name} (${model.subtitle})
Finish / RAL: ${selectedColor}
Configuration Size: ${
        isCustomSize
          ? `Custom ${customWidth}mm x ${customHeight}mm (Passage: ${customEntrance}mm)`
          : standardSize
      }
Door Swing: ${opening.toUpperCase()}-HINGED (Looking from exterior)
Handle System: ${activeDoorHandle.name} (${activeDoorHandle.finish})
Biometric Access: ${biometricEnabled ? 'ekey dLine Integrated Fingerprint' : 'Mechanical Cylinder Only'}
Multi-Point Motor: ${motorizedLockEnabled ? 'Motorized Automatic Deadbolts (KNX / Crestron)' : 'Standard Automatic Mechanical'}
--------------------------------------------------
ENGINEERING BENCHMARKS:
Thermal Performance: ${model.specs.thermalRating}
Acoustic Rating: ${model.specs.acousticRating}
Burglary Resistance: ${model.specs.securityClass}
Sheet Thickness: ${model.specs.sheetThickness}
Thermal Core: ${model.specs.core}
Testing Standards: EN ISO 10077-2 / DIN EN 1627 / AS 2047
--------------------------------------------------
Indicative Specification Value: ${formatPrice(totalCalculatedAUD, currency)}
Atelier & Concierge: concierge@portalux.design | portalux.design
`;
    } else {
      specSheetText = `PORTALUX ARCHITECTURAL WINDOW SYSTEMS & GLAZING
OFFICIAL SPECIFICATION DATA SHEET
--------------------------------------------------
Project Reference: PORTALUX-WIN-${windowModel.name.toUpperCase()}-${Date.now().toString().slice(-6)}
Product Type: HIGH-PERFORMANCE ARCHITECTURAL WINDOW
Model: ${windowModel.name} (${windowModel.subtitle})
Mechanism: ${windowModel.mechanism.toUpperCase()}
Frame Finish: ${selectedWindowColor}
Configuration Size: ${
        isCustomWindowSize
          ? `Custom ${customWindowWidth}mm x ${customWindowHeight}mm`
          : windowStandardSize
      }
Glass Build / Tint: ${
        GLASS_TINT_OPTIONS.find((t) => t.id === selectedGlassTint)?.name || selectedGlassTint
      }
Hardware & Stile: ${activeWindowHardware.name} (${activeWindowHardware.finish})
Smart Glass Feature: ${selectedGlassTint === 'smart-electrochromic' ? 'Dynamic Switchable PDLC (Clear to Frost)' : 'Passive Architectural Solar Coating'}
Motorized Drive: ${motorizedActuatorEnabled ? 'Concealed 24V DC KNX Actuator Included' : 'Manual Precision Micro-Rollers/Cam'}
Rain & Wind Sensor: ${rainSensorEnabled ? 'Optical Rain / Wind Automatic Retract Interface' : 'Standard'}
--------------------------------------------------
ENGINEERING BENCHMARKS:
Thermal Transmittance: ${windowModel.specs.thermalRating}
Acoustic Isolation: ${windowModel.specs.acousticRating}
Sightline Stile: ${windowModel.specs.sightline}
Glass Build: ${windowModel.specs.glassComposition}
Air Tightness: ${windowModel.specs.airTightness}
Watertightness: ${windowModel.specs.waterTightness}
Wind Resistance: ${windowModel.specs.windResistance}
European Security: ${windowModel.specs.securityClass}
Warranty: ${windowModel.specs.warranty}
Testing Standards: EN 14351-1 / EN 12207 / EN 12208 / Passivhaus Darmstadt
--------------------------------------------------
Indicative Specification Value: ${formatPrice(totalCalculatedAUD, currency)}
Atelier & Concierge: concierge@portalux.design | portalux.design
`;
    }

    const element = document.createElement('a');
    const file = new Blob([specSheetText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = isDoorMode
      ? `PORTALUX_${model.name}_Architectural_Spec.txt`
      : `PORTALUX_${windowModel.name}_Window_Spec.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const activeTitle = isDoorMode ? model.name : windowModel.name;
  const activeSubtitle = isDoorMode ? model.subtitle : windowModel.subtitle;
  const activeDescription = isDoorMode ? model.description : windowModel.description;

  return (
    <section
      id="specifications"
      className="relative bg-[#0d0f12] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800 select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="border-b border-zinc-800/80 pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e4ff3a]">
                {isDoorMode
                  ? 'Grand Entrance Specifications & Architectural Sizing'
                  : 'Architectural Window Specifications & Glazing Schedule'}
              </span>
              <h2 className="font-heading text-4xl sm:text-6xl text-white tracking-wide mt-1">
                {activeTitle}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Configured Estimate:</span>
              <span className="font-heading text-3xl sm:text-4xl text-[#e4ff3a]">
                {formatPrice(totalCalculatedAUD, currency)}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Ex-factory + crating</span>
            </div>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            {activeDescription}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                setReadMoreOpen(!readMoreOpen);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>{readMoreOpen ? 'Hide Engineering Specs' : 'Show Engineering Specs'}</span>
              {readMoreOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDownloadSpecSheet}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-xs font-mono text-[#e4ff3a] cursor-pointer transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Spec Sheet</span>
            </button>
          </div>

          {/* Expandable Engineering Breakdown */}
          <AnimatePresence>
            {readMoreOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-6 pt-6 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              >
                {isDoorMode ? (
                  <>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                        <Thermometer className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase">Thermal Performance</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{model.specs.thermalRating}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase">Acoustic Shield</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{model.specs.acousticRating}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                        <Lock className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase">Security Standard</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{model.specs.securityClass}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Aluminium Gauge</span>
                      <p className="text-sm font-semibold text-white">{model.specs.sheetThickness}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Insulation Core</span>
                      <p className="text-sm font-semibold text-white">{model.specs.core}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Quality Guarantee</span>
                      <p className="text-sm font-semibold text-white">{model.specs.warranty}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                        <Sun className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase">Window U-Value</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{windowModel.specs.thermalRating}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase">Soundproofing</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{windowModel.specs.acousticRating}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-2 text-[#e4ff3a] mb-1">
                        <Wind className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase">Windload & Hurricane</span>
                      </div>
                      <p className="text-sm font-semibold text-white">{windowModel.specs.windResistance}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Sightline Width</span>
                      <p className="text-sm font-semibold text-white">{windowModel.specs.sightline}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Glass Composition</span>
                      <p className="text-sm font-semibold text-white text-xs">{windowModel.specs.glassComposition}</p>
                    </div>
                    <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                      <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">Tested Standard</span>
                      <p className="text-sm font-semibold text-white">{windowModel.specs.airTightness}</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= STEP 01: SIZES & DIMENSIONS ================= */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide">
              01. {isDoorMode ? 'SIZES & PROFILE' : 'WINDOW DIMENSIONS & SIGHTLINES'}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  if (isDoorMode) {
                    onToggleCustomSize(false);
                  } else {
                    onToggleCustomWindowSize(false);
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all cursor-pointer ${
                  !(isDoorMode ? isCustomSize : isCustomWindowSize)
                    ? 'bg-[#e4ff3a] text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Standard Sizes
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  if (isDoorMode) {
                    onToggleCustomSize(true);
                  } else {
                    onToggleCustomWindowSize(true);
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all cursor-pointer ${
                  (isDoorMode ? isCustomSize : isCustomWindowSize)
                    ? 'bg-[#e4ff3a] text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Custom Tailored
              </button>
            </div>
          </div>

          {isDoorMode ? (
            /* Door sizes */
            !isCustomSize ? (
              <div>
                <p className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-wider">
                  STANDARD ARCHITECTURAL PROFILES ({unit === 'metric' ? 'METRIC MM' : 'IMPERIAL INCHES'})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STANDARD_SIZES.map((size) => {
                    const isSelected = standardSize === size.label;
                    return (
                      <button
                        key={size.id}
                        onClick={() => {
                          sound.playClick();
                          onSelectStandardSize(size.label);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1b1e23] border-[#e4ff3a] shadow-[0_0_15px_rgba(228,255,58,0.2)]'
                            : 'bg-[#14161a] border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-zinc-400">Frame Outer</span>
                          {isSelected && <Check className="w-4 h-4 text-[#e4ff3a]" />}
                        </div>
                        <div className="font-heading text-xl sm:text-2xl text-white mt-1">
                          {unit === 'metric'
                            ? `${size.widthMm} × ${size.heightMm}mm`
                            : `${size.widthInches}" × ${size.heightInches}"`}
                        </div>
                        <div className="text-xs text-[#e4ff3a] font-mono mt-1">
                          Clear Passage: {size.passageMm}mm
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-wider">
                  CUSTOM MILLIMETER TAILORING (UP TO 1800MM X 3200MM PIVOT)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#14161a] p-4 rounded-xl border border-zinc-800">
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Width ({unit === 'metric' ? 'mm' : 'in'})
                    </label>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => onUpdateCustomSize(e.target.value, customHeight, customEntrance)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-[#e4ff3a]"
                      placeholder="1200"
                    />
                  </div>
                  <div className="bg-[#14161a] p-4 rounded-xl border border-zinc-800">
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Height ({unit === 'metric' ? 'mm' : 'in'})
                    </label>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => onUpdateCustomSize(customWidth, e.target.value, customEntrance)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-[#e4ff3a]"
                      placeholder="2400"
                    />
                  </div>
                  <div className="bg-[#14161a] p-4 rounded-xl border border-zinc-800">
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Clear Passage ({unit === 'metric' ? 'mm' : 'in'})
                    </label>
                    <input
                      type="number"
                      value={customEntrance}
                      onChange={(e) => onUpdateCustomSize(customWidth, customHeight, e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-[#e4ff3a]"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>
            )
          ) : (
            /* Window sizes */
            !isCustomWindowSize ? (
              <div>
                <p className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-wider">
                  ARCHITECTURAL GLAZING OPENINGS ({unit === 'metric' ? 'METRIC MM' : 'IMPERIAL INCHES'})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {WINDOW_STANDARD_SIZES.map((size) => {
                    const isSelected = windowStandardSize === size.label;
                    return (
                      <button
                        key={size.id}
                        onClick={() => {
                          sound.playClick();
                          onSelectWindowStandardSize(size.label);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1b1e23] border-[#e4ff3a] shadow-[0_0_15px_rgba(228,255,58,0.2)]'
                            : 'bg-[#14161a] border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-zinc-400">Opening</span>
                          {isSelected && <Check className="w-4 h-4 text-[#e4ff3a]" />}
                        </div>
                        <div className="font-heading text-lg sm:text-xl text-white mt-1">
                          {unit === 'metric'
                            ? `${size.widthMm} × ${size.heightMm}mm`
                            : `${size.widthInches}" × ${size.heightInches}"`}
                        </div>
                        <div className="text-xs text-[#e4ff3a] font-mono mt-1">
                          Glazed Area: {size.passageMm}mm clear
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-wider">
                  CUSTOM ARCHITECTURAL TAILORING (UP TO 6000MM WIDTH PANORAMIC WALL)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#14161a] p-4 rounded-xl border border-zinc-800">
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Glazing Span Width ({unit === 'metric' ? 'mm' : 'in'})
                    </label>
                    <input
                      type="number"
                      value={customWindowWidth}
                      onChange={(e) => onUpdateCustomWindowSize(e.target.value, customWindowHeight)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-[#e4ff3a]"
                      placeholder="2800"
                    />
                  </div>
                  <div className="bg-[#14161a] p-4 rounded-xl border border-zinc-800">
                    <label className="text-xs font-mono text-zinc-400 block mb-1">
                      Glazing Span Height ({unit === 'metric' ? 'mm' : 'in'})
                    </label>
                    <input
                      type="number"
                      value={customWindowHeight}
                      onChange={(e) => onUpdateCustomWindowSize(customWindowWidth, e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-[#e4ff3a]"
                      placeholder="2600"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* ================= STEP 02: HARDWARE OR GLASS TINT ================= */}
        {isDoorMode ? (
          /* Door Swing Orientation */
          <div className="mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-4">
              02. DOOR OPENING ORIENTATION
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectOpening('left');
                }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  opening === 'left'
                    ? 'bg-[#1b1e23] border-[#e4ff3a] text-white shadow-md'
                    : 'bg-[#14161a] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="font-heading text-lg font-bold">Left Inward Swing</div>
                  <div className="text-xs font-mono text-zinc-400">Hinged on Left Frame</div>
                </div>
                {opening === 'left' && <Check className="w-5 h-5 text-[#e4ff3a]" />}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSelectOpening('right');
                }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  opening === 'right'
                    ? 'bg-[#1b1e23] border-[#e4ff3a] text-white shadow-md'
                    : 'bg-[#14161a] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="font-heading text-lg font-bold">Right Inward Swing</div>
                  <div className="text-xs font-mono text-zinc-400">Hinged on Right Frame</div>
                </div>
                {opening === 'right' && <Check className="w-5 h-5 text-[#e4ff3a]" />}
              </button>
            </div>
          </div>
        ) : (
          /* Window Glass Build & Tint */
          <div className="mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-4">
              02. ARCHITECTURAL GLASS COMPOSITION & SOLAR TINT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GLASS_TINT_OPTIONS.map((tint) => {
                const isSelected = selectedGlassTint === tint.id;
                return (
                  <button
                    key={tint.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectGlassTint(tint.id);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1b1e23] border-[#e4ff3a] shadow-[0_0_15px_rgba(228,255,58,0.2)]'
                        : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: tint.previewColor }}
                        />
                        <span className="font-heading text-lg text-white font-bold">{tint.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#e4ff3a]" />}
                    </div>
                    <p className="text-xs text-zinc-400 mb-2">{tint.description}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">Daylight: {tint.lightTransmittance}</span>
                      <span className="text-[#e4ff3a] font-bold">
                        {tint.id === 'smart-electrochromic' ? `+${formatPrice(680, currency)}` : 'Included'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 03: HANDLES & HARDWARE ================= */}
        <div className="mb-12">
          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-4">
            03. {isDoorMode ? 'ARCHITECTURAL PULL HANDLES' : 'WINDOW OPERATING HARDWARE & STILES'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {isDoorMode
              ? handles.map((h) => {
                  const isSelected = activeHandleId === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectHandle(h.id);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b1e23] border-[#e4ff3a] shadow-[0_0_15px_rgba(228,255,58,0.2)]'
                          : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-lg text-white">{h.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#e4ff3a]" />}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 mt-1">{h.finish}</div>
                      <div className="text-xs font-mono text-[#e4ff3a] mt-2">
                        {h.priceDeltaAUD === 0 ? 'Standard Included' : `+${formatPrice(h.priceDeltaAUD, currency)}`}
                      </div>
                    </button>
                  );
                })
              : windowHardwareList.map((hw) => {
                  const isSelected = activeWindowHardwareId === hw.id;
                  return (
                    <button
                      key={hw.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectWindowHardware(hw.id);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1b1e23] border-[#e4ff3a] shadow-[0_0_15px_rgba(228,255,58,0.2)]'
                          : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-lg text-white">{hw.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#e4ff3a]" />}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 mt-1">{hw.finish}</div>
                      <p className="text-[11px] text-zinc-500 mt-1">{hw.description}</p>
                      <div className="text-xs font-mono text-[#e4ff3a] mt-2">
                        {hw.priceDeltaAUD === 0
                          ? 'Standard Included'
                          : `+${formatPrice(hw.priceDeltaAUD, currency)}`}
                      </div>
                    </button>
                  );
                })}
          </div>
        </div>

        {/* ================= STEP 04: AUTOMATION & SMART ACCESS ================= */}
        <div className="mb-12">
          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-4">
            04. {isDoorMode ? 'DIGITAL ACCESS & MOTORIZED LOCKS' : 'SMART SENSORS & MOTORIZED ACTUATORS'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isDoorMode ? (
              <>
                {/* Biometric Scanner */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setBiometricEnabled(!biometricEnabled);
                  }}
                  className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    biometricEnabled
                      ? 'bg-[#1b1f24] border-[#e4ff3a]'
                      : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#e4ff3a]">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-white">ekey dLine Fingerprint Scanner</h4>
                      <p className="text-xs text-zinc-400">Integrated flush into handle (+{formatPrice(450, currency)})</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      biometricEnabled ? 'bg-[#e4ff3a] border-black text-black' : 'border-zinc-600'
                    }`}
                  >
                    {biometricEnabled && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Motorized Multi-Point Lock */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setMotorizedLockEnabled(!motorizedLockEnabled);
                  }}
                  className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    motorizedLockEnabled
                      ? 'bg-[#1b1f24] border-[#e4ff3a]'
                      : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#e4ff3a]">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-white">Motorized Multi-Lock (KNX / Crestron)</h4>
                      <p className="text-xs text-zinc-400">Electric smart deadbolt (+{formatPrice(780, currency)})</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      motorizedLockEnabled ? 'bg-[#e4ff3a] border-black text-black' : 'border-zinc-600'
                    }`}
                  >
                    {motorizedLockEnabled && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Rain & Wind Auto-Closure */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setRainSensorEnabled(!rainSensorEnabled);
                  }}
                  className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    rainSensorEnabled
                      ? 'bg-[#1b1f24] border-[#e4ff3a]'
                      : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#e4ff3a]">
                      <Wind className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-white">Optical Rain & Wind Auto-Shut</h4>
                      <p className="text-xs text-zinc-400">Automated storm seal trigger (Included)</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      rainSensorEnabled ? 'bg-[#e4ff3a] border-black text-black' : 'border-zinc-600'
                    }`}
                  >
                    {rainSensorEnabled && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Motorized 24V Concealed Actuator */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setMotorizedActuatorEnabled(!motorizedActuatorEnabled);
                  }}
                  className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    motorizedActuatorEnabled
                      ? 'bg-[#1b1f24] border-[#e4ff3a]'
                      : 'bg-[#14161a] border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#e4ff3a]">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-white">Concealed 24V Motorized Drive</h4>
                      <p className="text-xs text-zinc-400">Integrated micro-motor & smart wall switch (+{formatPrice(720, currency)})</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      motorizedActuatorEnabled ? 'bg-[#e4ff3a] border-black text-black' : 'border-zinc-600'
                    }`}
                  >
                    {motorizedActuatorEnabled && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= STEP 05: QUOTE REQUEST FORM ================= */}
        <div className="border-t border-zinc-800 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide">
                05. ARCHITECTURAL QUOTATION DISPATCH
              </h3>
              <span className="text-xs font-mono text-zinc-300 font-semibold">
                Direct atelier pricing, air/sea freight logistics & CAD drawing pack
              </span>
            </div>
            <button
              onClick={handleDownloadSpecSheet}
              className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-xs font-mono text-zinc-100 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-[#e4ff3a]" />
              <span>Export PDF Specs</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jean-Luc Dubois"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:border-[#e4ff3a]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="contact@architecturedesign.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:border-[#e4ff3a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  placeholder="+61 400 123 456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:border-[#e4ff3a]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Project Typology</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                  className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e4ff3a]"
                >
                  <option value="Residential Villa">Residential Villa</option>
                  <option value="Luxury Renovation">Luxury Renovation</option>
                  <option value="Architectural Development">Architectural Development</option>
                  <option value="Commercial HQ">Commercial HQ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Country / Destination</label>
                <input
                  type="text"
                  placeholder="Pakistan / Saudi Arabia / UAE / Australia / USA / UK"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:border-[#e4ff3a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Project Site Address / Suburb</label>
              <input
                type="text"
                placeholder="Street address or development lot location"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:border-[#e4ff3a]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-200 font-bold mb-1">Architectural Notes / Lead Times</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#14161a] border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:border-[#e4ff3a]"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-[#e4ff3a]" />
                <span>NDA Protected • 24-Hour International Atelier Response</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#e4ff3a] hover:bg-[#d5f02f] text-black font-heading text-xl font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_25px_rgba(228,255,58,0.4)] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Specification Dossier</span>
              </button>
            </div>
          </form>

          {/* Submission Success Notice */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-6 rounded-2xl bg-zinc-900 border border-[#e4ff3a] text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#e4ff3a] text-black flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-heading text-2xl text-white">Dossier Transmitted Successfully</h4>
                <p className="text-xs font-mono text-zinc-300 mt-1 max-w-md mx-auto">
                  Our international technical department will review your {isDoorMode ? model.name : windowModel.name} schedule and reply within 24 hours with certified drawings and landed shipping pricing.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-mono text-[#e4ff3a] underline cursor-pointer"
                >
                  Configure another system
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
