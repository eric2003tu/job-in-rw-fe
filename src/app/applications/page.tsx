"use client";
import dynamic from "next/dynamic";
const ApplicationStatusCard = dynamic(() => import("@/components/ApplicationStatusCard"), { ssr: false });

import { useEffect, useState } from "react";
import { getMyApplications } from "@/lib/appClient";
import { Application } from "@/lib/types";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getMyApplications()
      .then((data) => setApplications(data))
      .catch(() => setApplications([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="py-8 flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold mb-4">Your Applications</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : applications.length > 0 ? (
        applications.map((app) => (
          <ApplicationStatusCard key={app.id} application={app} />
        ))
      ) : (
        <div>No applications found.</div>
      )}
    </div>
  );
}
