import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterYellowProps {
  onScrollToStudio: () => void;
  onScrollToQuote: () => void;
  onOpenCatalogue: () => void;
}

export const FooterYellow: React.FC<FooterYellowProps> = ({
  onScrollToStudio,
  onScrollToQuote,
  onOpenCatalogue,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    sound.playClick();
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const navSections = [
    {
      id: 'home',
      title: 'HOME',
      items: [
        { label: '3D Door Studio & Lighting Simulator', action: onScrollToStudio },
        { label: 'Featured Collections (Sorrento & Brighton)', action: onScrollToStudio },
        { label: 'Instant Door Specifications Calculator', action: onScrollToQuote },
      ],
    },
    {
      id: 'about',
      title: 'ABOUT US',
      items: [
        { label: 'Australian Architectural Heritage', action: onScrollToStudio },
        { label: '3mm Heavy-Gauge Aluminium Engineering', action: onScrollToStudio },
        { label: 'Melbourne Flagship Richmond Showroom', action: onScrollToQuote },
      ],
    },
    {
      id: 'products',
      title: 'PRODUCTS',
      items: [
        { label: 'Pivot Entrance Doors (Up to 3.2m)', action: onScrollToStudio },
        { label: 'Hinged Flush Facade Systems', action: onScrollToStudio },
        { label: 'Thermally Broken Sidelites & Transoms', action: onOpenCatalogue },
        { label: 'Smart Biometric & European Locks', action: onOpenCatalogue },
      ],
    },
    {
      id: 'resources',
      title: 'RESOURCES',
      items: [
        { label: 'Architectural CAD / BIM Files (.dwg, .rfa)', action: onOpenCatalogue },
        { label: 'Acoustic & Thermal Certification Reports', action: onOpenCatalogue },
        { label: 'Download Complete Product Catalogue', action: onOpenCatalogue },
        { label: 'Care & Marine Maintenance Guide', action: onOpenCatalogue },
      ],
    },
    {
      id: 'contact',
      title: 'CONTACT US',
      items: [
        { label: 'Book a Showroom Consultation', action: onScrollToQuote },
        { label: 'Architect & Builder Trade Desk', action: onScrollToQuote },
        { label: 'Custom Sizing & Lead Time Inquiry', action: onScrollToQuote },
      ],
    },
  ];

  return (
    <footer id="footer-contact" className="relative bg-[#e4ff3a] text-black pt-16 pb-12 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl sm:text-7xl font-extrabold tracking-tight text-black uppercase leading-none">
            WHY CHOOSE PORTALUX?
          </h2>
          <p className="text-zinc-900 font-medium text-base sm:text-lg max-w-xl mx-auto mt-4 leading-snug">
            Choose PORTALUX for handcrafted architectural entrance doors that unite classical heritage,
            impenetrable multi-point security, and timeless modern beauty.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onScrollToQuote();
              }}
              className="px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-heading text-xl sm:text-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-3 active:scale-95 group"
            >
              <div className="w-6 h-6 rounded-full bg-[#e4ff3a] text-black flex items-center justify-center font-bold">
                ↗
              </div>
              <span>GET A QUOTE</span>
            </button>
            <a
              href="https://api.whatsapp.com/send?text=PORTALUX%20Grand%20Architectural%0Ahttps://portalux-original.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-heading text-xl sm:text-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-3 active:scale-95"
            >
              <div className="w-6 h-6 rounded-full bg-[#e4ff3a] text-black flex items-center justify-center font-bold">
                ↗
              </div>
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onScrollToStudio();
              }}
              className="px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-heading text-xl sm:text-2xl tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-3 active:scale-95 group"
            >
              <div className="w-6 h-6 rounded-full bg-[#e4ff3a] text-black flex items-center justify-center font-bold">
                ⚡
              </div>
              <span>EXPLORE DOORS</span>
            </button>
          </div>
        </div>
        <div className="border-t-2 border-b-2 border-black divide-y-2 divide-black mb-12">
          {navSections.map((sec) => {
            const isOpen = openAccordion === sec.id;
            return (
              <div key={sec.id} className="py-2">
                <button
                  type="button"
                  onClick={() => toggleAccordion(sec.id)}
                  className="w-full py-4 flex items-center justify-between font-heading text-3xl sm:text-4xl tracking-wide hover:opacity-80 transition-opacity cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span>{sec.title}</span>
                    <ArrowUpRight className="w-6 h-6 inline-block stroke-[2.5]" />
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center">
                    {isOpen ? <Minus className="w-6 h-6 stroke-[3]" /> : <Plus className="w-6 h-6 stroke-[3]" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pb-4 space-y-2 font-sans"
                    >
                      {sec.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            sound.playClick();
                            item.action();
                          }}
                          className="py-2 px-3 rounded-lg hover:bg-black/10 cursor-pointer font-medium text-sm sm:text-base flex items-center justify-between text-zinc-900 hover:text-black transition-colors"
                        >
                          <span>{item.label}</span>
                          <span className="text-xs font-mono font-bold">→</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="text-center space-y-4 mb-10">
          <div className="space-y-2">
            <h3 className="font-heading text-2xl tracking-wider uppercase text-black">Contact Info</h3>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold font-mono">
              <a href="tel:1800840366" className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-4 h-4" />
                <span>1800 840 366</span>
              </a>
              <a href="mailto:concierge@portalux.design" className="flex items-center gap-1.5 hover:underline">
                <Mail className="w-4 h-4" />
                <span>concierge@portalux.design</span>
              </a>
              <a href="https://api.whatsapp.com/send?text=PORTALUX%20Grand%20Architectural%0Ahttps://portalux-original.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <span>WhatsApp</span>
              </a>
            </div>
            <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-zinc-900">
              <MapPin className="w-4 h-4" />
              <span>490 Architecture Quarter, Design Precinct</span>
            </p>
          </div>
          <div className="border-t border-black/30 pt-6 mt-6 max-w-sm mx-auto">
            <h4 className="font-heading text-xl tracking-wider uppercase text-black mb-2 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>OPENING HOURS</span>
            </h4>
            <div className="text-xs font-mono font-bold space-y-1 text-zinc-900">
              <div className="flex justify-between"><span>MON-FRI</span><span>09:00am-05:00pm</span></div>
              <div className="flex justify-between"><span>SAT</span><span>10:00am-03:00pm</span></div>
              <div className="text-center italic text-zinc-800 pt-1">Private Showroom Appointments Available</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left text-xs sm:text-sm text-zinc-900 leading-relaxed">
          <section id="privacy">
            <h3 className="font-heading text-2xl tracking-wider uppercase text-black mb-2">Privacy Policy</h3>
            <p>
              Quote requests (name, email, phone, project notes) are used only to prepare a specification reply.
              We do not sell contact details. Currency and theme preferences stay in your browser.
            </p>
          </section>
          <section id="warranty">
            <h3 className="font-heading text-2xl tracking-wider uppercase text-black mb-2">Warranty Terms</h3>
            <p>
              PORTALUX entrance systems carry a 15-year atelier engineering guarantee on structure, finish and hardware,
              subject to marine-grade care and professional installation. Full terms are issued with every specification pack.
            </p>
          </section>
        </div>

        <div className="border-t-2 border-black pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold text-zinc-900">
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:underline">PRIVACY POLICY</a>
            <span>•</span>
            <a href="#warranty" className="hover:underline">WARRANTY TERMS</a>
          </div>
          <div>© 2026 PORTALUX GRAND ENTRANCES. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-1.5">
            <span>DESIGNED BY</span>
            <span className="bg-black text-[#e4ff3a] px-2 py-0.5 rounded font-heading text-sm">PORTALUX ATELIER</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
