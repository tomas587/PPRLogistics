import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
  Mail,
  Truck,
  Train,
  ArrowRight,
  Globe
} from 'lucide-react';
import logoImg from '../assets/logo3.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      path: '/services',
      submenu: [
        { name: 'Road Freight', path: '/services/road', icon: <Truck size={16} />, desc: 'CMR & TIR certified land transport' },
        { name: 'Rail Freight', path: '/services/rail', icon: <Train size={16} />, desc: 'Heavy bulk wagon fleets' },
      ],
    },
    { name: 'Routes', path: '/routes' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top utility bar ── */}
      <div style={{ backgroundColor: 'var(--color-navy)' }} className="hidden md:block border-b border-white/5">
        <div className="container-site py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=334%20W%20Armory%20Dr%2C%20Thornton%2C%20IL%2060476%2C%20USA"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[var(--color-text-on-dark)] hover:text-white transition-colors text-xs font-medium"
            >
              <MapPin size={12} style={{ color: 'var(--color-primary)' }} />
              334 W Armory Dr, Thornton, IL 60476
            </a>
            <a
              href="mailto:info@prplogistic.com"
              className="flex items-center gap-1.5 text-[var(--color-text-on-dark)] hover:text-white transition-colors text-xs font-medium"
            >
              <Mail size={12} style={{ color: 'var(--color-primary)' }} />
              info@prplogistic.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span className="flex items-center gap-1">
              <Globe size={11} />
              US Location &bull; Worldwide
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{
                background: 'rgba(233,75,44,0.12)',
                color: 'var(--color-primary-light)',
                border: '1px solid rgba(233,75,44,0.2)',
              }}
            >
              24/7 Dispatch
            </span>
          </div>
        </div>
      </div>

      {/* ── Main navigation bar ── */}
      <div
        className={`bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_2px_20px_rgba(17,24,39,0.10)] border-b border-slate-100/80 backdrop-blur-sm'
            : 'border-b border-slate-100'
        }`}
      >
        <div className="container-site py-2.5 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-5">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group focus:outline-none" aria-label="PPR Logistics">
            <img
              src={logoImg}
              alt="PPR Logistics"
              className="h-12 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center justify-self-center gap-7">
            {navLinks.map((link) => {
              const isActive = link.submenu
                ? location.pathname.startsWith(link.path)
                : location.pathname === link.path;

              if (link.submenu) {
                return (
                  <div key={link.name} className="relative group/nav">
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 text-base font-semibold transition-colors duration-150 py-1 ${
                        isActive
                          ? 'text-[color:var(--color-primary)]'
                          : 'text-slate-600 hover:text-[color:var(--color-charcoal)]'
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        size={14}
                        className="text-slate-400 transition-transform duration-200 group-hover/nav:rotate-180"
                      />
                    </Link>
                    {isActive && (
                      <span
                        className="absolute -bottom-3.5 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: 'var(--color-primary)' }}
                      />
                    )}

                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white rounded-2xl shadow-[0_8px_40px_rgba(17,24,39,0.14)] border border-slate-100 p-2.5 hidden group-hover/nav:block z-50">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-2">
                        Transport Modes
                      </p>
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold transition-all duration-150 group/sub ${
                            location.pathname === sub.path
                              ? 'bg-[color:var(--color-primary-muted)] text-[color:var(--color-primary)]'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-[color:var(--color-charcoal)]'
                          }`}
                        >
                          <span
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: 'var(--color-primary-muted)',
                              color: 'var(--color-primary)',
                            }}
                          >
                            {sub.icon}
                          </span>
                          <div>
                            <div className="leading-tight">{sub.name}</div>
                            <div className="text-xs font-normal text-slate-400 mt-0.5">{sub.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-base font-semibold transition-colors duration-150 py-1 ${
                    isActive
                      ? 'text-[color:var(--color-primary)]'
                      : 'text-slate-600 hover:text-[color:var(--color-charcoal)]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      className="absolute -bottom-3.5 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'var(--color-primary)' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center justify-self-end">
            <Link to="/contact" className="btn btn-primary text-sm font-bold tracking-wide uppercase">
              Request a Quote
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {isOpen && (
        <div style={{ backgroundColor: 'var(--color-navy)' }} className="lg:hidden border-b border-white/5 shadow-2xl">
          <div className="container-site py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.submenu ? (
                  <div>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex justify-between items-center w-full text-white font-semibold py-3 border-b border-white/6 text-base"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isServicesOpen ? 'rotate-180 text-[color:var(--color-primary)]' : 'text-slate-400'}`}
                      />
                    </button>
                    {isServicesOpen && (
                      <div className="pl-4 py-2 space-y-1 border-l-2 ml-1 mt-1" style={{ borderColor: 'var(--color-primary)' }}>
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="flex items-center gap-2 py-2 text-base text-slate-300 hover:text-white font-medium transition-colors"
                          >
                            <span style={{ color: 'var(--color-primary)' }}>{sub.icon}</span>
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block py-3 border-b border-white/6 text-base font-semibold transition-colors ${
                      location.pathname === link.path
                        ? 'text-[color:var(--color-primary)]'
                        : 'text-white hover:text-[color:var(--color-primary-light)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <Link to="/contact" className="btn btn-primary w-full justify-center text-sm uppercase tracking-wide">
                Request a Quote
                <ArrowRight size={14} />
              </Link>
              <div className="text-center pt-2 space-y-1">
                <p className="text-xs text-slate-400">US Location: <span className="text-white font-medium">Thornton, IL</span></p>
                <p className="text-xs text-slate-400">info@prplogistic.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
