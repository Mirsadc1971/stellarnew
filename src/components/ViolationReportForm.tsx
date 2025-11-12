import { useState } from 'react';
import { AlertTriangle, User, MapPin, Phone, Calendar, FileText, Send, Shield, Scale, Clock } from 'lucide-react';

interface ViolationFormData {
  reporter_name: string;
  reporter_unit_address: string;
  reporter_contact: string;
  report_date: string;
  violator_name: string;
  violator_unit: string;
  violation_types: string[];
  violation_details: string;
  reported_before: string;
  requested_action: string;
  signature: string;
  acknowledged_sharing: boolean;
  certified_accurate: boolean;
  acknowledged_contact: boolean;
}

export function ViolationReportForm() {
  const [formData, setFormData] = useState<ViolationFormData>({
    reporter_name: '',
    reporter_unit_address: '',
    reporter_contact: '',
    report_date: new Date().toISOString().split('T')[0],
    violator_name: '',
    violator_unit: '',
    violation_types: [],
    violation_details: '',
    reported_before: 'no',
    requested_action: 'warning',
    signature: '',
    acknowledged_sharing: false,
    certified_accurate: false,
    acknowledged_contact: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        ...formData,
        violation_types: formData.violation_types.join(', '),
        _subject: `Violation Report: ${formData.violation_types.join(', ')} - ${formData.reporter_name}`
      };

      const response = await fetch(import.meta.env.VITE_FORMSPREE_VIOLATION_REPORT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          reporter_name: '',
          reporter_unit_address: '',
          reporter_contact: '',
          report_date: new Date().toISOString().split('T')[0],
          violator_name: '',
          violator_unit: '',
          violation_types: [],
          violation_details: '',
          reported_before: 'no',
          requested_action: 'warning',
          signature: '',
          acknowledged_sharing: false,
          certified_accurate: false,
          acknowledged_contact: false
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
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'violation_types') {
        const violationType = (e.target as HTMLInputElement).value;
        setFormData(prev => ({
          ...prev,
          violation_types: checked
            ? [...prev.violation_types, violationType]
            : prev.violation_types.filter(t => t !== violationType)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Illinois Condominium Violation Report</h2>
        <p className="text-center text-gray-600 mb-4">Pursuant to Section 35 of the Ombudsperson Act</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> This form is for reporting potential violations related to condominium properties in accordance with the Illinois Condominium Property Act. For emergencies, please call 911.
          </p>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <p className="font-semibold">Your violation report has been submitted successfully!</p>
          <p className="text-sm">We will review your report and contact you if additional information is needed.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm">Please try again or contact us directly at service@stellarpropertygroup.com</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Reporter Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Reporter Information</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="reporter_name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Your Name *
              </label>
              <input
                type="text"
                id="reporter_name"
                name="reporter_name"
                required
                value={formData.reporter_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="reporter_unit_address" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Unit Address *
              </label>
              <input
                type="text"
                id="reporter_unit_address"
                name="reporter_unit_address"
                required
                value={formData.reporter_unit_address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Unit 301, 123 Main St, Chicago, IL 60601"
              />
            </div>

            <div>
              <label htmlFor="reporter_contact" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone/Email *
              </label>
              <input
                type="text"
                id="reporter_contact"
                name="reporter_contact"
                required
                value={formData.reporter_contact}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Phone number or email address"
              />
            </div>

            <div>
              <label htmlFor="report_date" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                Date of Report *
              </label>
              <input
                type="date"
                id="report_date"
                name="report_date"
                required
                value={formData.report_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Violator Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Violator Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="violator_name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Violator's Name (if known)
              </label>
              <input
                type="text"
                id="violator_name"
                name="violator_name"
                value={formData.violator_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Optional"
              />
            </div>

            <div>
              <label htmlFor="violator_unit" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Unit Number
              </label>
              <input
                type="text"
                id="violator_unit"
                name="violator_unit"
                value={formData.violator_unit}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Unit 205"
              />
            </div>
          </div>
        </div>

        {/* Nature of Violation */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nature of Violation (check all that apply)</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { value: 'noise', label: 'Noise/disturbance' },
              { value: 'construction', label: 'Unauthorized construction/alteration' },
              { value: 'pet', label: 'Pet violation' },
              { value: 'parking', label: 'Parking/vehicle issue' },
              { value: 'harassment', label: 'Harassment' },
              { value: 'other', label: 'Other' }
            ].map(violation => (
              <label key={violation.value} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  name="violation_types"
                  value={violation.value}
                  checked={formData.violation_types.includes(violation.value)}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{violation.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Details of the Violation */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Details of the Violation</h3>

          <div className="mb-4">
            <label htmlFor="violation_details" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2" />
              Include dates, times, witnesses *
            </label>
            <textarea
              id="violation_details"
              name="violation_details"
              required
              value={formData.violation_details}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Please provide detailed information about the violation including specific dates, times, and any witnesses..."
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              Have you reported this before? *
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="reported_before"
                  value="yes"
                  checked={formData.reported_before === 'yes'}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="reported_before"
                  value="no"
                  checked={formData.reported_before === 'no'}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="requested_action" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Scale className="w-4 h-4 mr-2" />
              Requested Action
            </label>
            <select
              id="requested_action"
              name="requested_action"
              value={formData.requested_action}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="warning">Warning</option>
              <option value="fine">Fine</option>
              <option value="hearing">Hearing</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Signature */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Signature</h3>

          <div>
            <label htmlFor="signature" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              Signature *
            </label>
            <p className="text-sm text-gray-600 mb-2">Type your full name as signature</p>
            <input
              type="text"
              id="signature"
              name="signature"
              required
              value={formData.signature}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-cursive"
              placeholder="Type your full name"
            />
          </div>
        </div>

        {/* Acknowledgements */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Acknowledgements</h3>

          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="acknowledged_sharing"
                checked={formData.acknowledged_sharing}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                I understand that this report may be shared with the association board, management company, or other relevant parties as part of the investigation process. *
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="certified_accurate"
                checked={formData.certified_accurate}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                I certify that the information provided in this report is true and accurate to the best of my knowledge. *
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="acknowledged_contact"
                checked={formData.acknowledged_contact}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                I understand that I may be contacted for additional information regarding this report. *
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Violation Report</span>
            </>
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          * Required fields. Form will be submitted to service@stellarpropertygroup.com
        </p>
      </form>

      {/* Information Sections */}
      <div className="mt-12 space-y-8 border-t border-gray-200 pt-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Violation Reporting & Resolution Process</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Maintaining community standards requires consistent, fair enforcement of association rules and regulations. Our violation reporting process ensures all concerns are addressed professionally while respecting the rights of all residents. Reports can be submitted confidentially, and all matters are handled according to Illinois Condominium Property Act guidelines.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Common Violations We Address</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Noise disturbances and quiet hours violations</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Unauthorized modifications to common areas</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Parking and vehicle violations</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Pet policy violations</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Improper waste disposal</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Smoking in prohibited areas</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Unauthorized subletting or Airbnb rentals</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>Balcony and patio regulation violations</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h4 className="text-xl font-bold text-gray-900">Our Investigation Process</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Every violation report triggers a systematic investigation process. We document the complaint, gather evidence including photos and witness statements, review applicable rules and precedents, and contact involved parties for their perspective. Our goal is always to resolve issues through communication and cooperation before formal enforcement becomes necessary.
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-3">
            <Scale className="w-6 h-6 text-blue-600" />
            <h4 className="text-xl font-bold text-gray-900">Fair Enforcement & Due Process</h4>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">
            Stellar Property Management follows strict due process procedures including written notice of alleged violations, opportunity to respond or cure the violation, formal hearing before the board if requested, and progressive enforcement from warnings to fines. All enforcement actions are documented and applied consistently across all residents. Appeals processes are available for disputed violations.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-3">Illinois Ombudsman Act Information</h4>
          <p className="text-gray-700 leading-relaxed mb-3">
            The Condominium and Common Interest Community Ombudsperson Act (765 ILCS 615/) provides a means by which unit owners can report potential violations of the Condominium Property Act or the Common Interest Community Association Act.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For more information about the Illinois Ombudsman Act or to file a complaint directly with the state, visit the Illinois Department of Financial and Professional Regulation website.
          </p>
        </div>
      </div>
    </div>
  );
}
