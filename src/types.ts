export type CurrencyCode = 'AUD' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'SAR';
export type UnitSystem = 'metric' | 'imperial';
export type LightingAtmosphere = 'studio' | 'golden' | 'daylight' | 'night';
export type CameraView = 'front' | 'perspective' | 'detail';
export type ContrastMode =
  | 'high-dark'
  | 'architectural-light'
  | 'gold-contrast'
  | 'emerald-contrast'
  | 'azure-contrast'
  | 'rose-copper'
  | 'violet-contrast'
  | 'solar-amber'
  | 'ultra-mono';

export interface ContrastOption {
  id: ContrastMode;
  label: string;
  shortLabel: string;
  color: string;
  bgPreview: string;
  hint: string;
}
export type ProductCategory = 'doors' | 'windows';

export type WindowMechanism = 'slider' | 'pivot' | 'casement' | 'crittall' | 'bifold' | 'awning';
export type GlassTint = 'clear-lowe' | 'bronze-solar' | 'charcoal-privacy' | 'smart-electrochromic';

export interface WindowSpec {
  thermalRating: string;
  acousticRating: string;
  securityClass: string;
  airTightness: string;
  waterTightness: string;
  windResistance: string;
  sightline: string;
  glassComposition: string;
  warranty: string;
}

export interface WindowModel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: 'windows';
  mechanism: WindowMechanism;
  basePriceAUD: number;
  primaryColor: string;
  frameColor: string;
  availableColors: { name: string; hex: string; bgClass: string }[];
  defaultTint: GlassTint;
  muntinGrid?: boolean;
  panelCount?: number;
  specs: WindowSpec;
}

export interface WindowHandleOption {
  id: string;
  name: string;
  type: 'flush-grip' | 'german-rotor' | 'concealed-motor' | 'cremone-bolt';
  finish: string;
  priceDeltaAUD: number;
  description: string;
}

export interface DoorSpec {
  thermalRating: string;
  acousticRating: string;
  securityClass: string;
  sheetThickness: string;
  core: string;
  warranty: string;
  airTightness: string;
  windResistance: string;
}

export interface DoorModel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  basePriceAUD: number;
  primaryColor: string;
  frameColor: string;
  accentTone: string;
  texture: 'grooved' | 'fluted' | 'smooth' | 'geometric';
  glassType: 'tinted-slit' | 'offset-strip' | 'none' | 'geometric-cut';
  grooveLines?: number;
  handleStyle: string;
  availableColors: { name: string; hex: string; bgClass: string }[];
  specs: DoorSpec;
}

export interface HandleOption {
  id: string;
  name: string;
  type: 'bar-1200' | 'bar-full' | 'curved' | 'round-knob' | 'flat-lever' | 'recessed';
  length: string;
  finish: string;
  previewIcon: string;
  priceDeltaAUD: number;
}

export interface StandardSize {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
  passageMm: number;
  widthInches: number;
  heightInches: number;
}

export interface HotspotItem {
  id: string;
  title: string;
  category: string;
  description: string;
  techDetails: string;
  standardNorm: string;
  x: number; // percent
  y: number; // percent
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  postcode: string;
  address: string;
  projectType: 'Residential Villa' | 'Architectural Development' | 'Commercial HQ' | 'Luxury Renovation';
  biometricScanner: boolean;
  motorizedLocking: boolean;
  message: string;
}

export interface ArchitecturalProject {
  id: string;
  title: string;
  location: string;
  modelInstalled: string;
  finish: string;
  architect: string;
  category: 'Coastal Luxury' | 'Contemporary Villa' | 'Minimalist Urban' | 'Alpine Estate';
  dimensions: string;
  imageUrl: string;
  description: string;
}

export interface PerformanceCertification {
  id: string;
  standard: string;
  title: string;
  rating: string;
  authority: string;
  badge: string;
  description: string;
}
