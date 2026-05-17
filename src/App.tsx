import {
  Building2, Phone, Mail, MapPin, CheckCircle, Users, Home, Shield,
  TrendingUp, Clock, Award, Star, FileText, AlertTriangle, UserPlus,
  Menu, X, ArrowRight, ChevronRight
} from 'lucide-react';
import { ContactForm } from './components/ContactForm';
import { ViolationReportForm } from './components/ViolationReportForm';
import { BoardNominationForm } from './components/BoardNominationForm';
import { useState, useEffect } from 'react';

function App() {
  const [activeForm, setActiveForm] = useState<'contact' | 'violation' | 'nomination'>('contact');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-18 flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              scrolled ? 'bg-navy-800' : 'bg-white/15 backdrop-blur-sm'
            }`}>
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className={`block text-[15px] font-semibold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-navy-900' : 'text-white'
              }`}>Stellar Property Group</span>
              <span className={`block text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                scrolled ? 'text-slate-500' : 'text-white/70'
              }`}>Chicago</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'About', 'Why Us', 'Forms', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? 'text-slate-600 hover:text-navy-800'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="https://stellarpropertygrp.appfolio.com/connect/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
            >
              Make a Payment
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-navy-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-5 py-4 space-y-1 shadow-lg animate-fade-in">
            {[
              { label: 'Services', href: '#services' },
              { label: 'About', href: '#about' },
              { label: 'Why Choose Us', href: '#why-us' },
              { label: 'Forms', href: '#forms' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-navy-800 font-medium text-sm transition-colors"
              >
                {label}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
            <div className="pt-3 pb-1">
              <a
                href="https://stellarpropertygrp.appfolio.com/connect/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-navy-800 text-white font-semibold text-sm py-3 rounded-lg hover:bg-navy-700 transition-colors"
              >
                Make a Payment
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1560932/pexels-photo-1560932.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Chicago skyline"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
        </div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-32 lg:py-40 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                Chicago & North Shore Since 2007
              </div>
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-6 text-balance">
                Property Management,<br />
                <span className="text-gold-400">Elevated.</span>
              </h1>
              <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
                Specializing in condominium, HOA, and townhome management with over 18 years of local expertise. Trusted by 50+ communities across Chicagoland.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#forms"
                  className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-7 py-3.5 rounded-lg hover:bg-slate-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:7737280652"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-white/15 transition-all duration-200 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  773.728.0652
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-up delay-200">
              {[
                { value: '50+', label: 'Communities', sub: 'Under management' },
                { value: '2,450+', label: 'Units', sub: 'Across Chicago' },
                { value: '96%', label: 'Retention', sub: 'Client satisfaction' },
                { value: '18+', label: 'Years', sub: 'Local expertise' },
              ].map(({ value, label, sub }) => (
                <div
                  key={label}
                  className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="text-4xl font-bold text-white mb-1">{value}</div>
                  <div className="text-sm font-semibold text-white/80">{label}</div>
                  <div className="text-xs text-white/45 mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span className="uppercase tracking-widest text-[10px]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section id="services" className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-600 mb-3">What We Do</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-4">
              Full-Service Property Management
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Tailored solutions for Chicago's condominium associations, HOAs, and townhome communities — from daily operations to long-term strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, title: 'Condominium Management', desc: 'Complete management solutions for condo associations, from daily operations to long-term capital planning.' },
              { icon: Users, title: 'HOA Management', desc: 'Expert homeowners association management focused on community engagement, governance, and compliance.' },
              { icon: Building2, title: 'Townhome Management', desc: 'Personalized services tailored to townhome communities with dedicated attention to every detail.' },
              { icon: TrendingUp, title: 'Financial Management', desc: 'Transparent reporting, budgeting, and accounting with proven cost-reduction strategies.' },
              { icon: Shield, title: 'Maintenance Coordination', desc: 'Proactive scheduling and vendor management to protect property value and resident satisfaction.' },
              { icon: Award, title: 'Board Support', desc: 'Meeting coordination, documentation, governance guidance, and strategic planning support.' },
              { icon: Clock, title: 'Administrative Services', desc: 'Streamlined operations, correspondence management, and compliance record-keeping.' },
              { icon: CheckCircle, title: 'Capital Project Management', desc: 'Expert oversight of major renovations and infrastructure projects from bid to completion.' },
              { icon: Star, title: 'Resident Relations', desc: 'Dedicated communications channels and responsive support that keeps communities thriving.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-slate-100"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-50 flex items-center justify-center mb-5 group-hover:bg-navy-800 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-navy-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────── */}
      <section id="why-us" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-600 mb-3">The Difference</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-6">
                Why Boards Choose Stellar
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                We're not a large national firm that treats your community as a number. We're Chicago specialists who know the neighborhoods, the laws, and the vendors — and we prove it every day.
              </p>

              <div className="space-y-5">
                {[
                  { title: '18+ Years of Local Expertise', desc: 'Deep understanding of Illinois condo law, Chicago regulations, and North Shore market nuances.' },
                  { title: 'CAI & IREM Certified Professionals', desc: 'Our team holds industry-leading credentials including CAM, PCAM, CPM, and CCIM designations.' },
                  { title: '24/7 Emergency Response', desc: 'Round-the-clock availability for urgent issues — real people answer, not voicemail.' },
                  { title: 'Guaranteed Cost Savings', desc: 'Our vendor network and negotiating leverage routinely reduces operating costs for associations.' },
                  { title: 'Transparent, Flat-Fee Pricing', desc: 'Customized, not percentage-based — aligned with your interests, not transaction volume.' },
                  { title: 'Board-First Communication', desc: 'Monthly reports, real-time portals, and a dedicated manager for your community.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div className="w-5 h-5 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-navy-800 transition-colors duration-200">
                      <CheckCircle className="w-3 h-3 text-navy-700 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{title}</p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: accent card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-navy-100 to-navy-50 rounded-3xl -z-10" />
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Chicago residential building"
                className="w-full rounded-2xl shadow-glass object-cover aspect-[4/3]"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-card flex items-center gap-5">
                <div className="text-center flex-1 border-r border-slate-100 pr-5">
                  <div className="text-2xl font-bold text-navy-900">96%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Retention Rate</div>
                </div>
                <div className="text-center flex-1 border-r border-slate-100 pr-5">
                  <div className="text-2xl font-bold text-navy-900">50+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Communities</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-navy-900">18yr</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3">Our Story</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Chicago's Trusted Property Partner Since 2007
              </h2>
              <p className="text-white/65 leading-relaxed mb-5 text-lg">
                Since 2007, Stellar Property Group has specialized exclusively in Chicago and North Shore property management — condominiums, HOAs, and townhomes only. That focus isn't a limitation; it's why we outperform generalist firms.
              </p>
              <p className="text-white/65 leading-relaxed mb-5">
                We've earned a 96% client retention rate by treating every community as our only one. Our team of certified professionals holds credentials from CAI, IREM, and CCIM, and we're fully licensed by IDFPR.
              </p>
              <p className="text-white/65 leading-relaxed mb-10">
                When your board is ready for a management partner that responds, reports, and delivers — we're ready to talk.
              </p>
              <a
                href="#forms"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-sm"
              >
                Request a Proposal
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Service areas */}
            <div className="bg-white/6 border border-white/10 rounded-2xl p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-6">Service Areas</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Chicago', 'Glenview', 'Northbrook', 'Wilmette',
                  'Winnetka', 'Highland Park', 'Evanston', 'Skokie',
                  'Glencoe', 'Kenilworth', 'Lake Forest', 'Deerfield',
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-white/75 text-sm">
                    <span className="w-1 h-1 rounded-full bg-gold-400 flex-shrink-0" />
                    {area}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/45 text-sm">
                  ...and 68+ additional communities across the greater Chicago area.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                {['CAI Certified', 'IREM Member', 'IDFPR Licensed', 'CCIM Designated'].map((c) => (
                  <span key={c} className="inline-block border border-white/20 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Forms ──────────────────────────────────────────────── */}
      <section id="forms" className="py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy-600 mb-3">Get in Touch</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-4">Forms & Requests</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Submit an inquiry, report a violation, or apply for a board seat — all handled promptly and professionally.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveForm('contact')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeForm === 'contact'
                  ? 'bg-navy-800 text-white shadow-lg shadow-navy-900/20'
                  : 'bg-white text-slate-600 hover:text-navy-800 border border-slate-200 hover:border-navy-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Contact Form
            </button>
            <button
              onClick={() => setActiveForm('violation')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeForm === 'violation'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/20'
                  : 'bg-white text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Violation Report
            </button>
            <button
              onClick={() => setActiveForm('nomination')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeForm === 'nomination'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                  : 'bg-white text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Board Nomination
            </button>
          </div>

          {/* Form panel */}
          <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
            {activeForm === 'contact' && <ContactForm />}
            {activeForm === 'violation' && <ViolationReportForm />}
            {activeForm === 'nomination' && <BoardNominationForm />}
          </div>

          {/* Trust row */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: Clock, title: '24hr Response', sub: 'All inquiries answered within one business day' },
              { icon: Shield, title: 'Secure & Confidential', sub: 'Your information is protected' },
              { icon: CheckCircle, title: 'No Obligation', sub: 'Free consultations and custom quotes' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <Icon className="w-5 h-5 text-navy-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="bg-navy-950 rounded-3xl overflow-hidden">
            <div className="relative px-8 py-16 lg:px-16 lg:py-20">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/3" />

              <div className="grid lg:grid-cols-2 gap-12 items-center relative">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3">Contact Us</p>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Ready to Talk?
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Whether you're switching managers or starting fresh, we'll show you what professional management looks like. No pressure — just answers.
                  </p>
                  <a
                    href="#forms"
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
                  >
                    Request a Proposal
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      icon: MapPin,
                      title: 'Office',
                      lines: ['5107 N Western Ave, Suite 1S', 'Chicago, Illinois 60625'],
                    },
                    {
                      icon: Phone,
                      title: 'Phone',
                      lines: ['773.728.0652'],
                      href: 'tel:7737280652',
                      sub: '24/7 Emergency Line',
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      lines: ['service@stellarpropertygroup.com'],
                      href: 'mailto:service@stellarpropertygroup.com',
                    },
                  ].map(({ icon: Icon, title, lines, href, sub }) => (
                    <div key={title} className="flex items-start gap-4 bg-white/6 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors duration-200">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gold-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">{title}</p>
                        {lines.map((line) =>
                          href ? (
                            <a key={line} href={href} className="block text-sm text-white/80 hover:text-white transition-colors">{line}</a>
                          ) : (
                            <p key={line} className="text-sm text-white/80">{line}</p>
                          )
                        )}
                        {sub && <p className="text-xs text-white/35 mt-0.5">{sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-slate-400 py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">Stellar Property Group</span>
              </div>
              <p className="text-sm leading-relaxed">
                Professional property management for Chicago and North Shore communities since 2007.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                {['Condominium Management', 'HOA Management', 'Townhome Management', 'Financial Management'].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'About Us', href: '#about' },
                  { label: 'Our Services', href: '#services' },
                  { label: 'Why Choose Us', href: '#why-us' },
                  { label: 'Contact', href: '#contact' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>5107 N Western Ave, Suite 1S</li>
                <li>Chicago, IL 60625</li>
                <li><a href="tel:7737280652" className="hover:text-white transition-colors">773.728.0652</a></li>
                <li>
                  <a href="mailto:service@stellarpropertygroup.com" className="hover:text-white transition-colors break-all">
                    service@stellarpropertygroup.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">© 2024 Stellar Property Group. All rights reserved.</p>
            <div className="flex items-center gap-3 text-xs">
              {['CAI Certified', 'IREM Member', 'IDFPR Licensed'].map((c, i, arr) => (
                <span key={c} className="flex items-center gap-3">
                  {c}
                  {i < arr.length - 1 && <span className="text-slate-700">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
