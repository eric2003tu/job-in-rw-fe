"use client";

import { useEffect, useState } from "react";
import { Application } from "@/lib/types";
import { getMyJobsApplications } from "@/lib/appClient";
import { useRouter } from "next/navigation";
import ApplicationCard from "@/components/ApplicationCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building } from "lucide-react";

export default function MyJobsApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getMyJobsApplications();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err instanceof Error ? err.message : "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string) => {
    router.push(`/dashboard/my-jobs/applications/${id}/update`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to withdraw this application?")) {
      try {
        // Add delete logic here
        setApplications(prev => prev.filter(app => app.id !== id));
      } catch (err) {
        console.error("Failed to delete application:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Applications on My Jobs</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline hover:text-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Applications on My Jobs
        </h1>
        <p className="text-gray-600">
          View and manage applications submitted for your job postings
        </p>
      </div>

      {applications.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent>
            <div className="text-gray-500 mb-4">
              <Building className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600">
              Applications submitted for your jobs will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              showJobInfo={true}
              onUpdate={handleUpdateStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}