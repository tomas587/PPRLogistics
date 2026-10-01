import React from 'react';
import { Target, Compass, Award, Users, MapPin, Mail } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function About() {
  const values = [
    {
      Icon: Target,
      title: 'Our Mission',
      desc: 'To construct the most resilient, cost-effective, and transparent multimodal transport bridges connecting global trade corridors.',
    },
    {
      Icon: Compass,
      title: 'Corridor Strategy',
      desc: 'Deploying dedicated wagon fleets, road trucks, and port handling infrastructure to optimize end-to-end cargo transit.',
    },
    {
      Icon: Award,
      title: 'Quality & Governance',
      desc: 'Strict compliance with international standards — CMR for road haulage and SMGS for rail freight — to safeguard every shipment.',
    },
    {
      Icon: Users,
      title: 'Client Accountability',
      desc: 'Building long-term relationships with total transparency, real-time dispatch reporting, and a dedicated point of contact.',
    },
  ];

  const offices = [
    {
      name: 'US Location',
      address: '334 W Armory Dr, Thornton, IL 60476, USA',
      email: 'info@prplogistic.com',
    },
  ];

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* Page Header */}
      <section className="page-header">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="eyebrow-tag-dark inline-flex">
            Corporate Architecture &amp; Capabilities
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            About PPR Logistics
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
            Discover the operational standards, freight capabilities, and US location backing PPR International Transport.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface)' }}>
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <Reveal variant="slide-right">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="eyebrow-tag inline-flex">International Transport Leader</span>
                <h2 className="sh-h2 mt-3">PPR International Transport &amp; Logistics Co.</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                At PPR, we are more than a transport company — we are the vital supply chain infrastructure that connects enterprise markets and accelerates commercial growth. With deep expertise, skilled route dispatchers, and an agile network across strategic corridors, we deliver integrated logistics solutions that ensure speed, transparency, and cost efficiency.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                PPR combines road and rail freight with tailored multimodal routes to handle cargo ranging from oversized and heavy-lift project shipments to temperature-controlled and time-critical goods.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                Our capabilities extend to international freight forwarding, customs clearance, cargo documentation, and last-mile coordination.
              </p>
              {/* Quote block */}
              <div
                className="p-5 rounded-r-2xl"
                style={{
                  background: 'var(--color-bg)',
                  borderLeft: '4px solid var(--color-primary)',
                  border: '1px solid var(--color-border)',
                  borderLeftWidth: '4px',
                  borderLeftColor: 'var(--color-primary)',
                }}
              >
                <p className="text-sm leading-relaxed italic font-medium" style={{ color: 'var(--color-charcoal)' }}>
                  &ldquo;What sets PPR apart is our unwavering commitment to professionalism, accountability, and industry-specific solutions — not merely moving cargo, but building long-term strategic partnerships.&rdquo;
                </p>
                <span className="block mt-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                  — Management Board, PPR Logistics
                </span>
              </div>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal variant="fade-in" delay="150ms">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl img-hover-scale"
              style={{ aspectRatio: '5/4', border: '1px solid var(--color-border)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800"
                alt="Corporate logistics planning meeting"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.80) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span
                  className="text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border"
                  style={{
                    color: 'var(--color-primary-light)',
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.12)',
                  }}
                >
                  Supply Chain Execution
                </span>
                <h3
                  className="font-extrabold text-xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Logistics Engineered As Strategy
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Operational Pillars */}
      <section className="py-14 md:py-16" style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-site space-y-8">
          <Reveal variant="fade-up">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="eyebrow-tag">Foundations</span>
              <h2 className="sh-h2 mt-3">Our Operational Pillars</h2>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>The underlying principles guiding our global cargo management.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} variant="fade-up" delay={`${i * 75}ms`}>
                <div className="feature-card h-full">
                  <div className="feature-card__icon">
                    <v.Icon size={18} />
                  </div>
                  <h3
                    className="font-bold text-sm"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real Office Cards */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface)' }}>
        <div className="container-site space-y-8">
          <Reveal variant="fade-up">
            <div className="max-w-xl space-y-2">
              <span className="eyebrow-tag">US Presence</span>
              <h2 className="sh-h2 mt-3">Our Office Locations</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Visit or contact our US location.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 max-w-2xl">
            {offices.map((office, i) => (
              <Reveal key={office.name} variant="fade-up" delay={`${i * 100}ms`}>
                <div
                  className="p-6 sm:p-8 rounded-2xl space-y-5"
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <h3
                    className="font-extrabold"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      color: 'var(--color-charcoal)',
                      borderBottom: '1px solid var(--color-border)',
                      paddingBottom: '0.75rem',
                    }}
                  >
                    {office.name}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                      <span style={{ color: 'var(--color-ink)' }}>{office.address}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                      <a
                        href={`mailto:${office.email}`}
                        className="font-semibold hover:underline"
                        style={{ color: 'var(--color-charcoal)' }}
                      >
                        {office.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
