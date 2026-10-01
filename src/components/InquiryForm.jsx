import React, { useState } from 'react';
import { Send, CheckCircle, Shield, Clock, FileText, MapPin } from 'lucide-react';

export default function InquiryForm({ serviceType = 'General Freight' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    origin: '',
    destination: '',
    weight: '',
    volume: '',
    commodity: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        origin: '',
        destination: '',
        weight: '',
        volume: '',
        commodity: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200/80 max-w-3xl mx-auto font-sans">
      {isSuccess ? (
        <div className="text-center py-12 space-y-5 animate-fade-in-up">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-green-200">
            <CheckCircle size={36} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900">Inquiry Received</h3>
            <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
              Your shipping inquiry for <strong className="text-primary">{serviceType}</strong> has been transmitted to our global logistics dispatch.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl max-w-md mx-auto text-xs text-slate-500 border border-slate-100 flex items-center justify-center gap-2">
            <Clock size={16} className="text-primary shrink-0" />
            <span>Our route engineering team will issue your custom rate breakdown within 24 hours.</span>
          </div>
          <div className="pt-4">
            <button
              onClick={() => setIsSuccess(false)}
              className="btn-primary"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-100 space-y-1">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              Enterprise Rate Engine
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 pt-2">Request Freight Rate & SLA Quote</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Complete the shipment parameters for {serviceType}. Our logistics engineers will calculate optimal routing.
            </p>
          </div>

          {/* Contact Information Group */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText size={14} className="text-primary" />
              1. Contact Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Smith"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Global Trading Corp"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Route & Cargo Group */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" />
              2. Origin, Destination & Cargo Parameters
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origin */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Origin City / Port *
                </label>
                <input
                  type="text"
                  name="origin"
                  required
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g. Chicago, USA"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Destination City / Port *
                </label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Los Angeles, USA"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Total Gross Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 24,000 kg / 24 Tons"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>

              {/* Volume */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Volume / Container Count
                </label>
                <input
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  placeholder="e.g. 68 CBM / 2x 40ft HQ"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Commodity */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Commodity & HS Code Description *
              </label>
              <input
                type="text"
                name="commodity"
                required
                value={formData.commodity}
                onChange={handleChange}
                placeholder="e.g. Industrial machinery, steel coils, food grade grains"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Special Handling Requirements
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Indicate temperature control specs, dangerous goods classifications (IMDG/ADR), or target delivery deadlines..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-slate-800 resize-none"
              />
            </div>
          </div>

          {/* Submit Button & SLA guarantee */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-primary/25 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Route Quote...
                </>
              ) : (
                <>
                  Transmit Quote Request
                  <Send size={15} />
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-slate-400 font-medium pt-1">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} className="text-primary" />
                Guaranteed 24-Hour SLA Reply
              </span>
              <span className="inline-flex items-center gap-1">
                <Shield size={13} className="text-primary" />
                End-to-End Cargo Insurance
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
