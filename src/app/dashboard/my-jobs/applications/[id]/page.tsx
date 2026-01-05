"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Application } from "@/lib/types";
import { getApplicationById } from "@/lib/appClient";
import ApplicationCard from "@/components/ApplicationCard";

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    getApplicationById(id, token)
      .then((app) => {
        setApplication(app);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load application details");
        setLoading(false);
      });
  }, [id, router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!application) return <div>Application not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <ApplicationCard application={application} showJobInfo />
      <div className="mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <p className="whitespace-pre-line text-gray-700">{application.job?.description}</p>
      </div>
    </div>
  );
}
