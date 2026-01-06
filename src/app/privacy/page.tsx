// app/privacy/page.tsx
import { Lock, Shield, Eye, Mail, Trash2, Database, Users, Globe, Download, Clock } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 5, 2024";
  const effectiveDate = "January 5, 2024";

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock className="h-6 w-6 text-gray-700" />
              </div>
              <span className="text-sm text-gray-500">Privacy & Security</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Updated: {lastUpdated}</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Effective: {effectiveDate}</span>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-8"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Quick Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-3">At a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <Database className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Data Collection</p>
              </div>
              <div className="text-center p-3">
                <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Data Usage</p>
              </div>
              <div className="text-center p-3">
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Data Sharing</p>
              </div>
              <div className="text-center p-3">
                <Trash2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Data Rights</p>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
            <div className="space-y-2">
              {[
                { title: "Information We Collect", id: "collection" },
                { title: "How We Use Your Information", id: "usage" },
                { title: "Information Sharing", id: "sharing" },
                { title: "Data Security", id: "security" },
                { title: "Your Rights", id: "rights" },
                { title: "Cookies", id: "cookies" },
                { title: "Third-Party Services", id: "third-party" },
                { title: "Data Retention", id: "retention" },
                { title: "Changes to Policy", id: "changes" },
                { title: "Contact Us", id: "contact" },
              ].map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="text-gray-400 text-sm font-mono">{(index + 1).toString().padStart(2, '0')}</div>
                  <span className="text-gray-700 group-hover:text-blue-600">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12">
            
            {/* Section 1: Collection */}
            <section id="collection" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Name, email address, phone number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Professional information (resume, work experience, education)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Company information for employers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Application materials and communications</span>
                  </li>
                </ul>
                
                <h3 className="font-medium text-gray-900 mb-3">Usage Information</h3>
                <p className="text-gray-700">
                  We collect information about how you use our platform, including:
                </p>
                <ul className="space-y-2 text-gray-700 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">-</span>
                    <span>Pages visited and time spent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">-</span>
                    <span>Job searches and applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">-</span>
                    <span>Device and browser information</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2: Usage */}
            <section id="usage" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">For Job Seekers</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Match you with relevant job opportunities</li>
                      <li>• Process your job applications</li>
                      <li>• Send job alerts and notifications</li>
                      <li>• Improve our matching algorithms</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">For Employers</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Display your job postings</li>
                      <li>• Process applications to your jobs</li>
                      <li>• Provide applicant management tools</li>
                      <li>• Send application notifications</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> We never sell your personal information to third parties.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Sharing */}
            <section id="sharing" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Information Sharing</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">With Employers</h3>
                    <p className="text-gray-700">
                      When you apply for a job, we share your application materials (resume, cover letter, 
                      and profile information) with the employer.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">With Job Seekers</h3>
                    <p className="text-gray-700">
                      Job postings and company information are visible to all registered job seekers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Service Providers</h3>
                    <p className="text-gray-700">
                      We use trusted third-party services for hosting, analytics, and email delivery. 
                      These providers only process data as instructed by us.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <h4 className="font-medium text-yellow-800 mb-2">Legal Requirements</h4>
                    <p className="text-yellow-700 text-sm">
                      We may disclose information if required by law or to protect our rights.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Security */}
            <section id="security" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Security Measures</h3>
                    <p className="text-gray-700 mb-3">
                      We implement industry-standard security measures to protect your data:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Encryption of data in transit and at rest</li>
                      <li>• Regular security audits and monitoring</li>
                      <li>• Access controls and authentication</li>
                      <li>• Secure data centers</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    While we take reasonable measures to protect your information, no online 
                    service is 100% secure. Please use strong passwords and protect your login credentials.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Rights */}
            <section id="rights" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  5
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Access & Correction</h3>
                      <p className="text-gray-700 text-sm">
                        You can access and update your profile information at any time through your account settings.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Data Export</h3>
                      <p className="text-gray-700 text-sm">
                        Request a copy of your personal data in a portable format.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Account Deletion</h3>
                      <p className="text-gray-700 text-sm">
                        You can delete your account and associated data through account settings or by contacting us.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Opt-Out</h3>
                      <p className="text-gray-700 text-sm">
                        Unsubscribe from marketing emails while maintaining essential service communications.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                  <Download className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-blue-800 text-sm">
                      To exercise any of these rights, please contact us at privacy@jobinrw.com
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Cookies */}
            <section id="cookies" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  6
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li>• Remember your login session</li>
                  <li>• Understand how you use our platform</li>
                  <li>• Improve your user experience</li>
                  <li>• Personalize job recommendations</li>
                </ul>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    You can control cookies through your browser settings. However, disabling 
                    cookies may affect some platform features.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Third-Party */}
            <section id="third-party" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  7
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 mb-3">
                      Our platform may contain links to or integrate with third-party services. 
                      These services have their own privacy policies.
                    </p>
                    <p className="text-gray-700">
                      We recommend reviewing the privacy policies of any third-party services you interact with.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Retention */}
            <section id="retention" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  8
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Data Retention</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We retain your personal data for as long as your account is active or as needed 
                  to provide our services. After account deletion, we may retain certain information 
                  as required by law or for legitimate business purposes.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Active Accounts</p>
                    <p className="text-xs text-gray-600">Retained indefinitely</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Inactive Accounts</p>
                    <p className="text-xs text-gray-600">2 years after last login</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Changes */}
            <section id="changes" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  9
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Changes to This Policy</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <p className="text-gray-700">
                  We may update this Privacy Policy periodically. We will notify you of any 
                  material changes by posting the new policy on this page and updating the 
                  "Last Updated" date.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Your continued use of our platform after changes constitutes 
                    acceptance of the updated policy.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 10: Contact */}
            <section id="contact" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  10
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:privacy@jobinrw.com" className="text-blue-600 hover:underline">
                        privacy@jobinrw.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <Link href="/contact" className="text-blue-600 hover:underline">
                        Contact Form
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      For general questions, please use our <Link href="/contact" className="text-blue-600 hover:underline">contact form</Link>. 
                      For privacy-specific inquiries, please email privacy@jobinrw.com.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Note */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="h-5 w-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Your Privacy Matters</h3>
              </div>
              <p className="text-gray-700">
                We are committed to protecting your privacy and being transparent about 
                how we handle your data. If you have any questions or concerns about 
                this Privacy Policy, please don't hesitate to contact us.
              </p>
              <div className="flex gap-4 mt-4">
                <Link 
                  href="/terms" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Terms of Service
                </Link>
                <Link 
                  href="/" 
                  className="text-sm text-gray-600 hover:underline"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}