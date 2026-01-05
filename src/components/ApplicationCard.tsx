import { Application } from "@/lib/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Building, 
  FileText, 
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  TrendingUp,
  Download
} from "lucide-react";
import { useState } from "react";

interface ApplicationCardProps {
  application: Application;
  dashboardMode?: boolean;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
  showJobInfo?: boolean;
}

export default function ApplicationCard({ 
  application, 
  dashboardMode, 
  onUpdate,
  onDelete,
  showJobInfo
}: ApplicationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (status: Application["status"]) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-sky-100 text-sky-800 border-sky-200", // Subtle blue instead of yellow
          icon: Clock,
          gradient: "from-sky-400 to-sky-500" // Soft blue gradient
        };
      case "REVIEWED":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200", // Changed from blue to gray
          icon: Eye,
          gradient: "from-gray-400 to-gray-500" // Gray gradient
        };
      case "INTERVIEW":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: MessageSquare,
          gradient: "from-purple-400 to-purple-500"
        };
      case "ACCEPTED":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: CheckCircle,
          gradient: "from-emerald-400 to-emerald-500"
        };
      case "REJECTED":
        return {
          color: "bg-rose-100 text-rose-800 border-rose-200",
          icon: XCircle,
          gradient: "from-rose-400 to-rose-500"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          gradient: "from-gray-400 to-gray-500"
        };
    }
  };

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncatedCoverLetter = application.coverLetter 
    ? application.coverLetter.length > 150 && !isExpanded
      ? `${application.coverLetter.substring(0, 150)}...`
      : application.coverLetter
    : "No cover letter provided";

  return (
    <Card 
      className={`
        relative overflow-hidden border transition-all duration-300
        ${isHovered ? 'border-gray-300 shadow-lg' : 'border-gray-200'}
        bg-white hover:shadow-xl
        hover:-translate-y-0.5
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator line - minimal */}
      <div 
        className={`absolute top-0 left-0 w-1 h-full ${statusConfig.gradient}`}
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${statusConfig.color.split(' ')[0].replace('bg-', 'bg-')}/20`}>
                <StatusIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 truncate hover:text-gray-800 transition-colors">
                {application.job?.title ?? "Job Title"}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                <span className="font-medium">{application.job?.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{application.job?.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Applied {formatDate(application.createdAt)}</span>
              </div>
            </div>
            {/* Show applicant info if showJobInfo is true */}
            {showJobInfo && (
              <div className="mt-2 text-xs text-gray-700 bg-gray-50 rounded p-2">
                <span className="font-semibold">Applicant:</span> {application.user?.name} (<a href={`mailto:${application.user?.email}`} className="text-gray-700 hover:text-gray-900 underline">{application.user?.email}</a>)
              </div>
            )}
          </div>
          <Badge 
            className={`
              ${statusConfig.color} border font-semibold px-3 py-1.5
              hover:scale-105 transition-transform duration-200
            `}
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Cover Letter</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {truncatedCoverLetter}
          </p>
          {application.coverLetter && application.coverLetter.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Read More"}
              <ChevronRight className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500">Salary Range</span>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              {application.job?.salary || "Not specified"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500">Employment Type</span>
            <p className="text-sm font-semibold text-gray-900">
              {application.job?.jobType?.replace("_", " ") || "Full-time"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          {application.resumeUrl && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700"
              onClick={() => window.open(application.resumeUrl, '_blank')}
            >
              <Download className="h-3 w-3" />
              Resume
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => window.open(`/jobs/${application.jobId}`, '_blank')}
          >
            <ExternalLink className="h-3 w-3" />
            View Job
          </Button>
        </div>
        
        <div className="flex gap-2">
          {dashboardMode && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-800"
              onClick={() => onDelete?.(application.id)}
            >
              Withdraw
            </Button>
          )}
          <Button
            size="sm"
            className={`
              gap-2 bg-gray-900 hover:bg-gray-800 text-white
              shadow-md shadow-gray-900/10
            `}
            onClick={() => onUpdate?.(application.id)}
          >
            Update Status
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}