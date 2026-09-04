import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Contrast } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SpotlightStudio } from './components/SpotlightStudio';
import { MenuOverlay } from './components/MenuOverlay';
import { CatalogueModal } from './components/CatalogueModal';

const SpecificationsDrawer = lazy(() =>
  import('./components/SpecificationsDrawer').then((m) => ({ default: m.SpecificationsDrawer }))
);
const WindowSystemsSection = lazy(() =>
  import('./components/WindowSystemsSection').then((m) => ({ default: m.WindowSystemsSection }))
);
const CertificationSection = lazy(() =>
  import('./components/CertificationSection').then((m) => ({ default: m.CertificationSection }))
);
const ExploreBanner = lazy(() =>
  import('./components/ExploreBanner').then((m) => ({ default: m.ExploreBanner }))
);
const ModernDoorsSection = lazy(() =>
  import('./components/ModernDoorsSection').then((m) => ({ default: m.ModernDoorsSection }))
);
const GlobalProjectsSection = lazy(() =>
  import('./components/GlobalProjectsSection').then((m) => ({ default: m.GlobalProjectsSection }))
);
const FeaturesHotspotsSection = lazy(() =>
  import('./components/FeaturesHotspotsSection').then((m) => ({ default: m.FeaturesHotspotsSection }))
);
const FooterYellow = lazy(() =>
  import('./components/FooterYellow').then((m) => ({ default: m.FooterYellow }))
);
const LeadTimesSection = lazy(() =>
  import('./components/LeadTimesSection').then((m) => ({ default: m.LeadTimesSection }))
);
import { DOOR_MODELS, HANDLE_OPTIONS, STANDARD_SIZES } from './data/doors';
import {
  WINDOW_MODELS,
  WINDOW_HANDLE_OPTIONS,
  WINDOW_STANDARD_SIZES,
  GLASS_TINT_OPTIONS,
} from './data/windows';
import {
  CurrencyCode,
  UnitSystem,
  ContrastMode,
  ProductCategory,
  GlassTint,
} from './types';
import { CONTRAST_THEMES } from './data/contrastThemes';
import { sound } from './utils/sound';

export default function App() {
  const [productCategory, setProductCategory] = useState<ProductCategory>('doors');
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const currentDoorModel = DOOR_MODELS[activeModelIndex];
  const [selectedColor, setSelectedColor] = useState(currentDoorModel.primaryColor);
  const [standardSize, setStandardSize] = useState(STANDARD_SIZES[0].label);
  const [customWidth, setCustomWidth] = useState('1200');
  const [customHeight, setCustomHeight] = useState('2400');
  const [customEntrance, setCustomEntrance] = useState('1020');
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [opening, setOpening] = useState<'left' | 'right'>('left');
  const [activeHandleId, setActiveHandleId] = useState(HANDLE_OPTIONS[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [activeWindowIndex, setActiveWindowIndex] = useState(0);
  const currentWindowModel = WINDOW_MODELS[activeWindowIndex];
  const [selectedWindowColor, setSelectedWindowColor] = useState(currentWindowModel.primaryColor);
  const [windowStandardSize, setWindowStandardSize] = useState(WINDOW_STANDARD_SIZES[0].label);
  const [customWindowWidth, setCustomWindowWidth] = useState('2800');
  const [customWindowHeight, setCustomWindowHeight] = useState('2600');
  const [isCustomWindowSize, setIsCustomWindowSize] = useState(false);
  const [activeWindowHardwareId, setActiveWindowHardwareId] = useState(WINDOW_HANDLE_OPTIONS[0].id);
  const [selectedGlassTint, setSelectedGlassTint] = useState<GlassTint>('clear-lowe');
  const [windowIsOpen, setWindowIsOpen] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(85);
  const readStore = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
  const writeStore = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* private mode */ } };
  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => {
    return (readStore('portalux_contrast') as ContrastMode) || 'high-dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', contrastMode);
    writeStore('portalux_contrast', contrastMode);
  }, [contrastMode]);
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = readStore('portalux_currency') as CurrencyCode;
    return saved && ['AUD', 'USD', 'EUR', 'GBP', 'PKR', 'SAR'].includes(saved) ? saved : 'AUD';
  });
  useEffect(() => { writeStore('portalux_currency', currency); }, [currency]);
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const handleSelectDoorIndex = (index: number) => {
    setActiveModelIndex(index);
    setSelectedColor(DOOR_MODELS[index].primaryColor);
  };
  const handleSelectWindowIndex = (index: number) => {
    setActiveWindowIndex(index);
    setSelectedWindowColor(WINDOW_MODELS[index].primaryColor);
  };
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const handleInspectWindowInStudio = (index: number) => {
    setProductCategory('windows');
    handleSelectWindowIndex(index);
    scrollToSection('studio');
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        sound.playClick();
        if (productCategory === 'doors') handleSelectDoorIndex((activeModelIndex + 1) % DOOR_MODELS.length);
        else handleSelectWindowIndex((activeWindowIndex + 1) % WINDOW_MODELS.length);
      } else if (e.key === 'ArrowLeft') {
        sound.playClick();
        if (productCategory === 'doors') handleSelectDoorIndex((activeModelIndex - 1 + DOOR_MODELS.length) % DOOR_MODELS.length);
        else handleSelectWindowIndex((activeWindowIndex - 1 + WINDOW_MODELS.length) % WINDOW_MODELS.length);
      } else if ((e.key === ' ' || e.key === 'Enter') && document.activeElement === document.body) {
        e.preventDefault();
        if (productCategory === 'doors') setIsOpen((prev) => !prev);
        else setWindowIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [productCategory, activeModelIndex, activeWindowIndex]);
  const activeHandle = HANDLE_OPTIONS.find((h) => h.id === activeHandleId) || HANDLE_OPTIONS[0];
  const activeWindowHardware = WINDOW_HANDLE_OPTIONS.find((h) => h.id === activeWindowHardwareId) || WINDOW_HANDLE_OPTIONS[0];
  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 flex flex-col font-sans selection:bg-[#e4ff3a] selection:text-black">
      <Navbar onOpenMenu={() => setMenuOpen(true)} onOpenCatalogue={() => setCatalogueOpen(true)} soundEnabled={soundEnabled} onToggleSound={handleToggleSound} onScrollToQuote={() => scrollToSection('specifications')} currency={currency} onChangeCurrency={setCurrency} unit={unit} onChangeUnit={setUnit} contrastMode={contrastMode} onChangeContrastMode={setContrastMode} />
      <main className="flex-1">
        <section id="top" className="relative pt-24 pb-6 bg-[#07080a] text-center px-4 overflow-hidden border-b border-zinc-900">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-mono text-[#e4ff3a] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3a] animate-pulse" />
              <span>ARCHITECTURAL ENTRANCE & WINDOW SYSTEMS • GLOBAL SPECIFICATION</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-white uppercase leading-tight">CREATING LASTING IMPRESSIONS</h1>
          </motion.div>
        </section>
        <SpotlightStudio category={productCategory} onSelectCategory={setProductCategory} models={DOOR_MODELS} activeModelIndex={activeModelIndex} onSelectModelIndex={handleSelectDoorIndex} selectedColor={selectedColor} onSelectColor={setSelectedColor} activeHandle={activeHandle} opening={opening} isOpen={isOpen} onToggleOpen={() => setIsOpen(!isOpen)} windowModels={WINDOW_MODELS} activeWindowIndex={activeWindowIndex} onSelectWindowIndex={handleSelectWindowIndex} selectedWindowColor={selectedWindowColor} onSelectWindowColor={setSelectedWindowColor} activeWindowHardware={activeWindowHardware} selectedGlassTint={selectedGlassTint} onSelectGlassTint={setSelectedGlassTint} windowIsOpen={windowIsOpen} onToggleWindowOpen={() => setWindowIsOpen(!windowIsOpen)} lightIntensity={lightIntensity} onChangeLightIntensity={setLightIntensity} currency={currency} onOpenSpecs={() => scrollToSection('specifications')} onOpenQuote={() => scrollToSection('specifications')} />
        <Suspense fallback={<div className="min-h-[40vh] bg-[#07080a]" />}>
          <WindowSystemsSection currency={currency} onInspectWindowInStudio={handleInspectWindowInStudio} onOpenCatalogue={() => setCatalogueOpen(true)} />
          <SpecificationsDrawer category={productCategory} model={currentDoorModel} selectedColor={selectedColor} onSelectColor={setSelectedColor} standardSize={standardSize} onSelectStandardSize={setStandardSize} customWidth={customWidth} customHeight={customHeight} customEntrance={customEntrance} isCustomSize={isCustomSize} onUpdateCustomSize={(w, h, e) => { setCustomWidth(w); setCustomHeight(h); setCustomEntrance(e); }} onToggleCustomSize={setIsCustomSize} opening={opening} onSelectOpening={setOpening} handles={HANDLE_OPTIONS} activeHandleId={activeHandleId} onSelectHandle={setActiveHandleId} windowModel={currentWindowModel} selectedWindowColor={selectedWindowColor} onSelectWindowColor={setSelectedWindowColor} windowStandardSize={windowStandardSize} onSelectWindowStandardSize={setWindowStandardSize} customWindowWidth={customWindowWidth} customWindowHeight={customWindowHeight} isCustomWindowSize={isCustomWindowSize} onUpdateCustomWindowSize={(w, h) => { setCustomWindowWidth(w); setCustomWindowHeight(h); }} onToggleCustomWindowSize={setIsCustomWindowSize} windowHardwareList={WINDOW_HANDLE_OPTIONS} activeWindowHardwareId={activeWindowHardwareId} onSelectWindowHardware={setActiveWindowHardwareId} selectedGlassTint={selectedGlassTint} onSelectGlassTint={setSelectedGlassTint} currency={currency} unit={unit} />
          <LeadTimesSection />
          <CertificationSection />
          <ExploreBanner onExploreClick={() => scrollToSection('projects')} />
          <GlobalProjectsSection onSelectDoorModelByName={(name) => { const foundDoorIdx = DOOR_MODELS.findIndex((m) => name.toLowerCase().includes(m.name.toLowerCase())); if (foundDoorIdx >= 0) { setProductCategory('doors'); handleSelectDoorIndex(foundDoorIdx); scrollToSection('studio'); return; } const foundWindowIdx = WINDOW_MODELS.findIndex((w) => name.toLowerCase().includes(w.name.toLowerCase())); if (foundWindowIdx >= 0) { setProductCategory('windows'); handleSelectWindowIndex(foundWindowIdx); scrollToSection('studio'); } }} />
          <ModernDoorsSection onOpenCatalogue={() => setCatalogueOpen(true)} onScrollToStudio={() => { setProductCategory('doors'); scrollToSection('studio'); }} />
          <FeaturesHotspotsSection />
          <FooterYellow onScrollToStudio={() => scrollToSection('studio')} onScrollToQuote={() => scrollToSection('specifications')} onOpenCatalogue={() => setCatalogueOpen(true)} />
        </Suspense>
      </main>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} onSelectSection={(target) => { if (target === 'windows') scrollToSection('windows'); else scrollToSection(target); }} currency={currency} onChangeCurrency={setCurrency} contrastMode={contrastMode} onChangeContrastMode={setContrastMode} />
      <CatalogueModal isOpen={catalogueOpen} onClose={() => setCatalogueOpen(false)} currency={currency} onSelectDoorModel={(idx) => { setProductCategory('doors'); handleSelectDoorIndex(idx); scrollToSection('studio'); }} onSelectWindowModel={(idx) => { setProductCategory('windows'); handleSelectWindowIndex(idx); scrollToSection('studio'); }} />
      <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-zinc-950/95 border border-zinc-700/80 backdrop-blur-xl shadow-2xl font-mono text-xs">
        <div className="flex items-center gap-1.5 pl-2 pr-1.5 text-zinc-300 font-bold border-r border-zinc-800">
          <Contrast className="w-3.5 h-3.5 text-[#e4ff3a]" />
          <span className="text-[10px] uppercase tracking-wider text-zinc-400">Theme:</span>
        </div>
        <div className="flex items-center gap-1.5 px-0.5">
          {CONTRAST_THEMES.map((theme) => {
            const active = contrastMode === theme.id;
            return (<button key={theme.id} onClick={() => { sound.playClick(); setContrastMode(theme.id); }} title={`${theme.label} — ${theme.hint}`} className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-150 ${active ? 'ring-2 ring-white scale-125 shadow-lg z-10' : 'opacity-60 hover:opacity-100 hover:scale-110'}`} style={{ backgroundColor: theme.color }} />);
          })}
        </div>
        <div className="pl-2 pr-2.5 font-sans text-[11px] font-bold text-zinc-200 border-l border-zinc-800 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3a] animate-pulse" />
          <span>{CONTRAST_THEMES.find((t) => t.id === contrastMode)?.shortLabel}</span>
        </div>
      </div>
    </div>
  );
}
