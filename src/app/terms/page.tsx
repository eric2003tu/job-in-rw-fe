// app/terms/page.tsx
import { Shield, FileText, AlertCircle, CheckCircle, Clock, Users, Globe, Lock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsOfServicePage() {
  const lastUpdated = "January 5, 2024";
  const effectiveDate = "January 5, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
{/* Ultra Simple */}
<div className="container mx-auto px-4 py-12">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
      Terms of Service
    </h1>
    <p className="text-gray-600">
      Last updated {lastUpdated} • Effective {effectiveDate}
    </p>
    <div className="h-px bg-gray-200 my-8"></div>
  </div>
</div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Table of Contents */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { number: "1", title: "Acceptance of Terms", id: "acceptance" },
                { number: "2", title: "Eligibility", id: "eligibility" },
                { number: "3", title: "User Accounts", id: "accounts" },
                { number: "4", title: "Platform Services", id: "services" },
                { number: "5", title: "User Responsibilities", id: "responsibilities" },
                { number: "6", title: "Job Postings", id: "job-postings" },
                { number: "7", title: "Application Process", id: "applications" },
                { number: "8", title: "Intellectual Property", id: "ip" },
                { number: "9", title: "Privacy Policy", id: "privacy" },
                { number: "10", title: "Fees and Payments", id: "fees" },
                { number: "11", title: "Termination", id: "termination" },
                { number: "12", title: "Disclaimer of Warranties", id: "warranties" },
                { number: "13", title: "Limitation of Liability", id: "liability" },
                { number: "14", title: "Indemnification", id: "indemnification" },
                { number: "15", title: "Governing Law", id: "governing-law" },
                { number: "16", title: "Changes to Terms", id: "changes" },
                { number: "17", title: "Contact Information", id: "contact" },
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                    {item.number}
                  </div>
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">Important Notice</h3>
                <p className="text-yellow-700">
                  By accessing or using JobInRW, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of the terms, you may not access the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            
            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-700 mb-4">
                  These Terms of Service ("Terms") govern your access to and use of JobInRW 
                  ("Platform", "we", "us", or "our"), including any content, functionality, 
                  and services offered on or through jobinrw.com.
                </p>
                <p className="text-gray-700 mb-4">
                  By accessing or using the Platform, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms. If you are using the 
                  Platform on behalf of a company or other legal entity, you represent that 
                  you have the authority to bind such entity to these Terms.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> These Terms constitute a legally binding agreement 
                    between you and JobInRW. Please review them carefully.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="eligibility" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Eligibility</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Age Requirement</h3>
                    <p className="text-gray-700">
                      You must be at least <strong>18 years of age</strong> to use our Platform. 
                      By using JobInRW, you represent and warrant that you meet this age requirement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Geographic Restrictions</h3>
                    <p className="text-gray-700">
                      The Platform is intended for users in <strong>Rwanda</strong>. We make no 
                      claims that the Platform or its content is accessible or appropriate outside 
                      of Rwanda. Access to the Platform may not be legal by certain persons or in 
                      certain countries.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="accounts" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Account Creation</h3>
                    <p className="text-gray-700 mb-3">
                      To access certain features of the Platform, you must register for an account. 
                      You agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                      <li>Promptly update your account information if it changes</li>
                      <li>Accept responsibility for all activities that occur under your account</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Account Security</h3>
                    <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                      <Lock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-800 text-sm">
                        <strong>Important:</strong> You are responsible for maintaining the confidentiality 
                        of your account credentials. You must notify us immediately of any breach of 
                        security or unauthorized use of your account.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
                    <p className="text-gray-700 mb-2">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Create multiple accounts for malicious purposes</li>
                      <li>Use another user's account without permission</li>
                      <li>Provide false or misleading information</li>
                      <li>Create accounts using automated methods or bots</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="services" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Platform Services</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      For Job Seekers
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Browse and search job listings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Submit job applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Create and manage professional profiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Receive job alerts and notifications</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      For Employers
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Post job vacancies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Manage applications and candidates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Access applicant tracking tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Company profile management</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Disclaimer:</strong> JobInRW acts as a platform connecting job seekers 
                    and employers. We do not guarantee employment or hiring. All hiring decisions 
                    are made solely by employers.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="responsibilities" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">You agree to:</h3>
                  <ul className="space-y-3">
                    {[
                      "Use the Platform only for lawful purposes and in accordance with these Terms",
                      "Provide accurate and truthful information in all interactions",
                      "Respect the intellectual property rights of others",
                      "Not engage in any activity that interferes with or disrupts the Platform",
                      "Not use the Platform to transmit any viruses, malware, or harmful code",
                      "Not attempt to gain unauthorized access to any portion of the Platform",
                      "Not use automated systems or software to extract data from the Platform",
                      "Comply with all applicable laws and regulations in Rwanda"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="job-postings" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  6
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Employer Responsibilities</h3>
                    <p className="text-gray-700 mb-4">
                      Employers posting jobs on JobInRW agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Post only legitimate job opportunities</li>
                      <li>Provide accurate job descriptions, requirements, and compensation information</li>
                      <li>Comply with all applicable employment laws and regulations</li>
                      <li>Not discriminate based on race, gender, religion, age, or other protected characteristics</li>
                      <li>Respond to applicants in a timely manner</li>
                      <li>Not charge applicants any fees for applying or interviewing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Prohibited Job Postings</h4>
                    <p className="text-red-700 text-sm">
                      We prohibit job postings for: pyramid schemes, multi-level marketing opportunities, 
                      jobs requiring upfront payments, fraudulent opportunities, or any illegal activities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Right to Remove</h3>
                    <p className="text-gray-700">
                      JobInRW reserves the right to remove any job posting that violates these Terms, 
                      is misleading, or is otherwise inappropriate, at our sole discretion.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="applications" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  7
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Application Process</h2>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Job Seeker Responsibilities</h3>
                  <p className="text-gray-700">
                    When applying for jobs through JobInRW, you agree to:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Accurate Information</h4>
                      <p className="text-blue-700 text-sm">
                        Provide truthful information in your resume, cover letter, and application materials
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Professional Conduct</h4>
                      <p className="text-blue-700 text-sm">
                        Maintain professional communication with employers throughout the hiring process
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Privacy Respect</h4>
                      <p className="text-blue-700 text-sm">
                        Respect the privacy of employers and not share confidential application information
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">No Spam</h4>
                      <p className="text-blue-700 text-sm">
                        Not submit spam applications or apply for positions you are not qualified for
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Application Data</h4>
                    <p className="text-gray-700 text-sm">
                      By submitting an application, you understand that your application materials 
                      may be shared with the employer and stored in accordance with our Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8-17 would follow similar pattern... */}

            {/* Quick Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl shadow p-6 border-t-4 border-blue-500">
                <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have questions about these Terms, please contact us.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 border-t-4 border-green-500">
                <h3 className="font-bold text-gray-900 mb-3">Privacy Matters</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Learn how we protect your personal information and data.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/privacy">
                    Privacy Policy
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6 border-t-4 border-purple-500">
                <h3 className="font-bold text-gray-900 mb-3">Accept Terms</h3>
                <p className="text-gray-600 text-sm mb-4">
                  By continuing to use JobInRW, you accept these Terms of Service.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  I Understand
                </Button>
              </div>
            </div>

            {/* Final Acknowledgment */}
            <div className="bg-gray-900 text-white rounded-xl p-8 mt-12 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-300" />
              <h3 className="text-xl font-bold mb-3">Your Agreement</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                By accessing and using JobInRW, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/">
                    Return Home
                  </Link>
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <a href="#top">
                    Back to Top
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information (Section 17) */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h3 id="contact" className="text-2xl font-bold text-gray-900 mb-6 scroll-mt-20">
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Email Address
                </h4>
                <a 
                  href="mailto:legal@jobinrw.com" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  legal@jobinrw.com
                </a>
                <p className="text-gray-600 text-sm mt-2">
                  For legal inquiries and Terms of Service questions
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  Phone Number
                </h4>
                <a 
                  href="tel:+250788123456" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  +250 788 123 456
                </a>
                <p className="text-gray-600 text-sm mt-2">
                  Available Monday-Friday, 9 AM - 5 PM CAT
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <strong>Mailing Address:</strong> KG 123 St, Kacyiru, Kigali, Rwanda
              </p>
              <p className="text-gray-500 text-sm mt-2">
                For general inquiries, please use our <Link href="/contact" className="text-blue-600 hover:underline">Contact Form</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing imports
import { Briefcase, Building } from "lucide-react";