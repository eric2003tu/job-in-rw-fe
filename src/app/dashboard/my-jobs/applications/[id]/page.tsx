"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Application } from "@/lib/types";
import { getMyApplicationById, getApplicationForMyJob } from "@/lib/appClient";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Shield, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"applicant" | "job-owner" | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) {
        setError("Invalid application ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First try: User is viewing an application they submitted
        try {
          const data = await getMyApplicationById(id);
          setApplication(data);
          setRole("applicant");
          setError(null);
          return;
        } catch (applicantError) {
          console.log("Not an applicant's application, trying as job owner...");
        }
        
        // Second try: User is viewing an application submitted to their job
        try {
          const data = await getApplicationForMyJob(id);
          setApplication(data);
          setRole("job-owner");
          setError(null);
          return;
        } catch (ownerError) {
          console.log("Not a job owner's application either...");
        }
        
        // Both failed
        setError("You don't have permission to view this application or it doesn't exist.");
        
      } catch (err) {
        console.error("Error fetching application:", err);
        setError(
          err instanceof Error 
            ? err.message 
            : "Failed to load application details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="w-full mx-auto p-4 md:p-6">
        <div className="mb-6">
          <div className="h-10 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="bg-white border rounded-lg p-6">
          <div className="space-y-4">
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            <div className="space-y-4">
              <p>{error || "Application not found"}</p>
              
              <div className="mt-4 p-4 bg-gray-50 rounded border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Possible reasons:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>This application doesn't exist</li>
                  <li>You don't have permission to view it</li>
                  <li>Your session may have expired</li>
                  <li>The application may have been deleted</li>
                </ul>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button onClick={handleGoBack} variant="outline">
                  Go Back
                </Button>
                <Button onClick={() => router.push("/dashboard")}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-4 sm:mb-0 gap-2 pl-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Application Details
            </h1>
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              {role === "applicant" ? (
                <>
                  <User className="h-3 w-3" />
                  <span>My Application</span>
                </>
              ) : (
                <>
                  <Shield className="h-3 w-3" />
                  <span>Job Owner View</span>
                </>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-1">
            {role === "applicant" 
              ? `Viewing your application for ${application.job?.title}`
              : `Viewing application for ${application.job?.title} at ${application.job?.company}`
            }
          </p>
        </div>
      </div>

      {/* Main application card */}
      <div className="mb-8">
        <ApplicationCard 
          application={application} 
          showJobInfo={role === "job-owner"}
          jobOwnerMode={role === "job-owner"}
          onStatusChange={(newStatus: import("@/lib/types").ApplicationStatus) => setApplication((prev) => prev ? { ...prev, status: newStatus } : prev)}
        />
      </div>

      {/* Role-specific content */}
      {role === "job-owner" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800">Job Owner Actions</h3>
              <p className="text-blue-700 text-sm mt-1">
                As the job owner, you can update the application status and contact the applicant.
              </p>
              <div className="flex gap-3 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => {
                    const email = application.user?.email;
                    if (email) {
                      window.location.href = `mailto:${email}`;
                    }
                  }}
                >
                  Contact Applicant
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push(`/dashboard/my-jobs/applications/${application.id}/update`)}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cover letter */}
      {application.coverLetter && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {application.coverLetter}
            </p>
          </div>
        </div>
      )}

      {/* Job description */}
      {application.job?.description && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Job Description</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/jobs/${application.jobId}`)}
            >
              View Full Job Posting
            </Button>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {application.job.description.length > 500
                ? `${application.job.description.substring(0, 500)}...`
                : application.job.description
              }
            </p>
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex flex-wrap gap-3 justify-between items-center mt-8 pt-6 border-t">
        <Button variant="outline" onClick={handleGoBack}>
          Back
        </Button>
        
        <div className="flex flex-wrap gap-2">
          {application.resumeUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(application.resumeUrl!, '_blank')}
            >
              View Resume
            </Button>
          )}
          <Button
            onClick={() => router.push(`/jobs/${application.jobId}`)}
          >
            View Job
          </Button>
        </div>
      </div>
    </div>
  );
}