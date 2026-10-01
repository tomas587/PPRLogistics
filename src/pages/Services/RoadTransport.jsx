import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import InquiryForm from '../../components/InquiryForm';

export default function RoadTransport() {
  const points = [
    { title: 'Cross-Border Corridors', desc: 'Direct road routes connecting Turkey, Middle East, Caucasus, Russia, Central Asia, and Europe.' },
    { title: 'Specialized Trailer Fleets', desc: 'Refrigerated trucks (reefers), tilt trailers, flatbeds, and heavy load low-bed trailers.' },
    { title: 'Customs Clearance Support', desc: 'Full assistance at border terminals, transit declarations (TIR Carnet, T1/T2), and document handling.' },
    { title: 'Tracking & Telematics', desc: 'Real-time GPS tracking and temperature monitoring updates throughout the road journey.' },
  ];

  return (
    <div className="font-sans overflow-x-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* Page Header */}
      <section className="page-header">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="eyebrow-tag-dark inline-flex">Door-to-Door Delivery</span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3 flex-wrap"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            <Truck size={36} style={{ color: 'var(--color-primary-light)' }} />
            International Road Transport
          </h1>
          <p className="text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
            Reliable road shipping connecting Central Asia, Caucasus, Middle East, and European trade centers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface)' }}>
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="eyebrow-tag inline-flex">Full & Partial Truckloads (FTL/LTL)</span>
              <h2 className="sh-h2 mt-3">Flexible Cross-Border Road Freight</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              PPR is a trusted provider of international road freight, connecting markets across Central Asia, the Caucasus, the Middle East, Turkey, Russia, and Europe. With a capable fleet and certified expertise, we move everything from perishables and pharmaceuticals to heavy-lift and oversized cargo.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              Our road transport services guarantee flexible routing, consolidated door-to-door delivery, and full security. We coordinate TIR transits, manage customs clearance at border gates, and ensure temperature controls for delicate shipments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {points.map((pt) => (
                <div
                  key={pt.title}
                  className="space-y-1.5 p-4 rounded-xl"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                >
                  <h4 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--color-charcoal)' }}>
                    <CheckCircle2 size={15} className="shrink-0" style={{ color: 'var(--color-primary)' }} />
                    {pt.title}
                  </h4>
                  <p className="text-xs leading-relaxed pl-5" style={{ color: 'var(--color-muted)' }}>{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '16/10', border: '1px solid var(--color-border)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"
              alt="Logistics transport truck on road"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.75) 0%, transparent 60%)' }} />
            <div className="absolute bottom-5 left-5 right-5">
              <span
                className="text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border"
                style={{ color: 'var(--color-primary-light)', background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}
              >
                TIR Carnet &amp; CMR Convention Compliance
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
            <h2 className="sh-h2 mt-3">Road Transport Inquiry</h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Submit your trailer preferences, cargo details, and border routes for an estimate.
            </p>
          </div>
          <InquiryForm serviceType="Road Transport" />
        </div>
      </section>
    </div>
  );
}
