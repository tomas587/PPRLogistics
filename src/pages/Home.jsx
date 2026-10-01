import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Clock, ArrowRight, ChevronDown, Navigation, Route, Compass,
  Train, Truck,
  Globe, Layers, FileText, CheckCircle,
} from 'lucide-react';
import BlogSlider from '../components/BlogSlider';
import Reveal from '../components/Reveal';
import heroTruckImg from '../assets/hero-truck.png';
import pprHeroVideo from '../assets/PPR_Video.mp4';
import usStatesMap from '../assets/us-contiguous-states.svg';

/* ─────────────────────────────────── DATA ─────────────────────────────── */

const services = [
  {
    id: 'road',
    Icon: Truck,
    label: 'Road Freight',
    desc: 'Door-to-door overland transport via tilt trailers, reefers & heavy-haul equipment under CMR & TIR conventions.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1000',
    tags: ['CMR & TIR', 'Temperature Controlled', 'Door-to-Door'],
    link: '/services/road',
  },
  {
    id: 'rail',
    Icon: Train,
    label: 'Rail & Wagon Freight',
    desc: 'Bulk haulage via covered wagons, flatbeds, and reefer rail cars operating under SMGS standards.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=1000',
    tags: ['SMGS Standard', 'Bulk Wagons', 'Intermodal'],
    link: '/services/rail',
  },
];

const differentiators = [
  {
    Icon: Shield,
    title: 'International Standards Compliance',
    body: 'Operations governed by CMR for road haulage and SMGS for rail freight — ensuring consistent, predictable transit.',
  },
  {
    Icon: Globe,
    title: 'Active Regional Corridors',
    body: 'Operational reach across key trade routes with direct handling of cross-border customs and transit documentation.',
  },
  {
    Icon: Clock,
    title: 'Dedicated Client Communication',
    body: 'Direct access to freight managers for shipment status, route queries, and customs coordination.',
  },
  {
    Icon: Layers,
    title: 'Integrated Multimodal Capability',
    body: 'Coordinated road and rail options to optimize transit times and cost for every shipment.',
  },
];

const processSteps = [
  {
    num: '01',
    Icon: FileText,
    title: 'Request a Quote',
    body: 'Share your cargo details, origin, destination, and preferred mode. We assess the best route for your needs.',
  },
  {
    num: '02',
    Icon: Navigation,
    title: 'Route Planning',
    body: 'Our team designs the optimal multimodal route, coordinates documentation, and confirms transit schedules.',
  },
  {
    num: '03',
    Icon: Truck,
    title: 'Transport & Handling',
    body: 'Your cargo moves through verified carriers, border crossings, and handling points with active coordination.',
  },
  {
    num: '04',
    Icon: CheckCircle,
    title: 'Delivery & Confirmation',
    body: 'We confirm delivery at destination and provide all necessary closing documentation for your records.',
  },
];

const trustItems = [
  { Icon: Truck, label: 'Multimodal Transport', sub: 'Road · Rail' },
  { Icon: Shield, label: 'International Standards', sub: 'CMR · TIR · SMGS' },
  { Icon: Globe, label: 'US Location', sub: 'Thornton, Illinois' },
  { Icon: FileText, label: 'End-to-End Support', sub: 'Customs & Documentation' },
];

// Project geographic coordinates with the Albers equal-area projection used to
// create the Census-derived SVG. Bounds are the projected extent of the lower-48
// state outlines, fitted to the drawing bounds in us-contiguous-states.svg.
const US_MAP_EXTENT = { left: 55.7, top: 24, right: 944.3, bottom: 586 };
const US_ALBERS_EXTENT = {
  left: -0.3640199043,
  top: 0.2324747791,
  right: 0.351906224,
  bottom: -0.2194475268,
};
const projectUsCoordinate = ([longitude, latitude]) => {
  const radians = Math.PI / 180;
  const phi1 = 29.5 * radians;
  const phi2 = 45.5 * radians;
  const phi = latitude * radians;
  const lambda = (longitude + 96) * radians;
  const n = (Math.sin(phi1) + Math.sin(phi2)) / 2;
  const c = Math.cos(phi1) ** 2 + 2 * n * Math.sin(phi1);
  const rho = Math.sqrt(c - 2 * n * Math.sin(phi)) / n;
  const rho0 = Math.sqrt(c - 2 * n * Math.sin(38 * radians)) / n;
  const projectedX = rho * Math.sin(n * lambda);
  const projectedY = rho0 - rho * Math.cos(n * lambda);

  return {
    x: US_MAP_EXTENT.left + ((projectedX - US_ALBERS_EXTENT.left) / (US_ALBERS_EXTENT.right - US_ALBERS_EXTENT.left)) * (US_MAP_EXTENT.right - US_MAP_EXTENT.left),
    y: US_MAP_EXTENT.top + ((US_ALBERS_EXTENT.top - projectedY) / (US_ALBERS_EXTENT.top - US_ALBERS_EXTENT.bottom)) * (US_MAP_EXTENT.bottom - US_MAP_EXTENT.top),
  };
};

const dispatchHub = projectUsCoordinate([-87.61, 41.57]);
const routeCurve = (destination, bendX, bendY) => {
  const dx = destination.x - dispatchHub.x;
  const dy = destination.y - dispatchHub.y;
  return `M ${dispatchHub.x} ${dispatchHub.y} C ${dispatchHub.x + dx * 0.32 + bendX} ${dispatchHub.y + dy * 0.32 + bendY}, ${dispatchHub.x + dx * 0.72 + bendX} ${dispatchHub.y + dy * 0.72 + bendY}, ${destination.x} ${destination.y}`;
};

const usRoutes = [
  {
    id: 'northeast', region: 'Northeast', detail: 'Regional freight connections across the Northeast', label: [824, 168], Icon: Navigation,
    cities: [
      { id: 'new-york', name: 'New York', coordinates: [-74.01, 40.71], bend: [0, -30], labelOffset: [8, -8], anchor: 'start' },
      { id: 'philadelphia', name: 'Philadelphia', coordinates: [-75.17, 39.95], bend: [-1, -14], labelOffset: [8, 15], anchor: 'start' },
    ],
  },
  {
    id: 'midwest', region: 'Midwest', detail: 'Great Lakes & Midwest freight connections', label: [730, 169], Icon: Route,
    cities: [
      { id: 'detroit', name: 'Detroit', coordinates: [-83.05, 42.33], bend: [0, -20], labelOffset: [9, -8], anchor: 'start' },
      { id: 'columbus', name: 'Columbus', coordinates: [-82.999, 39.96], bend: [2, 6], labelOffset: [9, 15], anchor: 'start' },
    ],
  },
  {
    id: 'south', region: 'South', detail: 'Regional freight connections across the Southern states', label: [684, 447], Icon: Truck,
    cities: [
      { id: 'atlanta', name: 'Atlanta', coordinates: [-84.39, 33.75], bend: [-16, 0], labelOffset: [9, -9], anchor: 'start' },
      { id: 'dallas', name: 'Dallas', coordinates: [-96.8, 32.78], bend: [-2, 18], labelOffset: [-9, 15], anchor: 'end' },
    ],
  },
  {
    id: 'west', region: 'West', detail: 'Regional freight connections across Western states', label: [270, 326], Icon: Compass,
    cities: [
      { id: 'denver', name: 'Denver', coordinates: [-104.99, 39.74], bend: [-4, -24], labelOffset: [8, -8], anchor: 'start' },
      { id: 'los-angeles', name: 'Los Angeles', coordinates: [-118.24, 34.05], bend: [0, 16], labelOffset: [9, 15], anchor: 'start' },
    ],
  },
].map((route) => ({
  ...route,
  cities: route.cities.map((city) => {
    const point = projectUsCoordinate(city.coordinates);
    return { ...city, ...point, curve: routeCurve(point, ...city.bend) };
  }),
}));

/* ─────────────────────────────── COMPONENT ─────────────────────────────── */

export default function Home() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [pinnedRoute, setPinnedRoute] = useState(null);
  const highlightedRoute = activeRoute || pinnedRoute;

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO — Cinematic video with staggered content entrance             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-center overflow-hidden"
        style={{ minHeight: 'min(82vh, 760px)', background: 'var(--color-navy)' }}
      >
        {/* Background video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay loop muted playsInline
            poster={heroTruckImg}
            className="w-full h-full object-cover object-[64%_center]"
            style={{ transform: 'scale(0.94)' }}
          >
            <source src={pprHeroVideo} type="video/mp4" />
          </video>
          {/* Directional gradient — text readable on left, video visible on right */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(11,18,32,0.97) 0%, rgba(11,18,32,0.90) 31%, rgba(11,18,32,0.66) 53%, rgba(11,18,32,0.16) 100%)',
            }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(11,18,32,0.62) 0%, transparent 44%)' }}
          />
        </div>

        {/* Hero content — staggered entrance */}
        <div className="relative z-10 container-site w-full py-16 md:py-20">
            <div className="max-w-[710px] lg:w-[54%] space-y-6">

            {/* Eyebrow */}
            <div
              className="animate-fade-in-up flex items-center gap-3"
              style={{ animationDelay: '0ms', animationFillMode: 'both' }}
            >
              <span className="h-[2px] w-10 rounded-full" style={{ background: 'var(--color-primary)' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--color-primary-light)' }}>
                PPR International Transport &amp; Logistics
              </span>
            </div>

            {/* H1 */}
            <h1
              className="animate-fade-in-up text-white font-extrabold leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.6rem, 5.3vw, 4.7rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.06,
                animationDelay: '80ms',
                animationFillMode: 'both',
              }}
            >
              Reliable Logistics.<br />
              <span style={{ color: 'var(--color-primary)' }}>Efficient Transportation.</span><br />
              Trusted Service.
            </h1>

            {/* Sub-headline */}
            <p
              className="animate-fade-in-up text-base md:text-lg leading-relaxed max-w-xl"
              style={{
                color: 'var(--color-text-on-dark)',
                animationDelay: '160ms',
                animationFillMode: 'both',
              }}
            >
              International freight forwarding by road and rail — connecting vital trade routes with dedicated operational support.
            </p>

            {/* Mode chips */}
            <div
              className="animate-fade-in-up flex flex-wrap gap-2"
              style={{ animationDelay: '240ms', animationFillMode: 'both' }}
            >
              {[
                { Icon: Truck, label: 'Road Freight' },
                { Icon: Train, label: 'Rail & Wagon' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <Icon size={13} style={{ color: 'var(--color-primary)' }} />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-3 pt-1"
              style={{ animationDelay: '320ms', animationFillMode: 'both' }}
            >
              <Link to="/contact" className="btn btn-primary">
                Request a Quote
                <ArrowRight size={15} />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown size={22} className="text-white/40" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TRUST STRIP — 4 factual capability pillars                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="trust-strip trust-strip--dark">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {trustItems.map(({ Icon, label, sub }) => (
              <div key={label} className="trust-strip__item px-4 lg:px-6 first:pl-0 last:pr-0">
                <div className="trust-strip__icon">
                  <Icon size={16} />
                </div>
                <div>
                  <div className="trust-strip__label">{label}</div>
                  <div className="trust-strip__sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SERVICES — Editorial road and rail features                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20" style={{ background: '#F1F2F0' }}>
        <div className="container-site">
          <Reveal variant="fade-up">
            <div className="mb-8 grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] md:items-end gap-5">
              <div>
                <h2 className="sh-h2">Transportation, built around the journey.</h2>
              </div>
              <p className="max-w-lg text-slate-600 text-sm leading-relaxed md:justify-self-end">
                We offer road and rail freight options tailored to bulk commodities and time-critical shipments.
              </p>
            </div>
          </Reveal>

          <div className="space-y-5 md:space-y-7">
            {services.map((svc, i) => (
              <Reveal key={svc.id} variant="fade-up" delay={`${i * 75}ms`}>
                <article className="group relative grid overflow-hidden bg-[#F8F8F6] md:min-h-[330px] md:grid-cols-12">
                  <div className={`relative min-h-[220px] overflow-hidden md:min-h-[330px] md:col-span-7 ${i % 2 ? 'md:col-start-6 md:row-start-1' : ''}`}>
                    <img src={svc.image} alt={svc.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/45 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-5 font-heading text-[clamp(4rem,11vw,9rem)] font-black uppercase leading-none tracking-[-.08em] text-white/15" aria-hidden="true">{svc.id === 'road' ? 'ROAD' : 'RAIL'}</span>
                  </div>
                  <div className={`relative flex flex-col justify-center px-6 py-7 md:col-span-5 md:px-9 lg:px-12 ${i % 2 ? 'md:col-start-1 md:row-start-1 md:pl-8 md:pr-12' : ''}`}>
                    <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C93D24]">0{i + 1} <span className="mx-1 text-slate-400">/</span> {svc.id === 'road' ? 'ROAD NETWORK' : 'RAIL NETWORK'}</span>
                    <h3 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[.92] tracking-[-.04em] text-[#111827]">{svc.id === 'road' ? <>Road<br />Freight</> : <>Rail &amp; Wagon<br />Freight</>}</h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">{svc.desc}</p>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{svc.tags.join('  ·  ')}</p>
                    <Link to={svc.link} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#C93D24]">
                      Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="pointer-events-none absolute -bottom-8 right-3 font-heading text-[clamp(6rem,14vw,12rem)] font-black uppercase leading-none tracking-[-.09em] text-[#111827]/[0.025]" aria-hidden="true">{svc.id === 'road' ? 'ROAD' : 'RAIL'}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* "View all" row */}
          <Reveal variant="fade-up" delay="200ms">
            <div className="mt-6 text-center">
              <Link to="/services" className="btn btn-outline">
                View All Transport Capabilities
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS — 4-step process                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-12" style={{ background: '#0B1220' }}>
        <div className="container-site">
          <Reveal variant="fade-up">
            <div className="mb-6 text-center max-w-xl mx-auto space-y-2">
              <h2 className="sh-h2--white">How It Works</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                From your first inquiry to delivery confirmation — a straightforward, well-coordinated process.
              </p>
            </div>
          </Reveal>

          {/* Desktop: horizontal steps with connectors */}
          <div className="hidden md:flex items-start gap-0">
            {processSteps.map((step, i) => (
              <React.Fragment key={step.num}>
                <Reveal variant="fade-up" delay={`${i * 90}ms`} className="flex-1">
                  <div className="process-step border-t border-white/10 pt-3 pr-3">
                    <div className="flex w-full items-center gap-3">
                      <div className="process-step__num" style={{ opacity: 0.8, fontSize: '2.8rem' }}>{step.num}</div>
                      <div className="flex h-9 w-9 items-center justify-center border border-[#F4512A]/25 bg-[#F4512A]/10 text-[#FF7654]">
                      <step.Icon size={18} />
                      </div>
                    </div>
                    <div className="process-step__title" style={{ color: '#FFFFFF' }}>{step.title}</div>
                    <p className="process-step__body" style={{ color: '#CBD5E1' }}>{step.body}</p>
                  </div>
                </Reveal>
                {i < processSteps.length - 1 && (
                  <div className="process-connector mt-6 mx-1 shrink-0 w-8" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden space-y-0">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} variant="fade-up" delay={`${i * 75}ms`}>
                <div className="flex gap-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F4512A]/25 bg-[#F4512A]/10 text-[#FF7654]">
                    <step.Icon size={18} />
                  </div>
                  <div>
                    <div className="process-step__title mb-1" style={{ color: '#FFFFFF' }}>{step.title}</div>
                    <p className="process-step__body" style={{ color: '#CBD5E1' }}>{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="fade-up" delay="300ms">
            <div className="mt-5 text-center">
              <Link to="/contact" className="btn btn-primary">
                Start Your Shipment
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* WHY PPR — Editorial feature hierarchy                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: '#171D29' }}>
        <div className="container-site">
          <Reveal variant="fade-up">
            <div className="mb-7 grid grid-cols-1 md:grid-cols-[1fr_0.8fr] md:items-end gap-5">
              <div className="space-y-2">
                <span className="eyebrow-tag">Why PPR Logistics</span>
                <h2 className="sh-h2--white mt-3">Built around reliable movement.</h2>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-right">Built around reliability, coordination and responsive freight management.</p>
                <Link to="/about" className="btn btn-secondary text-sm">
                  About PPR
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} variant="fade-up" delay={`${i * 55}ms`}>
                <article className={`group flex h-full gap-4 border-t border-white/10 py-5 sm:px-5 lg:border-l lg:border-t-0 lg:pl-6 ${i === 0 ? 'lg:border-l-0 lg:pl-0 lg:pr-8' : ''}`}>
                  <div className="shrink-0">
                    <span className={`block font-heading font-extrabold leading-none text-[#F4512A] ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>0{i + 1}</span>
                    <item.Icon size={17} className="mt-4 text-[#FF7654] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-heading font-bold leading-snug text-white ${i === 0 ? 'text-base' : 'text-sm'}`}>{item.title}</h3>
                    <p className="text-xs leading-relaxed text-slate-400">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TRADE CORRIDORS — Narrative + video card                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-bg)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Narrative */}
            <Reveal variant="fade-up">
              <div className="space-y-4">
                <h2 className="sh-h2">Connecting markets through dependable corridors.</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our logistics network connects diverse markets through strategic trade corridors. With direct access to major ports, border crossings, and key transit hubs, we ensure a smooth and reliable flow of goods across multiple destinations.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether steel products, industrial equipment, food commodities, or general cargo — our network covers short- and long-haul connections to vital trade centers.
                </p>
                {/* Key points */}
                <ul className="space-y-2 pt-1">
                  {[
                    'Direct wagon rail access across Central Asia and the Caucasus',
                    'Multi-modal cargo transfer (Rail-to-Road)',
                    'Consolidated logistics with border clearance documentation',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link to="/routes" className="btn btn-primary text-sm">
                    Explore Our Routes
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Video card */}
            <Reveal variant="fade-up" delay="100ms">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl border aspect-video flex items-center justify-center"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <video
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.75 }}
                >
                  <source
                    type="video/mp4"
                    src="https://prplogistic.com/wp-content/uploads/2025/09/double_exposure_of_two_businessmen_handshake_with_world_map_and.mp4"
                  />
                </video>
                <div className="absolute inset-0" style={{ background: 'rgba(17,24,39,0.55)' }} />
                <div className="relative z-10 text-center p-6 text-white space-y-2">
                  <span
                    className="text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border"
                    style={{
                      color: 'var(--color-primary-light)',
                      background: 'rgba(255,255,255,0.08)',
                      borderColor: 'rgba(255,255,255,0.12)',
                    }}
                  >
                    Trade Networks
                  </span>
                  <h3
                    className="font-extrabold text-xl md:text-2xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Regional &amp; International Coverage
                  </h3>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* US REGIONAL ROUTES                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: '#080F1E' }}>
        <div className="container-site space-y-6 md:space-y-8">
          <Reveal variant="fade-up">
            <div className="max-w-2xl space-y-3">
              <span className="eyebrow-tag-dark" style={{ color: '#FF8B76', background: 'rgba(255,255,255,0.035)', borderColor: '#26364D' }}>Domestic Freight Network</span>
              <h2 className="sh-h2--white mt-3" style={{ color: '#F5F7FA' }}>US Regional Routes</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#9AA8BB' }}>
                Road and rail freight routes coordinated from our Thornton, Illinois dispatch hub, connecting customers across the Northeast, Midwest, South, and West.
              </p>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay="80ms">
            <div className="overflow-hidden rounded-2xl border" style={{ background: '#101A2C', borderColor: 'rgba(120,150,180,0.18)', boxShadow: '0 12px 32px rgba(0,0,0,0.22), inset 0 1px rgba(255,255,255,0.025)' }}>
              <div className="px-5 pt-5 sm:px-8 sm:pt-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold" style={{ color: '#F5F7FA' }}>Domestic freight network</p>
                  <p className="text-xs mt-1" style={{ color: '#9AA8BB' }}>Regional service areas coordinated from Thornton, Illinois</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#FF8B76', background: 'rgba(255,75,43,0.07)', border: '1px solid rgba(255,75,43,0.18)' }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#FF4B2B' }} /> US Location
                </span>
              </div>

              <div className="px-2 sm:px-7 pt-1 pb-3 sm:pt-2 sm:pb-5">
                <svg viewBox="0 0 1000 610" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="us-routes-title us-routes-desc" className="us-regional-map mx-auto block w-full h-auto">
                  <title id="us-routes-title">US regional freight routes</title>
                  <desc id="us-routes-desc">A Census-derived map of the 48 contiguous states showing curved road and rail connections from Thornton, Illinois, south of Chicago, to the Northeast, Midwest, South, and West.</desc>
                  <defs>
                    <filter id="hub-glow" x="-200%" y="-200%" width="500%" height="500%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <image href={usStatesMap} x="0" y="0" width="1000" height="610" preserveAspectRatio="xMidYMid meet" />
                  {/* Branch each corridor from Thornton to individually projected cities. */}
                  {usRoutes.map((route) => (
                    <g key={route.id}>
                      {route.cities.map((city, cityIndex) => {
                        const pathId = `route-${route.id}-${city.id}`;
                        const routeOpacity = highlightedRoute && highlightedRoute !== route.id ? 0.10 : highlightedRoute === route.id ? 0.82 : 0.34;
                        const routeColor = '#F4512A';
                        return (
                          <g key={city.id}>
                            <path id={pathId} d={city.curve} fill="none" stroke={routeColor} strokeWidth={highlightedRoute === route.id ? 2.5 : 1.6} strokeDasharray="5 8" strokeLinecap="round" opacity={routeOpacity} className={highlightedRoute === route.id ? 'regional-route-path is-active' : 'regional-route-path'} />
                            <circle r="2.2" fill={highlightedRoute === route.id ? '#F4512A' : '#AAB7C8'} opacity={highlightedRoute && highlightedRoute !== route.id ? 0 : highlightedRoute === route.id ? 0.82 : 0.28} className="regional-route-motion">
                              <animateMotion dur={`${9 + cityIndex * 1.4}s`} repeatCount="indefinite" begin={cityIndex ? '-3s' : '0s'}>
                                <mpath href={`#${pathId}`} />
                              </animateMotion>
                            </circle>
                          </g>
                        );
                      })}
                    </g>
                  ))}
                  {/* Regional headings are separate from actual city markers. */}
                  {usRoutes.map((route) => (
                    <g key={`${route.id}-label`} opacity={highlightedRoute && highlightedRoute !== route.id ? 0.5 : 1}>
                      <text className="us-route-region-label" x={route.label[0]} y={route.label[1]} textAnchor="middle" fill={highlightedRoute === route.id ? '#F5F7FA' : '#D4DCE7'} fontSize="14" fontWeight="700">{route.region}</text>
                    </g>
                  ))}
                  {/* Neutral city nodes are each positioned from their own coordinates. */}
                  {usRoutes.flatMap((route) => route.cities.map((city) => (
                    <g key={`${route.id}-${city.id}`} opacity={highlightedRoute && highlightedRoute !== route.id ? 0.32 : highlightedRoute === route.id ? 1 : 0.82}>
                      <circle cx={city.x} cy={city.y} r={highlightedRoute === route.id ? 4.8 : 3.8} fill="#101A2C" stroke={highlightedRoute === route.id ? '#F4512A' : '#AAB7C8'} strokeWidth="1.5" />
                      <circle cx={city.x} cy={city.y} r="1.5" fill="#F5F7FA" />
                      <text className="us-city-label" x={city.x + city.labelOffset[0]} y={city.y + city.labelOffset[1]} textAnchor={city.anchor} fill={highlightedRoute === route.id ? '#F5F7FA' : '#AAB7C8'} fontSize="10" fontWeight="500">{city.name}</text>
                    </g>
                  )))}
                  {/* Thornton / Chicago dispatch hub */}
                  <g>
                    <circle cx={dispatchHub.x} cy={dispatchHub.y} r="27" fill="#FF4B2B" opacity="0.09" filter="url(#hub-glow)" />
                    <circle cx={dispatchHub.x} cy={dispatchHub.y} r="17" fill="none" stroke="#FF4B2B" strokeWidth="1" opacity="0.45" className="regional-hub-orbit" />
                    <circle cx={dispatchHub.x} cy={dispatchHub.y} r="10" fill="#111A2B" stroke="#FF4B2B" strokeWidth="3" filter="url(#hub-glow)" />
                    <circle cx={dispatchHub.x} cy={dispatchHub.y} r="3.5" fill="#FF4B2B" />
                    <path d={`M ${dispatchHub.x - 5} ${dispatchHub.y + 13} L ${dispatchHub.x - 15} ${dispatchHub.y + 21}`} fill="none" stroke="#FF8B76" strokeWidth="1" opacity="0.8" />
                    <text className="us-route-hub-label" x={dispatchHub.x - 21} y={dispatchHub.y + 31} textAnchor="end" fill="#F5F7FA" fontSize="14" fontWeight="700">Thornton, IL</text>
                    <text className="us-route-hub-caption" x={dispatchHub.x - 21} y={dispatchHub.y + 45} textAnchor="end" fill="#9AA8BB" fontSize="10" fontWeight="600" letterSpacing="1.2">DISPATCH HUB</text>
                  </g>
                </svg>
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pb-2 text-[11px] font-medium" style={{ color: '#9AA8BB' }}>
                  <span className="inline-flex items-center gap-2"><span className="w-7 border-t-2 border-dashed" style={{ borderColor: '#F4512A' }} />Road &amp; rail corridors</span>
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: '#FF4B2B' }} />Dispatch hub</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {usRoutes.map((route, index) => (
              <Reveal key={route.id} variant="fade-up" delay={`${index * 55}ms`}>
                <button
                  type="button"
                  aria-pressed={pinnedRoute === route.id}
                  aria-label={`Highlight the ${route.region} route on the map`}
                  onClick={() => setPinnedRoute(pinnedRoute === route.id ? null : route.id)}
                  onMouseEnter={() => setActiveRoute(route.id)}
                  onMouseLeave={() => setActiveRoute(null)}
                  onFocus={() => setActiveRoute(route.id)}
                  onBlur={() => setActiveRoute(null)}
                  className="group h-full w-full p-4 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4B2B] sm:p-5"
                  style={{ background: '#101A2C', border: `1px solid ${highlightedRoute === route.id ? '#F4512A' : 'rgba(120,150,180,0.18)'}` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{String(index + 1).padStart(2, '0')} <span className="mx-1 opacity-50">/</span> ROUTE</span>
                    <ArrowRight size={16} className="transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#FF4B2B]" style={{ color: highlightedRoute === route.id ? '#FF4B2B' : '#9BA9BC' }} />
                  </div>
                  <h3 className="mt-2 font-heading text-xl font-bold text-white transition-colors group-hover:text-[#FF7654]">{route.region}</h3>
                  <p className="mt-2 text-xs font-semibold" style={{ color: '#9BA9BC' }}>Thornton, IL <ArrowRight className="inline mx-1" size={12} style={{ color: highlightedRoute === route.id ? '#FF4B2B' : '#9BA9BC' }} /> {route.region}</p>
                  <p className="mt-2 min-h-8 text-xs leading-relaxed" style={{ color: '#9AA8BB' }}>{route.detail}</p>
                  <div className="mt-3 flex gap-1.5">
                    {['Road', 'Rail'].map((mode) => (
                      <span key={mode} className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-300" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>{mode}</span>
                    ))}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="text-center">
            <Link to="/routes" className="btn btn-secondary text-sm">
              View Route Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* INSIGHTS + OFFICE MAP                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-12 md:py-16" style={{ background: 'linear-gradient(to bottom, #0B1220 0, #0B1220 34px, #F8F8F6 34px, #F8F8F6 100%)' }}>
        <div className="absolute left-1/2 top-0 h-[2px] w-16 -translate-x-1/2 bg-[#F4512A]" />
        <div className="container-site space-y-9">

          {/* Blog Slider */}
          <Reveal variant="fade-up">
            <BlogSlider />
          </Reveal>

          {/* Google Map embed */}
          <Reveal variant="fade-up">
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="sh-h2">Find Our US Location</h2>
                <p className="text-sm text-slate-500">
                  334 W Armory Dr, Thornton, IL 60476, USA
                </p>
              </div>
              <div
                className="w-full overflow-hidden shadow-md"
                style={{ height: '22rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}
              >
                <iframe
                  src="https://www.google.com/maps?q=334%20W%20Armory%20Dr%2C%20Thornton%2C%20IL%2060476%2C%20USA&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="PPR Logistics Office Location — 334 W Armory Dr, Thornton, IL 60476, USA"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BOTTOM CTA — Dark premium strip                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-14 md:py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(90deg, rgba(11,18,32,0.96) 0%, rgba(11,18,32,0.83) 55%, rgba(11,18,32,0.68) 100%), url(${heroTruckImg}) center 48% / cover` }}
      >
        <div className="container-site relative z-10">
          <Reveal variant="fade-up">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7 lg:gap-10">

              <div className="max-w-xl space-y-3">
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: 'var(--color-primary-light)' }}
                >
                  PPR LOGISTICS · ROAD &amp; RAIL
                </span>
                <h2
                  className="text-white"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
                    fontWeight: 800,
                    lineHeight: 1.12,
                    letterSpacing: '-0.015em',
                  }}
                >
                  Ready to Move Your Next Shipment?
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
                  Connect with PPR Logistics for coordinated road and rail freight solutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/contact" className="btn btn-primary">
                  Request a Quote
                  <ArrowRight size={15} />
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  Explore Services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
