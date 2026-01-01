
"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appClient";
import { User } from "@/lib/types";
const ProfileCard = dynamic(() => import("@/components/ProfileCard"), { ssr: false });

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="py-8 flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-yellow-50/10">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Profile</h1>
      {isLoading ? (
        <div className="text-lg text-gray-600">Loading...</div>
      ) : user ? (
        <>
          <div className="w-full max-w-2xl mb-8">
            <ProfileCard user={user} />
          </div>
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl font-semibold text-blue-800">Jobs Posted</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">{user.jobs?.length || 0}</span>
              </div>
              {user.jobs && user.jobs.length > 0 ? (
                <div className="space-y-4">
                  {user.jobs.map((job) => (
                    <div key={job.id} className="p-4 rounded-xl shadow border border-blue-100 bg-white/80">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg text-blue-900">{job.title}</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{job.jobType}</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">{job.company} &bull; {job.location}</div>
                      <div className="text-sm text-gray-500 mb-2">Salary: <span className="font-semibold">{job.salary}</span></div>
                      <div className="text-xs text-gray-500 mb-2">Posted: {new Date(job.createdAt).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600 whitespace-pre-line">{job.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 mb-6">No jobs posted.</div>
              )}
            </div>
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl font-semibold text-blue-800">Applications</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">{user.applications?.length || 0}</span>
              </div>
              {user.applications && user.applications.length > 0 ? (
                <div className="space-y-4">
                  {user.applications.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl shadow border border-yellow-100 bg-white/80">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg text-yellow-900">{app.job?.title || "Unknown Job"}</span>
                        <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">{app.status}</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">{app.job?.company || "Unknown Company"} &bull; {app.job?.location || "Unknown Location"}</div>
                      <div className="text-xs text-gray-500 mb-2">Applied: {new Date(app.createdAt).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600 mb-2">Resume: <a href={app.resumeUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{app.resumeUrl}</a></div>
                      <div className="text-sm text-gray-600 whitespace-pre-line">Cover Letter: {app.coverLetter}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">No applications submitted.</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-red-500">Failed to load profile.</div>
      )}
    </div>
  );
}
