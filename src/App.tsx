import { Building2, Phone, Mail, MapPin, CheckCircle, Users, Home, Shield, TrendingUp, Clock, Award, Star, FileText, AlertTriangle, UserPlus, Menu, X } from 'lucide-react';
import { ContactForm } from './components/ContactForm';
import { ViolationReportForm } from './components/ViolationReportForm';
import { BoardNominationForm } from './components/BoardNominationForm';
import { useState } from 'react';

function App() {
  const [activeForm, setActiveForm] = useState<'contact' | 'violation' | 'nomination'>('contact');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Stellar Property Group</h1>
                <p className="text-xs sm:text-sm text-gray-600">Chicago Property Management</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#why-us" className="text-gray-700 hover:text-blue-600 transition-colors">Why Choose Us</a>
              <a href="#forms" className="text-gray-700 hover:text-blue-600 transition-colors">Forms</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <a href="https://stellarpropertygrp.appfolio.com/oportal/users/log_in" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Make a Payment</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#services"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#why-us"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Why Choose Us
                </a>
                <a
                  href="#forms"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Forms
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="https://stellarpropertygrp.appfolio.com/oportal/users/log_in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Make a Payment
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Expert Property Management for Chicago Communities
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Specializing in condominium, HOA, and townhome management with over 18 years of local expertise. We manage 2,450+ units across 50+ communities with a 96% client retention rate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                  Get Started
                </a>
                <a href="tel:7737280652" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors text-center">
                  Call Us Today
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-700">Communities Managed</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">2,450+</div>
                <div className="text-gray-700">Units Under Management</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">96%</div>
                <div className="text-gray-700">Client Retention Rate</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">18+</div>
                <div className="text-gray-700">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Property Management Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide full-service property management tailored to the unique needs of Chicago's condominium associations, HOAs, and townhome communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Home className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Condominium Management</h3>
              <p className="text-gray-700">Complete management solutions for condominium associations, from daily operations to long-term planning.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">HOA Management</h3>
              <p className="text-gray-700">Expert homeowners association management with focus on community engagement and compliance.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Townhome Management</h3>
              <p className="text-gray-700">Specialized services for townhome communities with personalized attention to detail.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Management</h3>
              <p className="text-gray-700">Transparent financial reporting, budgeting, and accounting services with guaranteed savings.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maintenance Coordination</h3>
              <p className="text-gray-700">Proactive maintenance scheduling and vendor management to protect your property investment.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Board Support</h3>
              <p className="text-gray-700">Comprehensive board assistance including meeting coordination, documentation, and governance support.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Administrative Services</h3>
              <p className="text-gray-700">Professional administrative support to streamline operations and communications.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Capital Project Management</h3>
              <p className="text-gray-700">Expert oversight of major capital projects from planning through completion.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Star className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resident Relations</h3>
              <p className="text-gray-700">Dedicated support for resident communications, concerns, and community satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Stellar Property Group?</h2>
            <p className="text-xl text-gray-600">Experience the difference of working with Chicago's trusted property management experts</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">18+ Years of Local Expertise</h3>
                <p className="text-gray-700">Deep understanding of Chicago and North Shore property management regulations and best practices.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">CAI Certified Professionals</h3>
                <p className="text-gray-700">Our team holds industry-leading certifications including CAI, IREM, and CCIM credentials.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">24/7 Emergency Response</h3>
                <p className="text-gray-700">Round-the-clock availability for urgent matters, ensuring your property is always protected.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Guaranteed Savings</h3>
                <p className="text-gray-700">We work to reduce costs for your association through strategic vendor relationships and efficient operations.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-700">Customized, not percentage-based pricing tailored to your property's specific needs and size.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Board-Focused Approach</h3>
                <p className="text-gray-700">We prioritize strong communication and collaboration with your board to achieve your community's goals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Stellar Property Group</h2>
              <p className="text-lg text-gray-700 mb-6">
                Since 2007, we have specialized in property management for Chicago and North Shore suburbs, exclusively serving condominiums, HOAs, and townhomes. Our commitment to excellence has earned us a 96% client retention rate and the trust of over 50 communities.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We understand that every community is unique. That's why we take a personalized approach to property management, customizing our services to meet the specific needs and goals of each association we serve.
              </p>
              <p className="text-lg text-gray-700">
                Our team of certified professionals brings decades of combined experience and holds credentials from leading industry organizations including CAI, IREM, and CCIM. We're fully licensed by IDFPR and maintain memberships with national property management associations.
              </p>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Service Areas</h3>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div>Chicago</div>
                <div>Glenview</div>
                <div>Northbrook</div>
                <div>Wilmette</div>
                <div>Winnetka</div>
                <div>Highland Park</div>
                <div className="col-span-2 mt-4 pt-4 border-t border-blue-400">
                  <p className="font-semibold">...and 68+ additional communities across the Chicago area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section id="forms" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Forms & Reports</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Submit your inquiry or report violations online. All submissions are handled promptly and professionally.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveForm('contact')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeForm === 'contact'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Contact Form</span>
              </button>
              <button
                onClick={() => setActiveForm('violation')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeForm === 'violation'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Violation Report</span>
              </button>
              <button
                onClick={() => setActiveForm('nomination')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeForm === 'nomination'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <UserPlus className="w-5 h-5" />
                <span>Board Nomination</span>
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeForm === 'contact' && <ContactForm />}
            {activeForm === 'violation' && <ViolationReportForm />}
            {activeForm === 'nomination' && <BoardNominationForm />}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-sm text-gray-600">We respond to all inquiries within 24 hours</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Secure Submission</h3>
              <p className="text-sm text-gray-600">Your information is protected and confidential</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No Obligation</h3>
              <p className="text-sm text-gray-600">Free consultation and customized quotes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-blue-100">Ready to experience exceptional property management? Contact us today for a customized consultation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Visit Us</h3>
              <p className="text-blue-100">
                Stellar Property Management<br />
                5107 N Western Ave<br />
                Suite 1S<br />
                Chicago, Illinois 60625
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Call Us</h3>
              <a href="tel:7737280652" className="text-blue-100 hover:text-white transition-colors text-lg">
                773.728.0652
              </a>
              <p className="text-sm text-blue-200 mt-2">24/7 Emergency Line</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Email Us</h3>
              <a href="mailto:service@stellarpropertygroup.com" className="text-blue-100 hover:text-white transition-colors break-all">
                service@stellarpropertygroup.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6 text-blue-400" />
                <span className="text-white font-bold">Stellar Property Group</span>
              </div>
              <p className="text-sm">
                Professional property management services for Chicago and North Shore communities since 2007.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>Condominium Management</li>
                <li>HOA Management</li>
                <li>Townhome Management</li>
                <li>Financial Management</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>5107 N Western Ave, Suite 1S</li>
                <li>Chicago, IL 60625</li>
                <li><a href="tel:7737280652" className="hover:text-white transition-colors">773.728.0652</a></li>
                <li><a href="mailto:service@stellarpropertygroup.com" className="hover:text-white transition-colors break-all">service@stellarpropertygroup.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 Stellar Property Group. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
              <span>CAI Certified</span>
              <span>•</span>
              <span>IREM Member</span>
              <span>•</span>
              <span>IDFPR Licensed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
