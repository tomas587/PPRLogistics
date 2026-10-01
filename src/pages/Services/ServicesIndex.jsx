import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Train, ArrowRight } from 'lucide-react';
import Reveal from '../../components/Reveal';

export default function ServicesIndex() {
  const serviceCards = [
    {
      title: 'International Road Freight',
      category: 'Land Fleet & Cross-Border Dispatch',
      badge: 'CMR & TIR Conventions',
      Icon: Truck,
      whatItIs: 'High-capacity tilt trailers, refrigerated trucks (reefers), and heavy-haul low-beds operating across key overland trade routes.',
      targetCustomer: 'Agricultural exporters, pharmaceutical manufacturers, heavy machinery suppliers, and distributors requiring direct door delivery.',
      pprValue: 'Direct border clearance assistance, GPS tracking, refrigerated temperature compliance, and dedicated dispatch coordination.',
      metrics: ['Door-to-Door Delivery', 'Temperature Controlled', 'TIR Border Transit'],
      link: '/services/road',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'International Rail & Wagon Freight',
      category: 'Heavy Bulk & Wagon Fleets',
      badge: 'SMGS Convention',
      Icon: Train,
      whatItIs: 'Heavy-duty wagon fleets, covered hoppers, container flatbeds, and reefer rail cars connecting major regional rail corridors.',
      targetCustomer: 'Bulk commodity traders, steel and mineral exporters, chemical industries, and suppliers requiring high-volume economical transit.',
      pprValue: 'Direct wagon fleet allocation, rail-to-road hub transfers, and SMGS border clearance.',
      metrics: ['Bulk Wagon Fleets', 'SMGS Certified', 'Intermodal Transfer'],
      link: '/services/rail',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* Page Header */}
      <section className="page-header">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="eyebrow-tag-dark inline-flex">Enterprise Transport Infrastructure</span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            Our Transport Capabilities
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
            PPR International Transport provides high-capacity freight forwarding, customs clearance, wagon allocation, and intermodal logistics planning.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface)' }}>
        <div className="container-site space-y-8">
          {serviceCards.map((service, index) => (
            <Reveal key={service.title} variant="fade-up" delay={`${index * 60}ms`}>
              <div
                className={`flex flex-col lg:flex-row items-stretch gap-6 p-5 sm:p-7 rounded-2xl group card-hover-elevation ${ index % 2 === 1 ? 'lg:flex-row-reverse' : '' }`}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Image */}
                <div className="w-full lg:w-5/12 aspect-video lg:aspect-auto min-h-[210px] rounded-xl overflow-hidden relative shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div
                    className="absolute top-4 left-4 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{
                      background: 'rgba(17,24,39,0.85)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-primary-light)',
                      borderColor: 'rgba(255,255,255,0.12)',
                    }}
                  >
                    {service.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: 'var(--color-primary-muted)', color: 'var(--color-primary)' }}
                      >
                        <service.Icon size={22} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-muted)' }}>
                          {service.category}
                        </span>
                        <h2
                          className="text-xl font-extrabold"
                          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}
                        >
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {[
                        { label: 'Capability Scope', text: service.whatItIs },
                        { label: 'Target Clients', text: service.targetCustomer },
                        { label: 'PPR Advantage', text: service.pprValue },
                      ].map(({ label, text }) => (
                        <div
                          key={label}
                          className="p-4 rounded-xl space-y-1"
                          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                        >
                          <span className="font-bold uppercase tracking-wider text-[10px] block" style={{ color: 'var(--color-primary)' }}>
                            {label}
                          </span>
                          <p className="leading-relaxed" style={{ color: 'var(--color-ink)' }}>{text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {service.metrics.map((m) => (
                        <span
                          key={m}
                          className="text-[11px] font-semibold px-3 py-1 rounded-lg"
                          style={{
                            background: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            color: 'var(--color-ink)',
                          }}
                        >
                          ✓ {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <Link to={service.link} className="btn btn-primary text-xs">
                      Explore Mode Specifications
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
