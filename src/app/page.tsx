"use client";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("../components/Dashboard").then(mod => mod.default), { ssr: false });
const JobList = dynamic(() => import("../components/JobList"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full py-8">
      {/* <Dashboard /> */}
      <JobList />
    </div>
  );
}
