import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, ArrowUpRight, Clock } from 'lucide-react';

export default function BlogSlider() {
  const blogPosts = [
    {
      id: 1,
      title: 'Cross-Border Transit: Optimizing Cargo Clearance Across Corridors',
      category: 'International Shipping',
      date: 'July 17, 2026',
      readTime: '5 min read',
      author: 'PPR Operations Desk',
      desc: 'Seamless custom clearance, strategic border hubs, and SMGS/CMR route selection are vital to coordinate high-volume freight transit safely.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      title: '3PL & Multimodal Strategy: Supporting Enterprise Commercial Growth',
      category: 'Supply Chain Architecture',
      date: 'July 10, 2026',
      readTime: '4 min read',
      author: 'PPR Strategy Desk',
      desc: 'Discover how outsourcing wagon fleets, bonded warehousing, and multimodal freight forwarding to a 3PL partner lowers transit risk and overhead.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      title: 'Freight Consolidation: Maximizing LCL & Bulk Rail Shipping Efficiency',
      category: 'Operations & Fleet',
      date: 'July 3, 2026',
      readTime: '6 min read',
      author: 'PPR Logistics Engineer',
      desc: 'Container consolidation and specialized wagon assignment allow enterprises to reduce shipping costs, decrease carbon footprints, and track timelines.',
      image: 'https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));
  };

  return (
    <div className="w-full relative font-sans">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C94C32]">Industry Intelligence</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-.035em] text-slate-900">
            Logistics insights &amp; global trade analysis
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-2 hidden text-xs font-medium text-slate-500 md:inline">Featured {currentIndex + 1} of {blogPosts.length}</span>
          <button onClick={handlePrev} className="flex h-10 w-10 items-center justify-center border border-slate-300 text-slate-700 transition-colors hover:border-[#C94C32] hover:text-[#C94C32]" aria-label="Previous insight post"><ArrowLeft size={17} /></button>
          <button onClick={handleNext} className="flex h-10 w-10 items-center justify-center border border-slate-300 text-slate-700 transition-colors hover:border-[#C94C32] hover:text-[#C94C32]" aria-label="Next insight post"><ArrowRight size={17} /></button>
        </div>
      </div>

      {(() => {
        const featured = blogPosts[currentIndex];
        const supporting = blogPosts.filter((_, index) => index !== currentIndex);
        return (
          <div className="grid gap-4 md:grid-cols-[1.25fr_.75fr]">
            <article className="group relative min-h-[360px] overflow-hidden bg-[#111827] md:min-h-[420px]">
              <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/95 via-[#0B1220]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                  <span className="text-[#FF7654]">{featured.category}</span><span>{featured.date}</span><span>{featured.readTime}</span>
                </div>
                <h3 className="max-w-3xl font-heading text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-.025em]">{featured.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">{featured.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white">Read research <ArrowUpRight size={15} className="text-[#FF7654] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
              </div>
            </article>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {supporting.map((post) => (
                <article key={post.id} className="group grid min-h-[175px] grid-cols-[38%_1fr] overflow-hidden border-y border-slate-200 bg-[#F8F8F6] md:min-h-0 md:border-y-0 md:border-l md:pl-4">
                  <div className="relative min-h-[150px] overflow-hidden sm:min-h-[175px] md:min-h-[190px]">
                    <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-col justify-center p-3 sm:p-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#C94C32]">{post.category}</span>
                    <h3 className="mt-2 line-clamp-3 font-heading text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#C94C32] sm:text-base">{post.title}</h3>
                    <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-500"><span className="inline-flex items-center gap-1"><Calendar size={11} />{post.date}</span><span className="inline-flex items-center gap-1"><Clock size={11} />{post.readTime}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
