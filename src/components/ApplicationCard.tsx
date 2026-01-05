import { Application, ApplicationStatus } from "@/lib/types";
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
  Download,
  Save,
  X
} from "lucide-react";
import { useState } from "react";
import { updateApplicationStatus, updateApplicationStatusForMyJob } from "@/lib/appClient";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";

// Define the interface BEFORE the component
interface ApplicationCardProps {
  application: Application;
  dashboardMode?: boolean;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
  showJobInfo?: boolean;
  jobOwnerMode?: boolean;
  onStatusChange?: (status: ApplicationStatus) => void;
}

export function ApplicationCard({
  application,
  dashboardMode,
  onDelete,
  showJobInfo,
  jobOwnerMode = false,
  onStatusChange
}: ApplicationCardProps) {
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(application.status);

  // Handle status change for job owners (immediate save)
  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (jobOwnerMode) {
      setStatus(newStatus);
      setSaveError(null);
    } else {
      setSelectedStatus(newStatus);
    }
  };

  // Handle save status for both job owners and applicants
  const handleSaveStatus = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      let updatedApplication;
      
      if (jobOwnerMode) {
        // Job owner updates status for their job's applications
        updatedApplication = await updateApplicationStatusForMyJob(application.id, status);
      } else {
        // Applicant updates their own application status
        updatedApplication = await updateApplicationStatus(application.id, selectedStatus);
      }
      
      setStatus(updatedApplication.status);
      if (onStatusChange) onStatusChange(updatedApplication.status);
      setIsUpdatingStatus(false); // Close update mode after saving
      
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  // Cancel status update
  const handleCancelUpdate = () => {
    setIsUpdatingStatus(false);
    setSelectedStatus(application.status);
    setSaveError(null);
  };

  // Start updating status (for applicants)
  const handleStartUpdate = () => {
    setIsUpdatingStatus(true);
    setSelectedStatus(application.status);
    setSaveError(null);
  };

  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return {
          color: "bg-sky-100 text-sky-800 border-sky-200",
          icon: Clock,
          gradient: "from-sky-400 to-sky-500"
        };
      case ApplicationStatus.REVIEWED:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Eye,
          gradient: "from-gray-400 to-gray-500"
        };
      case ApplicationStatus.INTERVIEW:
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: MessageSquare,
          gradient: "from-purple-400 to-purple-500"
        };
      case ApplicationStatus.ACCEPTED:
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: CheckCircle,
          gradient: "from-emerald-400 to-emerald-500"
        };
      case ApplicationStatus.REJECTED:
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

  const statusConfig = getStatusConfig(status);
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
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${statusConfig.gradient}`}
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
            {showJobInfo && application.user && (
              <div className="mt-2 text-xs text-gray-700 bg-gray-50 rounded p-2">
                <span className="font-semibold">Applicant:</span> {application.user.name} (<a href={`mailto:${application.user.email}`} className="text-gray-700 hover:text-gray-900 underline">{application.user.email}</a>)
              </div>
            )}
          </div>
          <Badge 
            className={`
              ${statusConfig.color} border font-semibold px-3 py-1.5
              hover:scale-105 transition-transform duration-200
            `}
          >
            {status}
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
              onClick={() => window.open(application.resumeUrl!, '_blank')}
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
          {/* View Details link for requests page */}
          {showJobInfo && (
            <Link
              href={`/dashboard/my-jobs/applications/${application.id}`}
              className="ml-2 text-blue-600 hover:underline text-xs font-medium"
            >
              View Details
            </Link>
          )}
        </div>
        
        <div className="flex gap-2 items-center">
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
          
          {/* Job Owner Mode - Always shows select and save button */}
          {jobOwnerMode ? (
            <div className="flex gap-2 items-center">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-36" size="sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ApplicationStatus.PENDING}>Pending</SelectItem>
                  <SelectItem value={ApplicationStatus.REVIEWED}>Reviewed</SelectItem>
                  <SelectItem value={ApplicationStatus.INTERVIEW}>Interview</SelectItem>
                  <SelectItem value={ApplicationStatus.ACCEPTED}>Accepted</SelectItem>
                  <SelectItem value={ApplicationStatus.REJECTED}>Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/10"
                onClick={handleSaveStatus}
                disabled={saving || status === application.status}
              >
                <Save className="h-3 w-3" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
              {saveError && <span className="text-xs text-red-500 ml-2">{saveError}</span>}
            </div>
          ) : (
            /* Applicant Mode - Shows update button OR select with save/cancel */
            <div className="flex gap-2 items-center">
              {isUpdatingStatus ? (
                <>
                  <Select value={selectedStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-36" size="sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ApplicationStatus.PENDING}>Pending</SelectItem>
                      <SelectItem value={ApplicationStatus.REVIEWED}>Reviewed</SelectItem>
                      <SelectItem value={ApplicationStatus.INTERVIEW}>Interview</SelectItem>
                      <SelectItem value={ApplicationStatus.ACCEPTED}>Accepted</SelectItem>
                      <SelectItem value={ApplicationStatus.REJECTED}>Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={handleSaveStatus}
                    disabled={saving}
                  >
                    <Save className="h-3 w-3" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 border-gray-300"
                    onClick={handleCancelUpdate}
                    disabled={saving}
                  >
                    <X className="h-3 w-3" />
                    Cancel
                  </Button>
                  {saveError && <span className="text-xs text-red-500 ml-2">{saveError}</span>}
                </>
              ) : (
                <Button
                  size="sm"
                  className="gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-md shadow-gray-900/10"
                  onClick={handleStartUpdate}
                >
                  Update Status
                </Button>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Add this line to export as default as well, for backward compatibility
export default ApplicationCard;