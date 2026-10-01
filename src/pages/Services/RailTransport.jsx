import React from 'react';
import { Train, CheckCircle2 } from 'lucide-react';
import InquiryForm from '../../components/InquiryForm';

export default function RailTransport() {
  const specs = [
    { title: 'Extensive Coverage', desc: 'Direct rail connections to key Central Asia, Caucasus, Europe, and China destinations.' },
    { title: 'Diverse Fleet Options', desc: 'Covered wagons, flatbeds for containers, reefer wagons, liquid tanks, and heavy-duty oversized wagons.' },
    { title: 'Cargo Specialization', desc: 'Petrochemicals, bulk raw materials, industrial machinery, food products, and vehicles.' },
    { title: 'Value-Added Services', desc: 'Customs clearance coordination, cargo documentation, and daily wagon status updates.' },
  ];

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* Page Header */}
      <section className="page-header">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="eyebrow-tag-dark inline-flex">Specialized Wagon & Rail Shipping</span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3 flex-wrap"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            <Train size={36} style={{ color: 'var(--color-primary-light)' }} />
            Rail Transport Solutions
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
            Economical and efficient long-haul bulk shipping connecting Central Asia, China, Russia, and Europe.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface)' }}>
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="eyebrow-tag inline-flex">Wagon & Container Logistics</span>
              <h2 className="sh-h2 mt-3">International Rail Freight Forwarding</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              PPR is a leading provider of international rail freight services, offering secure, efficient, and cost-effective transport solutions across major trade corridors. With a modern fleet and strong regional partnerships, PPR connects businesses to Central Asia, the Caucasus, Turkey, Russia, China, and Europe.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              Rail freight is the most economical solution for large volumes over long distances. It offers high capacity to move significant loads in a single operation, with lower fuel consumption compared to road transport.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {specs.map((item) => (
                <div
                  key={item.title}
                  className="space-y-1.5 p-4 rounded-xl"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                >
                  <h4 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={15} className="shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed pl-5" style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '16/10', border: '1px solid var(--color-border)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800"
              alt="Cargo train freight logistics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.75) 0%, transparent 60%)' }} />
            <div className="absolute bottom-5 left-5 right-5">
              <span
                className="text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border"
                style={{ color: 'var(--color-primary-light)', background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}
              >
                SMGS Convention &amp; Wagon Fleet Operations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-12 md:py-14" style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container-site">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="eyebrow-tag">Rate Calculation</span>
            <h2 className="sh-h2 mt-3">Rail Freight Inquiry</h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Submit your cargo specifications, wagon type requirements, and routes for a detailed proposal.
            </p>
          </div>
          <InquiryForm serviceType="Rail Transport" />
        </div>
      </section>
    </div>
  );
}
