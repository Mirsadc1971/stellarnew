import { useState } from 'react';
import { Users, User, Mail, Phone, MapPin, FileText, Send, Award, CheckCircle, Printer } from 'lucide-react';

interface BoardNominationFormData {
  nominee_name: string;
  nominee_email: string;
  nominee_phone: string;
  nominee_unit_address: string;
  years_at_property: string;
  ownership_type: string;
  current_employment: string;
  previous_board_experience: string;
  relevant_skills: string;
  motivation: string;
  time_commitment: string;
  references: string;
  signature: string;
  acknowledged_terms: boolean;
  acknowledged_commitment: boolean;
  acknowledged_attendance: boolean;
}

export function BoardNominationForm() {
  const [formData, setFormData] = useState<BoardNominationFormData>({
    nominee_name: '',
    nominee_email: '',
    nominee_phone: '',
    nominee_unit_address: '',
    years_at_property: '',
    ownership_type: 'owner',
    current_employment: '',
    previous_board_experience: '',
    relevant_skills: '',
    motivation: '',
    time_commitment: 'yes',
    references: '',
    signature: '',
    acknowledged_terms: false,
    acknowledged_commitment: false,
    acknowledged_attendance: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedData, setSubmittedData] = useState<BoardNominationFormData | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_BOARD_NOMINATION_ENDPOINT;
      console.log('Submitting to:', endpoint);

      if (!endpoint) {
        throw new Error('Formspree endpoint not configured');
      }

      const submissionData = {
        nominee_name: formData.nominee_name,
        nominee_email: formData.nominee_email,
        nominee_phone: formData.nominee_phone,
        nominee_unit_address: formData.nominee_unit_address,
        years_at_property: formData.years_at_property,
        ownership_type: formData.ownership_type,
        current_employment: formData.current_employment,
        previous_board_experience: formData.previous_board_experience,
        relevant_skills: formData.relevant_skills,
        motivation: formData.motivation,
        time_commitment: formData.time_commitment,
        references: formData.references,
        signature: formData.signature,
        acknowledged_terms: formData.acknowledged_terms ? 'Yes' : 'No',
        acknowledged_commitment: formData.acknowledged_commitment ? 'Yes' : 'No',
        acknowledged_attendance: formData.acknowledged_attendance ? 'Yes' : 'No',
        _subject: `Board Nomination Application - ${formData.nominee_name}`
      };

      console.log('Submission data:', submissionData);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        setSubmitStatus('success');
        setSubmittedData({ ...formData });
        setFormData({
          nominee_name: '',
          nominee_email: '',
          nominee_phone: '',
          nominee_unit_address: '',
          years_at_property: '',
          ownership_type: 'owner',
          current_employment: '',
          previous_board_experience: '',
          relevant_skills: '',
          motivation: '',
          time_commitment: 'yes',
          references: '',
          signature: '',
          acknowledged_terms: false,
          acknowledged_commitment: false,
          acknowledged_attendance: false
        });
      } else {
        const errorData = await response.text();
        console.error('Form submission failed:', response.status, errorData);
        throw new Error(`Form submission failed: ${response.status}`);
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
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Board Member Nomination Application</h2>
        <p className="text-center text-gray-600 mb-4">Apply to serve on your condominium or HOA board</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Board positions are typically determined by percentage of votes received during elections. This application helps the nominating committee evaluate candidates for board service.
          </p>
        </div>
      </div>

      {submitStatus === 'success' && submittedData && (
        <div className="mb-6 space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <p className="font-semibold">Your board nomination application has been submitted successfully!</p>
            <p className="text-sm">The nominating committee will review your application and contact you regarding next steps.</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors print:hidden"
            >
              <Printer className="w-5 h-5" />
              <span>Print Application Copy</span>
            </button>
          </div>

          {/* Printable version */}
          <div className="hidden print:block bg-white p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Board Member Nomination Application</h1>
              <p className="text-gray-600">Stellar Property Group</p>
              <p className="text-sm text-gray-500">Submitted on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-300 pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Nominee Information</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Full Name:</p>
                    <p className="text-gray-900">{submittedData.nominee_name}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Email:</p>
                    <p className="text-gray-900">{submittedData.nominee_email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Phone:</p>
                    <p className="text-gray-900">{submittedData.nominee_phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Unit Address:</p>
                    <p className="text-gray-900">{submittedData.nominee_unit_address}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Years at Property:</p>
                    <p className="text-gray-900">{submittedData.years_at_property}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Ownership Status:</p>
                    <p className="text-gray-900">{submittedData.ownership_type}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Background</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Current Employment/Profession:</p>
                    <p className="text-gray-900">{submittedData.current_employment || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Previous Board or Leadership Experience:</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{submittedData.previous_board_experience || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Relevant Skills & Expertise:</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{submittedData.relevant_skills}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Motivation & Commitment</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Why do you want to serve on the board?</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{submittedData.motivation}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Can you commit to attending monthly board meetings?</p>
                    <p className="text-gray-900">{submittedData.time_commitment}</p>
                  </div>
                  {submittedData.references && (
                    <div>
                      <p className="font-semibold text-gray-700">References:</p>
                      <p className="text-gray-900 whitespace-pre-wrap">{submittedData.references}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Signature</h2>
                <div className="text-sm">
                  <p className="font-semibold text-gray-700">Applicant Signature:</p>
                  <p className="text-gray-900 text-2xl font-cursive mt-2">{submittedData.signature}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Acknowledgements</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700">I understand that board members have fiduciary duties to the association and must act in the best interests of all owners.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700">I understand that serving on the board requires a significant time commitment.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-gray-700">I certify that the information provided is true and accurate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm">Please try again or contact us directly at mirsad@stellarpropertygroup.com</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nominee Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nominee Information</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="nominee_name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                id="nominee_name"
                name="nominee_name"
                required
                value={formData.nominee_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nominee_email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="nominee_email"
                  name="nominee_email"
                  required
                  value={formData.nominee_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="nominee_phone" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="nominee_phone"
                  name="nominee_phone"
                  required
                  value={formData.nominee_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="(773) 555-0123"
                />
              </div>
            </div>

            <div>
              <label htmlFor="nominee_unit_address" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Unit Address *
              </label>
              <input
                type="text"
                id="nominee_unit_address"
                name="nominee_unit_address"
                required
                value={formData.nominee_unit_address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Unit 301, 123 Main St, Chicago, IL 60601"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="years_at_property" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  Years at Property *
                </label>
                <input
                  type="number"
                  id="years_at_property"
                  name="years_at_property"
                  required
                  value={formData.years_at_property}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="5"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label htmlFor="ownership_type" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  Ownership Status *
                </label>
                <select
                  id="ownership_type"
                  name="ownership_type"
                  required
                  value={formData.ownership_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="owner">Owner</option>
                  <option value="renter">Renter (if allowed by bylaws)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Background */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Background</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="current_employment" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Current Employment/Profession
              </label>
              <input
                type="text"
                id="current_employment"
                name="current_employment"
                value={formData.current_employment}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Software Engineer at Tech Company"
              />
            </div>

            <div>
              <label htmlFor="previous_board_experience" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Previous Board or Leadership Experience
              </label>
              <textarea
                id="previous_board_experience"
                name="previous_board_experience"
                value={formData.previous_board_experience}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe any previous experience serving on boards, committees, or leadership positions..."
              />
            </div>

            <div>
              <label htmlFor="relevant_skills" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Relevant Skills & Expertise *
              </label>
              <textarea
                id="relevant_skills"
                name="relevant_skills"
                required
                value={formData.relevant_skills}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="e.g., Financial management, legal background, construction/engineering, communication skills, property management..."
              />
            </div>
          </div>
        </div>

        {/* Motivation & Commitment */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Motivation & Commitment</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="motivation" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                Why do you want to serve on the board? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                required
                value={formData.motivation}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your motivation for serving on the board and what you hope to contribute to the community..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                Can you commit to attending monthly board meetings? *
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time_commitment"
                    value="yes"
                    checked={formData.time_commitment === 'yes'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time_commitment"
                    value="no"
                    checked={formData.time_commitment === 'no'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time_commitment"
                    value="mostly"
                    checked={formData.time_commitment === 'mostly'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Mostly, with occasional conflicts</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="references" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                References (Optional)
              </label>
              <textarea
                id="references"
                name="references"
                value={formData.references}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Names and contact information of references (other unit owners, professional contacts, etc.)"
              />
            </div>
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
                name="acknowledged_terms"
                checked={formData.acknowledged_terms}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                I understand that board members have fiduciary duties to the association and must act in the best interests of all owners. I agree to comply with the association's governing documents and all applicable laws. *
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="acknowledged_commitment"
                checked={formData.acknowledged_commitment}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                I understand that serving on the board requires a significant time commitment including attending regular meetings, reviewing documents, and responding to association matters. *
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="acknowledged_attendance"
                checked={formData.acknowledged_attendance}
                onChange={handleChange}
                required
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                I certify that the information provided in this application is true and accurate to the best of my knowledge. *
              </span>
            </label>
          </div>
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
              <span>Submit Board Nomination Application</span>
            </>
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          * Required fields. Your application will be reviewed by the nominating committee.
        </p>
      </form>

      {/* Information Section */}
      <div className="mt-12 space-y-6 border-t border-gray-200 pt-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Board Service Information</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Serving on your condominium or HOA board is a valuable way to contribute to your community. Board members make important decisions about the property's management, finances, and future direction while working collaboratively with professional management.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-3">Board Member Responsibilities</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Attend regular board meetings (typically monthly)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Review financial reports and budgets</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Make decisions on maintenance and improvements</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Address owner concerns and communications</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Oversee compliance with governing documents</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span>Work with property management company</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-xl font-bold text-gray-900 mb-3">Election Process</h4>
          <p className="text-gray-700 leading-relaxed">
            Board positions are typically determined by the percentage of votes received during the annual election. All eligible unit owners may vote, with voting power often based on percentage of ownership. The nominating committee reviews applications and may interview candidates before presenting them to the membership for election.
          </p>
        </div>
      </div>
    </div>
  );
}
