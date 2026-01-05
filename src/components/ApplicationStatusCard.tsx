import { Application, ApplicationStatus } from "@/lib/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { 
  Calendar, 
  Clock, 
  Building, 
  MapPin, 
  FileText,
  CheckCircle,
  XCircle,
  ClockIcon,
  Eye,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface ApplicationStatusCardProps {
  application: Application;
}

export default function ApplicationStatusCard({ application }: ApplicationStatusCardProps) {
  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.ACCEPTED:
        return {
          badgeVariant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          badgeColor: "bg-green-100 text-green-800 hover:bg-green-200"
        };
      case ApplicationStatus.REJECTED:
        return {
          badgeVariant: "destructive" as const,
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          badgeColor: "bg-red-100 text-red-800 hover:bg-red-200"
        };
      case ApplicationStatus.INTERVIEW:
        return {
          badgeVariant: "secondary" as const,
          icon: Calendar,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          badgeColor: "bg-purple-100 text-purple-800 hover:bg-purple-200"
        };
      case ApplicationStatus.PENDING:
        return {
          badgeVariant: "secondary" as const,
          icon: ClockIcon,
          color: "text-sky-600", // Subtle blue instead of amber
          bgColor: "bg-sky-50",  // Very light blue background
          borderColor: "border-sky-200", // Light blue border
          badgeColor: "bg-sky-100 text-sky-800 hover:bg-sky-200" // Light blue badge
        };
      case ApplicationStatus.REVIEWED:
      default:
        return {
          badgeVariant: "secondary" as const,
          icon: FileText,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          badgeColor: "bg-gray-100 text-gray-800 hover:bg-gray-200"
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatStatusText = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return "Application Submitted";
      case ApplicationStatus.REVIEWED:
        return "Under Review";
      case ApplicationStatus.INTERVIEW:
        return "Interview Scheduled";
      case ApplicationStatus.ACCEPTED:
        return "Offer Accepted";
      case ApplicationStatus.REJECTED:
        return "Not Selected";
      default:
        return status;
    }
  };

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className={`w-full overflow-hidden transition-all duration-300 hover:shadow-lg border ${statusConfig.borderColor}`}>
      <div className={`${statusConfig.bgColor} p-1`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md ${statusConfig.bgColor}`}>
                  <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                </div>
                <span className="text-xs font-medium text-gray-500">
                  Applied on {formatDate(application.createdAt)}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                {application.job?.title ?? "Job Position"}
              </h3>
              
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Building className="h-3.5 w-3.5" />
                  <span className="font-medium">{application.job?.company ?? "Company"}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{application.job?.location ?? "Location"}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <Badge 
                className={`px-3 py-1.5 font-semibold ${statusConfig.badgeColor} border-0`}
              >
                <div className="flex items-center gap-1.5">
                  <StatusIcon className="h-3.5 w-3.5" />
                  {formatStatusText(application.status)}
                </div>
              </Badge>
              
              {application.job?.salary && (
                <span className="text-sm font-medium text-gray-700 bg-white/80 px-2.5 py-1 rounded-md border border-gray-200">
                  {application.job.salary}
                </span>
              )}
            </div>
          </div>
        </CardHeader>
      </div>

      <CardContent className="pt-6 pb-4">
        {application.coverLetter ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-700">Cover Letter</h4>
            </div>
            <div className="relative">
              <div className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {application.coverLetter}
              </div>
              {application.coverLetter.length > 200 && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">No cover letter provided</p>
              <p className="text-xs text-gray-500">You submitted your application without a cover letter</p>
            </div>
          </div>
        )}
        
        {/* Job Type & Category */}
        {(application.job?.jobType || application.job?.category) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {application.job?.jobType && (
              <Badge variant="outline" className="text-xs px-2.5 py-1 border-gray-300 text-gray-700">
                {application.job.jobType.replace('_', ' ')}
              </Badge>
            )}
            {application.job?.category && (
              <Badge variant="outline" className="text-xs px-2.5 py-1 border-gray-300 text-gray-700">
                {application.job.category}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-6 px-6 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated {formatDate(application.createdAt)}</span>
        </div>
        
        <div className="flex gap-3">
          <Link href={`/applications/${application.id}`}  
            className="gap-2 border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            <Eye className="h-4 w-4" />
            View Details
            <ChevronRight className="h-4 w-4" />
          </Link>
          
          {application.job?.id && (
            <Button 
              size="sm"
              className="gap-2 bg-gray-900 hover:bg-gray-800 text-white"
            >
              <ExternalLink className="h-4 w-4" />
              View Job
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}