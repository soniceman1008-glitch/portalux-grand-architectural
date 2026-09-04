import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Building, Ruler, ArrowRight, ExternalLink } from 'lucide-react';
import { ARCHITECTURAL_PROJECTS } from '../data/doors';
import { ArchitecturalProject } from '../types';
import { sound } from '../utils/sound';

interface GlobalProjectsSectionProps {
  onSelectDoorModelByName?: (modelName: string) => void;
}

export const GlobalProjectsSection: React.FC<GlobalProjectsSectionProps> = ({
  onSelectDoorModelByName,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ArchitecturalProject | null>(null);

  const categories = ['All', 'Coastal Luxury', 'Contemporary Villa', 'Minimalist Urban', 'Alpine Estate'];

  const filteredProjects =
    selectedCategory === 'All'
      ? ARCHITECTURAL_PROJECTS
      : ARCHITECTURAL_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative bg-[#0a0c0f] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#e4ff3a] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3a]" />
              <span>INTERNATIONAL PORTFOLIO</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none">
              GLOBAL RESIDENTIAL INSTALLATIONS
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
              PORTALUX architectural entrance systems specified by premier architects and luxury residential builders across Europe, the Americas, and Australasia.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#e4ff3a] text-black font-bold shadow-[0_0_15px_rgba(228,255,58,0.3)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={project.id}
              onClick={() => {
                sound.playClick();
                setActiveProject(project);
              }}
              className="group bg-[#13161a] border border-zinc-800/80 hover:border-[#e4ff3a]/70 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col shadow-xl"
            >
              {/* Project Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13161a] via-transparent to-black/30" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#e4ff3a] uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300">
                  <span className="flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#e4ff3a]" />
                    {project.location}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded">
                    {project.dimensions}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-2xl text-white group-hover:text-[#e4ff3a] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase">Door Spec</span>
                    <span className="text-zinc-200 font-semibold">{project.modelInstalled}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-[#e4ff3a] text-zinc-400 group-hover:text-black flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#121418] border border-zinc-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Modal Image */}
                <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/40" />

                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveProject(null);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-mono text-[#e4ff3a] uppercase tracking-wider block">
                      {activeProject.category} • {activeProject.location}
                    </span>
                    <h3 className="font-heading text-4xl sm:text-5xl text-white mt-1">
                      {activeProject.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Details */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {activeProject.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 block">ARCHITECT</span>
                      <span className="text-white font-semibold mt-1 block">{activeProject.architect}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">MODEL</span>
                      <span className="text-[#e4ff3a] font-semibold mt-1 block">{activeProject.modelInstalled}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">FINISH</span>
                      <span className="text-white font-semibold mt-1 block">{activeProject.finish}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block">DIMENSIONS</span>
                      <span className="text-white font-semibold mt-1 block">{activeProject.dimensions}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveProject(null);
                        const el = document.getElementById('studio');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-full bg-[#e4ff3a] hover:bg-[#d5f02f] text-black font-heading text-xl font-bold tracking-wider uppercase cursor-pointer"
                    >
                      Configure In 3D Studio
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
