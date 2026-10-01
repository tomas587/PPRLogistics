import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowUp, Shield, ChevronRight, Clock } from 'lucide-react';
import footerLogo from '../assets/footer-logo.png';

const navSections = [
  {
    label: 'Company',
    links: [
      { name: 'Home',        path: '/' },
      { name: 'About PPR',   path: '/about' },
      { name: 'Routes',      path: '/routes' },
      { name: 'Contact Us',  path: '/contact' },
    ],
  },
  {
    label: 'Services',
    links: [
      { name: 'Road Freight',         path: '/services/road' },
      { name: 'Rail & Wagon Freight', path: '/services/rail' },
      { name: 'All Services',         path: '/services' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--color-navy)' }} className="font-sans">
      {/* ── Thin PPR brand accent line at the very top ── */}
      <div style={{ height: '3px', background: 'var(--color-primary)' }} />

      {/* ── Main grid ── */}
      <div className="container-site pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* Brand column — 4 cols */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="PPR Logistics home">
              <img
                src={footerLogo}
                alt="PPR Logistics — Delivering More. Connecting Futures."
                className="h-auto w-[240px] max-w-full object-contain sm:w-[270px]"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-on-dark)' }}>
              PPR International Transport &amp; Logistics — road and rail freight forwarding connecting regional trade corridors.
            </p>
            {/* Compliance badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'var(--color-primary-muted)',
                color: 'var(--color-primary-light)',
                border: '1px solid rgba(233,75,44,0.20)',
              }}
            >
              <Shield size={12} style={{ color: 'var(--color-primary)' }} />
              CMR &amp; SMGS Standardized Carrier
            </div>
          </div>

          {/* Navigation columns — 2 cols each */}
          {navSections.map((section) => (
            <div key={section.label} className="lg:col-span-2">
              <h5
                className="text-white text-[11px] font-bold uppercase tracking-[0.12em] mb-4"
              >
                {section.label}
              </h5>
              <ul className="space-y-2.5">
                {section.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      to={l.path}
                      className="flex items-center gap-1.5 text-sm transition-colors duration-150 group"
                      style={{ color: 'var(--color-text-on-dark)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-on-dark)')}
                    >
                      <ChevronRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column — 4 cols */}
          <div className="lg:col-span-4">
            <h5 className="text-white text-[11px] font-bold uppercase tracking-[0.12em] mb-4">
              Contact
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-on-dark)' }}>
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <p className="text-white text-xs font-semibold mb-0.5">US Location</p>
                  <p className="text-xs">334 W Armory Dr, Thornton, IL 60476, USA</p>
                </div>
              </li>
              <li>
                <a
                  href="mailto:info@prplogistic.com"
                  className="flex items-start gap-3 text-sm transition-colors duration-150"
                  style={{ color: 'var(--color-text-on-dark)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-on-dark)')}
                >
                  <Mail size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <p className="text-white text-xs font-semibold mb-0.5">Email</p>
                    <p className="text-xs" style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)' }}>
                      info@prplogistic.com
                    </p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-on-dark)' }}>
                <Clock size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <p className="mb-0.5 text-xs font-semibold text-white">Dispatch Support</p>
                  <p className="text-xs">Available 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Real office addresses strip ── */}
        <div
          className="mt-8 pt-6 grid grid-cols-1 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {[
            {
              label: 'US Location',
              address: '334 W Armory Dr, Thornton, IL 60476, USA',
            },
          ].map(({ label, address }) => (
            <div key={label} className="flex items-start gap-3">
              <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
              <div>
                <p className="text-white text-xs font-semibold mb-0.5">{label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-on-dark)' }}>
                  {address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left" style={{ color: '#64748B' }}>
            &copy; {new Date().getFullYear()} PPR International Transport &amp; Logistics Co. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs" style={{ color: '#64748B' }}>
              Privacy Policy &nbsp;·&nbsp; Terms of Service
            </span>
            <a
              href="#top"
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94A3B8',
              }}
              aria-label="Back to top"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
