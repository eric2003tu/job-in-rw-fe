"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appClient";
import { User, ApplicationStatus } from "@/lib/types";
import { 
  Briefcase, 
  FileText, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Building,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  AlertCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";

const ProfileCard = dynamic(() => import("@/components/ProfileCard"), { 
  ssr: false,
  loading: () => (
    <div className="w-full max-w-2xl h-48 animate-pulse bg-gray-100 rounded-lg"></div>
  )
});

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getStatusColor = (status: ApplicationStatus) => {
    const colors = {
      [ApplicationStatus.PENDING]: "bg-yellow-50 border-yellow-200 text-yellow-800",
      [ApplicationStatus.REVIEWED]: "bg-blue-50 border-blue-200 text-blue-800",
      [ApplicationStatus.INTERVIEW]: "bg-green-50 border-green-200 text-green-800",
      [ApplicationStatus.ACCEPTED]: "bg-emerald-50 border-emerald-200 text-emerald-800",
      [ApplicationStatus.REJECTED]: "bg-red-50 border-red-200 text-red-800",
    };
    return colors[status] || "bg-gray-50 border-gray-200 text-gray-800";
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    const icons = {
      [ApplicationStatus.PENDING]: <Clock className="w-3 h-3" />,
      [ApplicationStatus.REVIEWED]: <Eye className="w-3 h-3" />,
      [ApplicationStatus.INTERVIEW]: <CheckCircle className="w-3 h-3" />,
      [ApplicationStatus.ACCEPTED]: <CheckCircle className="w-3 h-3" />,
      [ApplicationStatus.REJECTED]: <XCircle className="w-3 h-3" />,
    };
    return icons[status];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchUser}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Loader2 className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Profile Found</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Your Profile</h1>
          <p className="text-gray-600">Manage your jobs and applications</p>
        </div>

        <div className="mb-10">
          <ProfileCard user={user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Jobs Posted Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Jobs Posted</h2>
                  <p className="text-sm text-gray-500">{user.jobs?.length || 0} total</p>
                </div>
              </div>
              <Link
                href="/dashboard/post-job"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Post New Job
              </Link>
            </div>

            {user.jobs && user.jobs.length > 0 ? (
              <div className="space-y-4">
                {user.jobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {job.jobType.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Applications: {job.applications?.length || 0}
                      </span>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Jobs Posted Yet</h3>
                <p className="text-gray-500 mb-4">Start by posting your first job opportunity.</p>
                <Link
                  href="/dashboard/post-job"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>

          {/* Applications Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Applications</h2>
                  <p className="text-sm text-gray-500">{user.applications?.length || 0} total</p>
                </div>
              </div>
              <Link
                href="/jobs"
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>

            {user.applications && user.applications.length > 0 ? (
              <div className="space-y-4">
                {user.applications.map((app) => (
                  <div 
                    key={app.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {app.job?.title || "Unknown Position"}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {app.job?.company || "Unknown Company"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {app.job?.location || "Remote"}
                          </span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="text-xs font-medium">{app.status}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Applied:</span>{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                      
                      {app.coverLetter && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Cover Letter:</span>
                          <p className="text-gray-600 line-clamp-2 mt-1">{app.coverLetter}</p>
                        </div>
                      )}

                      {app.resumeUrl && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Download className="w-3 h-3" />
                            Download Resume
                          </a>
                          {app.job && (
                            <Link
                              href={`/jobs/${app.job.id}`}
                              className="text-sm text-gray-600 hover:text-gray-900"
                            >
                              View Job
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-500 mb-4">Browse available jobs and apply to get started.</p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}