import { useState } from 'react';
import { Mail, Phone, User, Building, MessageSquare, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiry_type: string;
  property_address: string;
  number_of_units: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry_type: 'general',
    property_address: '',
    number_of_units: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Contact Form: ${formData.inquiry_type} - ${formData.name}`
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          inquiry_type: 'general',
          property_address: '',
          number_of_units: '',
          message: ''
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <p className="font-semibold">Thank you for contacting us!</p>
          <p className="text-sm">We'll respond to your inquiry shortly at {formData.email}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm">Please try again or call us directly at 773.728.0652</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="(773) 555-0123"
            />
          </div>

          <div>
            <label htmlFor="company" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-2" />
              Company/Association
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Your Association Name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry_type" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            Inquiry Type *
          </label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            required
            value={formData.inquiry_type}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="general">General Inquiry</option>
            <option value="property_management">Property Management Services</option>
            <option value="quote">Request a Quote</option>
            <option value="maintenance">Maintenance Request</option>
          </select>
        </div>

        {(formData.inquiry_type === 'property_management' || formData.inquiry_type === 'quote') && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="property_address" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Property Address
              </label>
              <input
                type="text"
                id="property_address"
                name="property_address"
                value={formData.property_address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="123 Main St, Chicago, IL"
              />
            </div>

            <div>
              <label htmlFor="number_of_units" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Number of Units
              </label>
              <input
                type="number"
                id="number_of_units"
                name="number_of_units"
                value={formData.number_of_units}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="50"
                min="1"
              />
            </div>
          </div>
        )}


        <div>
          <label htmlFor="message" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your property management needs..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          By submitting this form, you agree to be contacted by Stellar Property Group regarding your inquiry.
        </p>
      </form>
    </div>
  );
}
