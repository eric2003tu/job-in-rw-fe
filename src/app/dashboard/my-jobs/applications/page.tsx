"use client";

import { useEffect, useState } from "react";
import { Application, Job } from "@/lib/types";
import { getMyJobsApplications } from "@/lib/appClient";
import { useRouter } from "next/navigation";
import ApplicationCard from "@/components/ApplicationCard";

export default function MyJobsApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    getMyJobsApplications(token)
      .then((apps) => {
        setApplications(apps);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load applications");
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Applications on My Jobs</h1>
      {applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} showJobInfo />
          ))}
        </div>
      )}
    </div>
  );
}
