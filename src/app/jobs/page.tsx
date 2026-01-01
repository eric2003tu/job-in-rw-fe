"use client";
import dynamic from "next/dynamic";
const JobList = dynamic(() => import("@/components/JobList"), { ssr: false });

export default function JobsPage() {
  return (
    <div className="py-8">
      <JobList />
    </div>
  );
}
