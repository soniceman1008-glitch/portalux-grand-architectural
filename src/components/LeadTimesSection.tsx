import React from 'react';
import { Clock, MapPin, Plane } from 'lucide-react';

export const LeadTimesSection: React.FC = () => {
  const hubs = [
    { city: 'Melbourne', role: 'Atelier & dispatch', time: '6–8 weeks' },
    { city: 'Dubai', role: 'GCC specification desk', time: '7–9 weeks' },
    { city: 'Karachi', role: 'Pakistan trade desk', time: '8–10 weeks' },
  ];

  return (
    <section id="lead-times" className="relative bg-[#08090b] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-[#e4ff3a] text-xs font-mono uppercase tracking-widest mb-3">
          <Plane className="w-3.5 h-3.5" />
          <span>International Atelier Flow</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl tracking-wide uppercase">Lead Time & Cities</h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
          Specification quotes reply within 24 hours. Production starts after drawing approval.
          Landed shipping is quoted with the dossier — not at checkout.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {hubs.map((hub) => (
            <div key={hub.city} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
              <div className="flex items-center gap-2 text-white font-heading text-2xl tracking-wide">
                <MapPin className="w-4 h-4 text-[#e4ff3a]" />
                {hub.city}
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-1">{hub.role}</p>
              <p className="mt-4 flex items-center gap-2 text-[#e4ff3a] font-mono text-sm font-bold">
                <Clock className="w-4 h-4" />
                {hub.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
