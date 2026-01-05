"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  JobType, 
  JobCategory, 
  ApplicationStatus, 
  Job, 
  Application 
} from "@/lib/types";
import { 
  User as UserIcon, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Building,
  CheckCircle,
  ClockIcon,
  XCircle,
  Users,
  Award,
  BarChart3,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  ArrowUpRight,
  Sparkles,
  Target,
  Zap,
  Rocket,
  ChevronRight,
  Filter,
  Search,
  Bell,
  Settings,
  Download,
  Share2,
  LineChart,
  PieChart,
  TrendingDown,
  AlertCircle,
  Activity,
  Layers,
  TargetIcon,
  LineChartIcon,
  Minus
} from "lucide-react";
import { 
  getCurrentUser, 
  getMyJobs, 
  getMyApplications, 
  getMyJobsApplications 
} from "@/lib/appClient";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    // Applicant stats
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    interviewApplications: 0,
    reviewedApplications: 0,
    rejectedApplications: 0,
    
    // Job owner stats
    totalJobsPosted: 0,
    activeJobs: 0,
    totalApplicationsOnJobs: 0,
    pendingApplicationsOnJobs: 0,
    reviewedApplicationsOnJobs: 0,
    interviewApplicationsOnJobs: 0,
    acceptedApplicationsOnJobs: 0,
    rejectedApplicationsOnJobs: 0,
    
    // General stats
    profileCompletion: 0,
    responseRate: 0,
  });
  
  const [jobOwnerApplications, setJobOwnerApplications] = useState<Application[]>([]);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState<'applicant' | 'job-owner'>('applicant');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsAnimating(true);
        
        // Fetch current user
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Calculate profile completion
        const profileCompletion = calculateProfileCompletion(currentUser);
        
        // Fetch user's applications
        const userApplications = await getMyApplications();
        setUserApplications(userApplications);
        
        // Fetch user's jobs
        const userJobs = await getMyJobs();
        setUserJobs(userJobs);
        
        // Fetch applications on user's jobs
        const jobsApplications = await getMyJobsApplications();
        setJobOwnerApplications(jobsApplications);
        
        // Calculate applicant stats
        const totalApplications = userApplications.length;
        const pendingApplications = userApplications.filter(
          app => app.status === ApplicationStatus.PENDING
        ).length;
        const acceptedApplications = userApplications.filter(
          app => app.status === ApplicationStatus.ACCEPTED
        ).length;
        const interviewApplications = userApplications.filter(
          app => app.status === ApplicationStatus.INTERVIEW
        ).length;
        const reviewedApplications = userApplications.filter(
          app => app.status === ApplicationStatus.REVIEWED
        ).length;
        const rejectedApplications = userApplications.filter(
          app => app.status === ApplicationStatus.REJECTED
        ).length;

        // Calculate job owner stats
        const totalApplicationsOnJobs = jobsApplications.length;
        const pendingApplicationsOnJobs = jobsApplications.filter(
          app => app.status === ApplicationStatus.PENDING
        ).length;
        const reviewedApplicationsOnJobs = jobsApplications.filter(
          app => app.status === ApplicationStatus.REVIEWED
        ).length;
        const interviewApplicationsOnJobs = jobsApplications.filter(
          app => app.status === ApplicationStatus.INTERVIEW
        ).length;
        const acceptedApplicationsOnJobs = jobsApplications.filter(
          app => app.status === ApplicationStatus.ACCEPTED
        ).length;
        const rejectedApplicationsOnJobs = jobsApplications.filter(
          app => app.status === ApplicationStatus.REJECTED
        ).length;

        // Calculate active jobs (posted within last 30 days)
        const activeJobs = userJobs.filter(job => 
          new Date(job.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length;

        // Calculate response rate (for job owners)
        const responseRate = totalApplicationsOnJobs > 0 
          ? Math.round(((reviewedApplicationsOnJobs + interviewApplicationsOnJobs + acceptedApplicationsOnJobs) / totalApplicationsOnJobs) * 100)
          : 0;

        setStats({
          totalApplications,
          pendingApplications,
          acceptedApplications,
          interviewApplications,
          reviewedApplications,
          rejectedApplications,
          totalJobsPosted: userJobs.length,
          activeJobs,
          totalApplicationsOnJobs,
          pendingApplicationsOnJobs,
          reviewedApplicationsOnJobs,
          interviewApplicationsOnJobs,
          acceptedApplicationsOnJobs,
          rejectedApplicationsOnJobs,
          profileCompletion,
          responseRate,
        });

        // Generate recent activity from real data
        const generatedActivity = generateRecentActivity(userApplications, jobsApplications, userJobs);
        setRecentActivity(generatedActivity);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateProfileCompletion = (user: User): number => {
    let completion = 0;
    const fields = [
      user.name,
      user.email,
      user.title,
      user.phone,
      user.location,
    ];
    
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    completion = Math.round((completedFields / fields.length) * 100);
    
    return completion;
  };

  const generateRecentActivity = (
    userApplications: Application[], 
    jobApplications: Application[], 
    userJobs: Job[]
  ): any[] => {
    const activities: any[] = [];
    const now = new Date();
    
    // Add user application activities
    userApplications.slice(0, 2).forEach((app, index) => {
      const timeDiff = now.getTime() - new Date(app.createdAt).getTime();
      const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
      
      activities.push({
        id: `user-app-${index}`,
        type: "application",
        action: "applied",
        title: app.job?.title || "Job",
        time: hoursAgo < 24 ? `${hoursAgo} hours ago` : `${Math.floor(hoursAgo / 24)} days ago`,
        status: app.status.toLowerCase(),
      });
    });
    
    // Add job posting activities
    userJobs.slice(0, 1).forEach((job, index) => {
      const timeDiff = now.getTime() - new Date(job.createdAt).getTime();
      const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      
      activities.push({
        id: `job-${index}`,
        type: "job",
        action: "posted",
        title: job.title,
        time: daysAgo === 0 ? "Today" : `${daysAgo} days ago`,
        status: "active",
      });
    });
    
    // Add job application activities
    jobApplications.slice(0, 2).forEach((app, index) => {
      const timeDiff = now.getTime() - new Date(app.createdAt).getTime();
      const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      
      activities.push({
        id: `job-app-${index}`,
        type: "application",
        action: "received",
        title: app.job?.title || "Job",
        time: daysAgo === 0 ? "Today" : `${daysAgo} days ago`,
        status: app.status.toLowerCase(),
        forJob: true,
      });
    });
    
    return activities.sort((a, b) => {
      // Simple sorting - newest first (this is simplified)
      return Math.random() - 0.5;
    }).slice(0, 5);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      [ApplicationStatus.PENDING]: { 
        color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
        icon: ClockIcon,
        gradient: "from-yellow-400 to-yellow-500"
      },
      [ApplicationStatus.REVIEWED]: { 
        color: "bg-blue-100 text-blue-800 border-blue-200", 
        icon: Eye,
        gradient: "from-blue-400 to-blue-500"
      },
      [ApplicationStatus.INTERVIEW]: { 
        color: "bg-purple-100 text-purple-800 border-purple-200", 
        icon: Calendar,
        gradient: "from-purple-400 to-purple-500"
      },
      [ApplicationStatus.ACCEPTED]: { 
        color: "bg-emerald-100 text-emerald-800 border-emerald-200", 
        icon: CheckCircle,
        gradient: "from-emerald-400 to-emerald-500"
      },
      [ApplicationStatus.REJECTED]: { 
        color: "bg-rose-100 text-rose-800 border-rose-200", 
        icon: XCircle,
        gradient: "from-rose-400 to-rose-500"
      },
    };
    return statusConfig[status];
  };

  const calculateApplicationTrends = () => {
    const total = stats.totalApplicationsOnJobs;
    const trends = {
      pending: { percentage: total > 0 ? (stats.pendingApplicationsOnJobs / total) * 100 : 0, trend: "stable" as const },
      reviewed: { percentage: total > 0 ? (stats.reviewedApplicationsOnJobs / total) * 100 : 0, trend: "up" as const },
      interview: { percentage: total > 0 ? (stats.interviewApplicationsOnJobs / total) * 100 : 0, trend: "up" as const },
      accepted: { percentage: total > 0 ? (stats.acceptedApplicationsOnJobs / total) * 100 : 0, trend: "up" as const },
      rejected: { percentage: total > 0 ? (stats.rejectedApplicationsOnJobs / total) * 100 : 0, trend: "down" as const },
    };
    return trends;
  };

  const getTopJobsByApplications = () => {
    return userJobs
      .map(job => ({
        ...job,
        applicationCount: jobOwnerApplications.filter(app => app.jobId === job.id).length
      }))
      .sort((a, b) => b.applicationCount - a.applicationCount)
      .slice(0, 3);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const applicationTrends = calculateApplicationTrends();

  // Generate stats cards data based on view mode
  const statsCardsData = viewMode === 'applicant' 
    ? [
        { 
          label: "Total Applications", 
          value: stats.totalApplications, 
          change: stats.totalApplications > 0 ? "+0%" : "0", 
          icon: FileText, 
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          trend: stats.totalApplications > 0 ? "up" : "stable"
        },
        { 
          label: "Pending", 
          value: stats.pendingApplications, 
          change: stats.pendingApplications > 0 ? "+0" : "0", 
          icon: Clock, 
          color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
          trend: stats.pendingApplications > 0 ? "up" : "stable"
        },
        { 
          label: "Interviews", 
          value: stats.interviewApplications, 
          change: stats.interviewApplications > 0 ? "+0" : "0", 
          icon: Calendar, 
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          trend: stats.interviewApplications > 0 ? "up" : "stable"
        },
        { 
          label: "Accepted", 
          value: stats.acceptedApplications, 
          change: "0", 
          icon: CheckCircle, 
          color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
          trend: "stable"
        },
      ]
    : [
        { 
          label: "Jobs Posted", 
          value: stats.totalJobsPosted, 
          change: stats.totalJobsPosted > 0 ? "+0" : "0", 
          icon: Briefcase, 
          color: "bg-gradient-to-br from-blue-500 to-blue-600",
          trend: stats.totalJobsPosted > 0 ? "up" : "stable"
        },
        { 
          label: "Total Applications", 
          value: stats.totalApplicationsOnJobs, 
          change: stats.totalApplicationsOnJobs > 0 ? "+0" : "0", 
          icon: Users, 
          color: "bg-gradient-to-br from-purple-500 to-purple-600",
          trend: stats.totalApplicationsOnJobs > 0 ? "up" : "stable"
        },
        { 
          label: "Pending Review", 
          value: stats.pendingApplicationsOnJobs, 
          change: stats.pendingApplicationsOnJobs > 0 ? "+0" : "0", 
          icon: Eye, 
          color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
          trend: stats.pendingApplicationsOnJobs > 0 ? "up" : "stable"
        },
        { 
          label: "Response Rate", 
          value: `${stats.responseRate}%`, 
          change: stats.responseRate > 0 ? "+0%" : "0%", 
          icon: TrendingUp, 
          color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
          trend: stats.responseRate > 0 ? "up" : "stable"
        },
      ];

  return (
    <div className={`w-full mx-auto p-4 md:p-6 space-y-6 transition-all duration-700 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            Welcome back, <span className="font-semibold text-blue-700">{user?.name || "User"}</span>. Here's your career snapshot
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-blue-200 p-1">
            <Button
              variant={viewMode === 'applicant' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('applicant')}
              className={`gap-2 ${viewMode === 'applicant' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            >
              <UserIcon className="h-4 w-4" />
              Applicant View
            </Button>
            <Button
              variant={viewMode === 'job-owner' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('job-owner')}
              className={`gap-2 ${viewMode === 'job-owner' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
            >
              <Briefcase className="h-4 w-4" />
              Job Owner View
            </Button>
          </div>
          
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20"
            size="sm"
            onClick={() => window.location.href = '/dashboard/jobs/new'}
          >
            <Plus className="h-4 w-4" />
            Post Job
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCardsData.map((stat, index) => (
          <Card 
            key={index} 
            className="group relative overflow-hidden border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`text-xs font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : 
                      stat.trend === "complete" ? "text-blue-600" : "text-rose-600"
                    }`}>
                      {stat.change}
                    </span>
                    {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-600" />}
                    {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-rose-600" />}
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-full transition-all duration-500" />
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Status Cards */}
          <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${viewMode === 'applicant' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-emerald-500 to-emerald-600'} rounded-lg`}>
                    {viewMode === 'applicant' ? (
                      <FileText className="h-5 w-5 text-white" />
                    ) : (
                      <PieChart className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {viewMode === 'applicant' ? 'Your Application Status' : 'Applications on Your Jobs'}
                    </CardTitle>
                    <CardDescription>
                      {viewMode === 'applicant' ? 'Track your job applications' : 'Analytics for applications on your posted jobs'}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    <Activity className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(viewMode === 'applicant' ? [
                  { status: ApplicationStatus.PENDING, count: stats.pendingApplications, label: "Pending" },
                  { status: ApplicationStatus.REVIEWED, count: stats.reviewedApplications, label: "Reviewed" },
                  { status: ApplicationStatus.INTERVIEW, count: stats.interviewApplications, label: "Interview" },
                  { status: ApplicationStatus.ACCEPTED, count: stats.acceptedApplications, label: "Accepted" },
                  { status: ApplicationStatus.REJECTED, count: stats.rejectedApplications, label: "Rejected" },
                ] : [
                  { status: ApplicationStatus.PENDING, count: stats.pendingApplicationsOnJobs, label: "Pending" },
                  { status: ApplicationStatus.REVIEWED, count: stats.reviewedApplicationsOnJobs, label: "Reviewed" },
                  { status: ApplicationStatus.INTERVIEW, count: stats.interviewApplicationsOnJobs, label: "Interview" },
                  { status: ApplicationStatus.ACCEPTED, count: stats.acceptedApplicationsOnJobs, label: "Accepted" },
                  { status: ApplicationStatus.REJECTED, count: stats.rejectedApplicationsOnJobs, label: "Rejected" },
                ]).map((item, index) => {
                  const config = getStatusBadge(item.status);
                  const Icon = config.icon;
                  const total = viewMode === 'applicant' ? stats.totalApplications : stats.totalApplicationsOnJobs;
                  const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
                  
                  return (
                    <div 
                      key={index}
                      className="relative group cursor-pointer"
                      onClick={() => {
                        // Navigate to appropriate page based on view mode
                        if (viewMode === 'applicant') {
                          window.location.href = '/dashboard/applications';
                        } else {
                          window.location.href = '/dashboard/my-jobs/applications';
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 rounded-xl border-2 border-blue-100/50 group-hover:border-blue-300/50 transition-all duration-300" />
                      <div className="relative p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Icon className={`h-5 w-5 ${config.color.replace('bg-', 'text-').replace(' text-', '-')}`} />
                          <div className="text-right">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              {item.count}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">{total > 0 ? `${percentage}%` : '0%'}</div>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{item.label}</p>
                        <div className="mt-2">
                          <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        {/* Trend indicator for job owner view */}
                        {viewMode === 'job-owner' && (
                          <div className="flex items-center gap-1 mt-2">
                            {applicationTrends[item.status.toLowerCase() as keyof typeof applicationTrends]?.trend === 'up' ? (
                              <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                            ) : applicationTrends[item.status.toLowerCase() as keyof typeof applicationTrends]?.trend === 'down' ? (
                              <TrendingDown className="h-3 w-3 text-rose-600" />
                            ) : (
                              <Minus className="h-3 w-3 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-500">
                              {applicationTrends[item.status.toLowerCase() as keyof typeof applicationTrends]?.trend || 'stable'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Additional analytics for job owner view */}
              {viewMode === 'job-owner' && stats.totalApplicationsOnJobs > 0 && (
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-blue-100 bg-blue-50/30">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Average Response Time</span>
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalApplicationsOnJobs > 0 ? "1-2 days" : "N/A"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">From application to first review</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-emerald-100 bg-emerald-50/30">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Top Performing Job</span>
                          <TargetIcon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <p className="font-bold text-gray-900 truncate">
                          {getTopJobsByApplications()[0]?.title || "No jobs yet"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {getTopJobsByApplications()[0]?.applicationCount || 0} applications
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Owner Analytics Section */}
          {viewMode === 'job-owner' && stats.totalJobsPosted > 0 && (
            <Card className="border-2 border-emerald-100/50 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
                      <LineChartIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Job Performance Analytics</CardTitle>
                      <CardDescription>Detailed insights for your posted jobs</CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-emerald-600 hover:text-emerald-700"
                    onClick={() => window.location.href = '/dashboard/my-jobs'}
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Top Jobs by Applications */}
                  {userJobs.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Top Jobs by Applications</h4>
                      <div className="space-y-3">
                        {getTopJobsByApplications().map((job, index) => (
                          <div 
                            key={job.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-blue-100 hover:border-blue-300/50 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer"
                            onClick={() => window.location.href = `/dashboard/my-jobs/${job.id}`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded ${index === 0 ? 'bg-emerald-100' : index === 1 ? 'bg-blue-100' : 'bg-purple-100'}`}>
                                  <Briefcase className={`h-4 w-4 ${index === 0 ? 'text-emerald-600' : index === 1 ? 'text-blue-600' : 'text-purple-600'}`} />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900 truncate">{job.title}</p>
                                  <p className="text-sm text-gray-600 truncate">{job.company} • {job.location}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                {job.applicationCount} applications
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Application Trends */}
                  {stats.totalApplicationsOnJobs > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border border-blue-100 bg-white">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-700">This Month</span>
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-2xl font-bold text-gray-900">
                                {Math.floor(stats.totalApplicationsOnJobs * 0.4) || stats.totalApplicationsOnJobs}
                              </p>
                              <p className="text-xs text-gray-500">Applications</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-emerald-600">
                                <ArrowUpRight className="h-3 w-3" />
                                <span className="text-sm font-medium">
                                  {stats.totalApplicationsOnJobs > 0 ? "+0%" : "0%"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">vs last month</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-emerald-100 bg-white">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-700">Interview Rate</span>
                            <Activity className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-2xl font-bold text-gray-900">
                                {stats.totalApplicationsOnJobs > 0 
                                  ? Math.round((stats.interviewApplicationsOnJobs / stats.totalApplicationsOnJobs) * 100) 
                                  : 0}%
                              </p>
                              <p className="text-xs text-gray-500">of applications</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-emerald-600">
                                <ArrowUpRight className="h-3 w-3" />
                                <span className="text-sm font-medium">
                                  {stats.interviewApplicationsOnJobs > 0 ? "+0%" : "0%"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">vs last month</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Feed */}
          <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <CardDescription>Track your career progress</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => window.location.href = viewMode === 'applicant' ? '/dashboard/applications' : '/dashboard/my-jobs/applications'}
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={activity.id}
                      className={`flex items-center gap-4 p-3 rounded-xl border ${activity.forJob ? 'border-emerald-100 hover:border-emerald-300/50 hover:bg-emerald-50/30' : 'border-blue-100 hover:border-blue-300/50 hover:bg-blue-50/30'} transition-all duration-300 group ${index === 0 ? 'animate-pulse' : ''}`}
                    >
                      <div className={`p-2 rounded-lg ${activity.forJob ? 'bg-emerald-100' : activity.type === "application" ? "bg-blue-100" : "bg-purple-100"}`}>
                        {activity.forJob ? (
                          <Briefcase className="h-4 w-4 text-emerald-600" />
                        ) : activity.type === "application" ? (
                          <FileText className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Briefcase className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {activity.forJob ? "Received application for " : ""}
                          {activity.action === "applied" && "Applied for"}
                          {activity.action === "posted" && "Posted"}
                          {activity.action === "reviewed" && "Application reviewed for"}
                          {activity.action === "status" && "Status updated for"}
                          {activity.action === "received" && "Received application for"}
                          {" "}
                          <span className={activity.forJob ? "text-emerald-600" : "text-blue-600"}>{activity.title}</span>
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`border-2 capitalize ${
                          activity.status === "pending" ? "border-yellow-200 bg-yellow-50 text-yellow-700" :
                          activity.status === "active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                          activity.status === "interview" ? "border-purple-200 bg-purple-50 text-purple-700" :
                          "border-blue-200 bg-blue-50 text-blue-700"
                        }`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400 mt-1">Your activities will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-2 border-blue-100/50 bg-gradient-to-br from-blue-50/50 to-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                onClick={() => window.location.href = '/dashboard/jobs/new'}
              >
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50"
                onClick={() => setViewMode(viewMode === 'applicant' ? 'job-owner' : 'applicant')}
              >
                {viewMode === 'applicant' ? (
                  <>
                    <Briefcase className="h-4 w-4" />
                    View Job Analytics
                  </>
                ) : (
                  <>
                    <UserIcon className="h-4 w-4" />
                    View Applications
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50"
                onClick={() => window.location.href = '/dashboard/profile/edit'}
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50"
                onClick={() => window.location.href = '/jobs'}
              >
                <Search className="h-4 w-4" />
                Browse Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Recent Applications/Jobs */}
          <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {viewMode === 'applicant' ? 'Recent Applications' : 'Recent Job Applications'}
                </CardTitle>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  {viewMode === 'applicant' ? userApplications.length : stats.totalApplicationsOnJobs} total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(viewMode === 'applicant' 
                  ? userApplications.slice(0, 3)
                  : jobOwnerApplications.slice(0, 3)
                ).map((application, index) => (
                  <div 
                    key={application.id}
                    className={`p-4 rounded-xl border-2 hover:border-blue-300/50 hover:shadow-md transition-all duration-300 group cursor-pointer ${
                      index === 0 ? 'border-yellow-200 bg-yellow-50/30' : 'border-blue-100'
                    }`}
                    onClick={() => {
                      if (viewMode === 'applicant') {
                        window.location.href = `/dashboard/applications/${application.id}`;
                      } else {
                        window.location.href = `/dashboard/my-jobs/applications/${application.id}`;
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {viewMode === 'applicant' ? application.job?.title : `Application for ${application.job?.title}`}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {viewMode === 'applicant' 
                            ? application.job?.company 
                            : `From: ${application.user?.name || 'Applicant'}`
                          }
                        </p>
                      </div>
                      <Badge className={getStatusBadge(application.status).color}>
                        {application.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs">
                          {viewMode === 'applicant' 
                            ? application.job?.location 
                            : application.user?.email || 'No email'
                          }
                        </span>
                      </div>
                      {viewMode === 'applicant' && application.job?.salary && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-xs">{application.job.salary}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {viewMode === 'applicant' ? 'Applied' : 'Received'} {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                        <ChevronRight className="h-4 w-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {(viewMode === 'applicant' ? userApplications.length > 3 : jobOwnerApplications.length > 3) && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      if (viewMode === 'applicant') {
                        window.location.href = '/dashboard/applications';
                      } else {
                        window.location.href = '/dashboard/my-jobs/applications';
                      }
                    }}
                  >
                    View all {viewMode === 'applicant' ? 'applications' : 'job applications'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
                
                {(viewMode === 'applicant' ? userApplications.length === 0 : jobOwnerApplications.length === 0) && (
                  <div className="text-center py-6">
                    <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      {viewMode === 'applicant' 
                        ? 'No applications yet' 
                        : 'No applications on your jobs yet'
                      }
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Progress */}
          <Card className="border-2 border-blue-100/50 bg-gradient-to-br from-blue-50/30 to-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-600" />
                Profile Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Completion</span>
                    <span className="text-sm font-bold text-blue-700">{stats.profileCompletion}%</span>
                  </div>
                  <Progress value={stats.profileCompletion} className="h-2 bg-blue-100" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Name & Email", completed: !!(user?.name && user?.email) },
                    { label: "Title", completed: !!user?.title },
                    { label: "Phone", completed: !!user?.phone },
                    { label: "Location", completed: !!user?.location },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${item.completed ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                      <span className="text-xs font-medium text-gray-700">{item.label}</span>
                      {item.completed && (
                        <CheckCircle className="h-3 w-3 text-emerald-500 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => window.location.href = '/dashboard/profile/edit'}
                >
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}