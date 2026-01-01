"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Calendar, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Users, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  Mail,
  Globe,
  ExternalLink,
  Sparkles,
  CheckCircle,
  FileText,
  TrendingUp,
  Shield,
  Heart,
  Eye,
  Download,
  MessageSquare,
  Phone,
  Award,
  Target,
  Zap,
  ChevronRight
} from "lucide-react";
import { JobType, JobCategory, Job } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getJobById } from "@/lib/appClient";


interface JobDetailsPageProps {
  jobId?: string;
}

export default function JobDetailsPage({ jobId }: JobDetailsPageProps) {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const jobId = params.id as string;
    getJobById(jobId)
      .then((data) => {
        setJob(data);
        // Optionally, fetch similar jobs here if needed
        setIsLoading(false);
      })
      .catch(() => {
        setJob(null);
        setIsLoading(false);
      });
  }, [params.id]);

  const handleApply = () => {
    setIsApplied(true);
    // In real app, this would navigate to application form
    alert("Application started! You'll be redirected to the application form.");
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In real app, this would save to user's bookmarks
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title || "Job Opportunity",
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
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
          <p className="text-gray-600 font-medium">Loading job details...</p>
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
          <p className="text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500" />
              
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Building className="h-4 w-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getJobTypeColor(job.jobType)}>
                        {job.jobType.replace("_", " ")}
                      </Badge>
                      <Badge className="bg-emerald-100 text-emerald-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {job.category}
                      </Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {job.salary}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200">
                        <Calendar className="h-3 w-3 mr-1" />
                        Posted {formatDate(job.createdAt)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBookmark}
                      className="gap-2 border-blue-200 hover:bg-blue-50"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                      {isBookmarked ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="gap-2 border-blue-200 hover:bg-blue-50"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Job Description
                  </h2>
                  <Badge variant="outline" className="border-blue-200">
                    <Eye className="h-3 w-3 mr-1" />
                    2,348 views
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="prose prose-blue max-w-none">
                  <div className={cn(
                    "transition-all duration-300",
                    !showFullDescription && "max-h-[400px] overflow-hidden relative"
                  )}>
                    {job.description.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                            {paragraph.replace('## ', '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                    
                    {!showFullDescription && (
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white to-transparent" />
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    className="mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                    <ChevronRight className={cn(
                      "h-4 w-4 ml-1 transition-transform",
                      showFullDescription && "rotate-90"
                    )} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  How to Apply
                </h2>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Application Process</h4>
                      <p className="text-sm text-gray-700">
                        We review applications on a rolling basis. The typical process includes:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                        {[
                          { step: 1, title: "Initial Review", time: "1-3 days" },
                          { step: 2, title: "Technical Interview", time: "1 week" },
                          { step: 3, title: "Final Decision", time: "2-3 days" },
                        ].map((item) => (
                          <div key={item.step} className="text-center p-3 bg-white rounded-lg border border-blue-100">
                            <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                              {item.step}
                            </div>
                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Application Method</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {job.applicationMethod.type === "website" ? (
                      <a
                        href={job.applicationMethod.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex-1"
                      >
                        <Globe className="h-4 w-4" />
                        Apply on Company Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <a
                        href={`mailto:${job.applicationMethod.value}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex-1"
                      >
                        <Mail className="h-4 w-4" />
                        Apply via Email
                      </a>
                    )}
                    
                    <Button
                      variant="outline"
                      className="gap-2 border-blue-200 hover:bg-blue-50 flex-1"
                      onClick={() => window.open("/resume-upload", "_blank")}
                    >
                      <Download className="h-4 w-4" />
                      Quick Apply (Upload Resume)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  About the Company
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{job.postedBy?.name || job.company}</h4>
                      <p className="text-sm text-gray-600">Technology • 250+ employees</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    {job.postedBy?.name || job.company} is a leading technology company focused on innovation and digital transformation.
                  </p>
                </div>
                
                <div className="space-y-2">
                  {[
                    { icon: Users, label: "Company Size", value: "250+ employees" },
                    { icon: Globe, label: "Website", value: "techinnovators.com" },
                    { icon: MapPin, label: "Headquarters", value: "Kigali, Rwanda" },
                    { icon: Award, label: "Industry", value: "Technology" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  className="w-full gap-2 border-blue-200 hover:bg-blue-50"
                  onClick={() => window.open("https://techinnovators.com", "_blank")}
                >
                  <Globe className="h-4 w-4" />
                  Visit Company Website
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Job Stats
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {[
                  { label: "Applications Received", value: "245", change: "+12%" },
                  { label: "Days Remaining", value: "14", change: "Urgent" },
                  { label: "Response Rate", value: "85%", change: "High" },
                  { label: "Interview Rate", value: "20%", change: "Competitive" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <p className="text-lg font-bold text-blue-700">{stat.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Main Apply Button */}
            <Button
              onClick={handleApply}
              disabled={isApplied}
              className={cn(
                "w-full py-6 rounded-xl text-lg font-semibold",
                "bg-gradient-to-r from-blue-600 to-blue-700",
                "hover:from-blue-700 hover:to-blue-800",
                "active:scale-[0.98] transition-all duration-300",
                "shadow-xl shadow-blue-500/30 hover:shadow-blue-600/40",
                "border-2 border-blue-500/20",
                "relative overflow-hidden group/apply",
                isApplied && "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center justify-center gap-3 relative z-10">
                {isApplied ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Application Submitted!</span>
                  </>
                ) : (
                  <>
                    <span>Apply Now</span>
                    <ArrowLeft className={`h-5 w-5 transition-transform duration-300 ${isHovered ? '-rotate-45' : ''}`} />
                  </>
                )}
              </div>
              
              {/* Button shimmer effect */}
              {!isApplied && (
                <div className="absolute inset-0 -translate-x-full group-hover/apply:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
            </Button>

            {/* Similar Jobs */}
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Similar Opportunities
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <div 
                    key={similarJob.id}
                    className="p-4 rounded-xl border border-blue-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                    onClick={() => router.push(`/jobs/${similarJob.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 hover:text-blue-700">
                          {similarJob.title}
                        </h4>
                        <p className="text-sm text-gray-600">{similarJob.company}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {similarJob.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {similarJob.salary}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="ghost"
                  className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => router.push("/jobs")}
                >
                  View All Jobs
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}