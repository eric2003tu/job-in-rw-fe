"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Mail, 
  User, 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  Clock,
  Sparkles,
  CheckCircle,
  X,
  Paperclip,
  Eye,
  EyeOff,
  Shield,
  Target,
  Zap,
  Send,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { JobType, JobCategory, Job, ApplicationStatus } from "@/lib/types";
import { applyForJob } from "@/lib/appClient";
import { cn } from "@/lib/utils";

// Mock job data - in real app, this would come from an API
const mockJob: Job = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "Tech Innovators Inc.",
  location: "Kigali, Rwanda",
  description: "Build modern UIs with React and Next.js. Experience with TypeScript required.",
  applicationMethod: { 
    type: "website", 
    value: "https://techinnovators.com/careers/frontend-developer" 
  },
  salary: "$80,000 - $120,000",
  jobType: JobType.FULL_TIME,
  category: JobCategory.TECHNOLOGY,
  createdAt: "2024-06-01T09:00:00Z",
  updatedAt: "2024-06-02T10:00:00Z",
  postedById: "company_1",
  applications: [],
  postedBy: {
    id: "company_1",
    name: "Tech Innovators Inc.",
    email: "careers@techinnovators.com",
    password: "",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z",
    jobs: [],
    applications: []
  }
};

interface ApplicationFormData {
  userId: string;
  jobId: string;
  coverLetter: string;
  resumeUrl: string;
  status: ApplicationStatus;
}

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>({
    userId: "user-uuid", // In real app, this would come from auth
    jobId: params.id as string,
    coverLetter: "",
    resumeUrl: "",
    status: ApplicationStatus.PENDING
  });

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setJob(mockJob);
      setFormData(prev => ({ ...prev, jobId: params.id as string }));
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [params.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: "Please upload a PDF or Word document" }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      
      setResumeFile(file);
      setErrors(prev => ({ ...prev, resume: "" }));
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Set mock resume URL
            setFormData(prev => ({ 
              ...prev, 
              resumeUrl: `https://storage.example.com/resumes/${Date.now()}_${file.name}` 
            }));
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (formData.coverLetter.length < 50) {
      newErrors.coverLetter = "Cover letter should be at least 50 characters";
    }
    
    if (!formData.resumeUrl && !resumeFile) {
      newErrors.resume = "Resume is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await applyForJob({
        userId: formData.userId,
        jobId: formData.jobId,
        coverLetter: formData.coverLetter,
        resumeUrl: formData.resumeUrl,
        status: formData.status,
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/applications");
      }, 2000);
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: "Failed to submit application. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getJobTypeColor = (type: JobType) => {
    const colors = {
      [JobType.FULL_TIME]: "bg-blue-100 text-blue-800",
      [JobType.PART_TIME]: "bg-purple-100 text-purple-800",
      [JobType.CONTRACT]: "bg-yellow-100 text-yellow-800",
      [JobType.INTERNSHIP]: "bg-emerald-100 text-emerald-800",
      [JobType.REMOTE]: "bg-sky-100 text-sky-800",
      [JobType.HYBRID]: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const coverLetterTips = [
    "Address the hiring manager by name if possible",
    "Explain why you're interested in this specific role and company",
    "Highlight relevant experience from the job requirements",
    "Keep it concise - aim for 250-400 words",
    "Proofread for spelling and grammar errors"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading application form...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-rose-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Job Not Found</h2>
          <p className="text-gray-600">The job you're trying to apply for doesn't exist.</p>
          <Button onClick={() => router.push("/jobs")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Browse Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-yellow-50/10">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/jobs`)}
          className="mb-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job
        </Button>

        {/* Main Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Application Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500" />
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                      Apply for Position
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      Complete your application to stand out
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Your application has been successfully submitted. We'll review it and get back to you soon.
                    </p>
                    <div className="animate-pulse text-sm text-gray-500">
                      Redirecting to your applications...
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Job Preview */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-xl border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{job.title}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Building className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={getJobTypeColor(job.jobType)}>
                          {job.jobType.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="coverLetter" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Cover Letter
                        </Label>
                        <span className="text-xs text-gray-500">
                          {formData.coverLetter.length}/2000 characters
                        </span>
                      </div>
                      {errors.coverLetter && (
                        <div className="flex items-center gap-2 text-sm text-rose-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.coverLetter}
                        </div>
                      )}
                      <Textarea
                        id="coverLetter"
                        placeholder="Tell us why you're the perfect candidate for this role..."
                        value={formData.coverLetter}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, coverLetter: e.target.value }));
                          if (errors.coverLetter) setErrors(prev => ({ ...prev, coverLetter: "" }));
                        }}
                        className={cn(
                          "min-h-[200px] border-2 border-blue-100 bg-white focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400",
                          errors.coverLetter && "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                        )}
                        maxLength={2000}
                        autoComplete="off"
                        spellCheck={true}
                        required
                      />
                    </div>

                    {/* Resume URL */}
                    <div className="space-y-3">
                      <Label htmlFor="resumeUrl" className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Resume URL
                      </Label>
                      {errors.resume && (
                        <div className="flex items-center gap-2 text-sm text-rose-600">
                          <AlertCircle className="h-4 w-4" />
                          {errors.resume}
                        </div>
                      )}
                      <Input
                        id="resumeUrl"
                        type="url"
                        placeholder="https://your-resume-link.com/resume.pdf"
                        value={formData.resumeUrl}
                        onChange={e => setFormData(prev => ({ ...prev, resumeUrl: e.target.value }))}
                        className={cn(
                          "border-2 border-blue-100 bg-white focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400",
                          errors.resume && "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
                        )}
                        autoComplete="off"
                        required
                      />
                      <span className="text-xs text-gray-500">Paste a public link to your resume (Google Drive, Dropbox, etc.)</span>
                    </div>

                    {/* Privacy Notice */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Privacy & Security</h4>
                          <p className="text-sm text-gray-700">
                            Your application data is encrypted and secure. We only share your information with the hiring team at {job.company}. You can manage your applications and data in your account settings.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-rose-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-rose-700 font-medium">{errors.submit}</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full py-6 rounded-xl text-lg font-semibold",
                        "bg-gradient-to-r from-blue-600 to-blue-700",
                        "hover:from-blue-700 hover:to-blue-800",
                        "active:scale-[0.98] transition-all duration-300",
                        "shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40",
                        "border-2 border-blue-500/20",
                        "relative overflow-hidden group/submit"
                      )}
                    >
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send className="h-5 w-5" />
                          </>
                        )}
                      </div>
                      
                      {/* Button shimmer effect */}
                      {!isSubmitting && (
                        <div className="absolute inset-0 -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tips & Info */}
          <div className="space-y-6">
            {/* Application Tips */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Application Tips
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {coverLetterTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="p-1.5 bg-blue-100 rounded mt-0.5 flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">What happens next?</h4>
                  <div className="space-y-2">
                    {[
                      { step: 1, text: "Application Review" },
                      { step: 2, text: "Initial Screening" },
                      { step: 3, text: "Technical Assessment" },
                      { step: 4, text: "Final Interview" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {item.step}
                        </div>
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Job Summary
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {[
                  { icon: Building, label: "Company", value: job.company },
                  { icon: MapPin, label: "Location", value: job.location },
                  { icon: DollarSign, label: "Salary", value: job.salary },
                  { icon: Clock, label: "Type", value: job.jobType.replace("_", " ") },
                  { icon: User, label: "Hiring Manager", value: "Sarah Johnson" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Estimated response time
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    1-2 weeks
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Application Stats
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {[
                  { label: "Applications Received", value: "148" },
                  { label: "Average Response Time", value: "5 days" },
                  { label: "Interview Rate", value: "18%" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">{stat.label}</span>
                    <span className="text-sm font-bold text-blue-700">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}