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
}

export default function ApplicationCard({ 
  application, 
  dashboardMode, 
  onUpdate,
  onDelete 
}: ApplicationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = (status: Application["status"]) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          gradient: "from-yellow-400 to-yellow-500"
        };
      case "REVIEWED":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Eye,
          gradient: "from-blue-400 to-blue-500"
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
        relative overflow-hidden border-2 transition-all duration-300
        ${isHovered ? 'border-blue-300/50 shadow-xl shadow-blue-200/20' : 'border-blue-100/50'}
        bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm
        hover:-translate-y-0.5
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Status indicator line */}
      <div 
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${statusConfig.gradient}`}
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${statusConfig.color.split(' ')[0].replace('bg-', 'bg-')}/20`}>
                <StatusIcon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
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
          </div>
          
          <Badge 
            className={`
              ${statusConfig.color} border-2 font-semibold px-3 py-1.5
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
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">Cover Letter</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {truncatedCoverLetter}
          </p>
          {application.coverLetter && application.coverLetter.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-0"
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
              className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => window.open(application.resumeUrl, '_blank')}
            >
              <Download className="h-3 w-3" />
              Resume
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50"
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
              gap-2 bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800
              shadow-md shadow-blue-500/20
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