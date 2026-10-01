import React from 'react';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

export default function RoutesPage() {
  const transitHubs = [
    {
      name: 'Northeast',
      role: 'Regional freight routes connecting the Northeast from Thornton, Illinois.',
    },
    {
      name: 'Midwest',
      role: 'Great Lakes and Midwest freight routes coordinated from our Illinois hub.',
    },
    {
      name: 'South',
      role: 'Road and rail freight connections serving Southern states.',
    },
    {
      name: 'West',
      role: 'Regional freight routes connecting destinations across the Western states.',
    },
  ];

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* Page Header */}
      <section className="page-header">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="eyebrow-tag-dark inline-flex">US Domestic Network</span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            US Regional Routes
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
            Road and rail freight connections from Thornton, Illinois to the Northeast, Midwest, South, and West.
          </p>
        </div>
      </section>

      {/* Corridor Details */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface)' }}>
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Text */}
          <Reveal variant="fade-up">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="eyebrow-tag inline-flex">Domestic Network</span>
                <h2 className="sh-h2 mt-3">Regional Freight Routes Across the US</h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                Our US network connects the Northeast, Midwest, South, and West through regional freight routes coordinated from Thornton, Illinois.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                Choose road or rail service based on your cargo, timing, and destination. Our team can coordinate routing and shipment details for each lane.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                We coordinate short- and long-haul connections for industrial equipment, steel, food commodities, and general cargo.
              </p>

              {/* Key Advantages */}
              <div
                className="p-6 rounded-2xl space-y-4"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h4
                  className="font-extrabold text-sm flex items-center gap-2"
                  style={{ color: 'var(--color-charcoal)' }}
                >
                  <Compass size={16} style={{ color: 'var(--color-primary)' }} />
                  Route Services
                </h4>
                <ul className="text-xs space-y-2.5" style={{ color: 'var(--color-ink)' }}>
                  {[
                    'Road freight routes across all four US regions.',
                    'Rail freight coordination for regional and long-haul shipments.',
                    'Routing support from the Thornton, Illinois location.',
                    'Shipment planning based on cargo, destination, and schedule.',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Visual + Hubs */}
          <Reveal variant="fade-up" delay="100ms">
            <div className="space-y-6">
              {/* Video card */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-xl aspect-video flex items-center justify-center"
                style={{ background: 'var(--color-navy)', border: '1px solid var(--color-border)' }}
              >
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.75 }}>
                  <source
                    type="video/mp4"
                    src="https://prplogistic.com/wp-content/uploads/2025/09/double_exposure_of_two_businessmen_handshake_with_world_map_and.mp4"
                  />
                </video>
                <div className="absolute inset-0" style={{ background: 'rgba(17,24,39,0.55)' }} />
                <div className="relative z-10 text-center p-6 text-white space-y-2">
                  <h3 className="font-extrabold text-xl md:text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
                    US Regional Routes
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--color-text-on-dark)' }}>Four regions, coordinated from Thornton, Illinois</p>
                </div>
              </div>

              {/* Hub list */}
              <div>
                <h3
                  className="font-extrabold text-base mb-4"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}
                >
                  US Regional Route Coverage
                </h3>
                <div className="space-y-3">
                  {transitHubs.map((hub, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 rounded-2xl text-sm card-hover"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-card)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5"
                        style={{
                          background: 'var(--color-primary-muted)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm" style={{ color: 'var(--color-charcoal)' }}>{hub.name}</h4>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{hub.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-14" style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container-site max-w-3xl mx-auto">
          <Reveal variant="fade-up">
            <div
              className="rounded-3xl p-10 text-center space-y-5 relative overflow-hidden"
              style={{
                background: 'var(--color-navy)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'var(--shadow-float)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(233,75,44,0.18) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white relative z-10"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Ready to Schedule a Route Transit?
              </h2>
              <p className="text-xs sm:text-sm max-w-lg mx-auto leading-relaxed relative z-10" style={{ color: 'var(--color-text-on-dark)' }}>
                Contact our route coordinators for US road and rail shipping rates and schedules.
              </p>
              <div className="pt-2 relative z-10">
                <Link to="/contact" className="btn btn-primary">
                  Get Custom Route Quote
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
