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
  LineChart
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    interviewApplications: 0,
    totalJobsPosted: 0,
    activeJobs: 0,
    profileCompletion: 85,
    responseRate: 68,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsAnimating(true);
    
    const mockUser: User = {
      id: "1",
      name: "Jane Doe",
      email: "jane@example.com",
      password: "hashed_password",
      createdAt: "2024-01-15",
      updatedAt: "2024-02-01",
      jobs: [
        {
          id: "j1",
          title: "Senior Frontend Developer",
          company: "Tech Innovators Inc.",
          location: "Kigali, Rwanda",
          description: "Build modern UIs with React and Next.js. Experience with TypeScript required.",
          applicationMethod: { type: "email", value: "careers@techinnovators.com" },
          salary: "$80,000 - $120,000",
          jobType: JobType.FULL_TIME,
          category: JobCategory.TECHNOLOGY,
          createdAt: "2024-01-20",
          updatedAt: "2024-01-20",
          postedById: "1",
          applications: [
            { id: "a1", userId: "2", jobId: "j1", status: ApplicationStatus.PENDING, createdAt: "2024-01-22", user: { id: "2", name: "Mock User", email: "mock2@example.com", password: "", createdAt: "", updatedAt: "", jobs: [], applications: [] }, job: { id: "j1", title: "Senior Frontend Developer", company: "Tech Innovators Inc.", location: "Kigali, Rwanda", description: "", applicationMethod: { type: "email", value: "" }, salary: "", jobType: JobType.FULL_TIME, category: JobCategory.TECHNOLOGY, createdAt: "", updatedAt: "", postedById: "1", applications: [] } },
            { id: "a2", userId: "3", jobId: "j1", status: ApplicationStatus.REVIEWED, createdAt: "2024-01-21", user: { id: "3", name: "Mock User", email: "mock3@example.com", password: "", createdAt: "", updatedAt: "", jobs: [], applications: [] }, job: { id: "j1", title: "Senior Frontend Developer", company: "Tech Innovators Inc.", location: "Kigali, Rwanda", description: "", applicationMethod: { type: "email", value: "" }, salary: "", jobType: JobType.FULL_TIME, category: JobCategory.TECHNOLOGY, createdAt: "", updatedAt: "", postedById: "1", applications: [] } },
          ],
        },
        {
          id: "j2",
          title: "UX Designer",
          company: "Creative Solutions",
          location: "Remote",
          description: "Create beautiful user experiences for web and mobile apps.",
          applicationMethod: { type: "website", value: "https://creative-solutions.com/careers" },
          salary: "$70,000 - $100,000",
          jobType: JobType.REMOTE,
          category: JobCategory.TECHNOLOGY,
          createdAt: "2024-01-25",
          updatedAt: "2024-01-25",
          postedById: "1",
          applications: [
            { id: "a3", userId: "4", jobId: "j2", status: ApplicationStatus.INTERVIEW, createdAt: "2024-01-26", user: { id: "4", name: "Mock User", email: "mock4@example.com", password: "", createdAt: "", updatedAt: "", jobs: [], applications: [] }, job: { id: "j2", title: "UX Designer", company: "Creative Solutions", location: "Remote", description: "", applicationMethod: { type: "website", value: "" }, salary: "", jobType: JobType.REMOTE, category: JobCategory.TECHNOLOGY, createdAt: "", updatedAt: "", postedById: "1", applications: [] } },
          ],
        },
      ],
      applications: [
        {
          id: "app1",
          userId: "1",
          jobId: "j3",
          coverLetter: "I'm excited about this opportunity...",
          resumeUrl: "https://example.com/resume.pdf",
          createdAt: "2024-01-28",
          status: ApplicationStatus.PENDING,
          job: {
            id: "j3",
            title: "Backend Engineer",
            company: "DataWorks",
            location: "Remote",
            description: "Design scalable APIs and work with PostgreSQL.",
            applicationMethod: { type: "email", value: "hr@dataworks.com" },
            salary: "$90,000 - $130,000",
            jobType: JobType.REMOTE,
            category: JobCategory.TECHNOLOGY,
            createdAt: "2024-01-20",
            updatedAt: "2024-01-20",
            postedById: "5",
            applications: [],
          },
          user: { id: "1", name: "Jane Doe", email: "jane@example.com", password: "", createdAt: "", updatedAt: "", jobs: [], applications: [] },
        },
        {
          id: "app2",
          userId: "1",
          jobId: "j4",
          coverLetter: "I have relevant experience...",
          resumeUrl: "https://example.com/resume.pdf",
          createdAt: "2024-01-25",
          status: ApplicationStatus.INTERVIEW,
          job: {
            id: "j4",
            title: "Product Manager",
            company: "Product Labs",
            location: "Nairobi, Kenya",
            description: "Lead product development and strategy.",
            applicationMethod: { type: "website", value: "https://productlabs.com/careers" },
            salary: "$100,000 - $140,000",
            jobType: JobType.HYBRID,
            category: JobCategory.TECHNOLOGY,
            createdAt: "2024-01-18",
            updatedAt: "2024-01-18",
            postedById: "6",
            applications: [],
          },
          user: { id: "1", name: "Jane Doe", email: "jane@example.com", password: "", createdAt: "", updatedAt: "", jobs: [], applications: [] },
        },
      ],
    };

    setTimeout(() => {
      setUser(mockUser);
      
      const totalApplications = mockUser.applications?.length || 0;
      const pendingApplications = mockUser.applications?.filter(
        app => app.status === ApplicationStatus.PENDING
      ).length || 0;
      const acceptedApplications = mockUser.applications?.filter(
        app => app.status === ApplicationStatus.ACCEPTED
      ).length || 0;
      const interviewApplications = mockUser.applications?.filter(
        app => app.status === ApplicationStatus.INTERVIEW
      ).length || 0;

      setStats({
        totalApplications,
        pendingApplications,
        acceptedApplications,
        interviewApplications,
        totalJobsPosted: mockUser.jobs?.length || 0,
        activeJobs: mockUser.jobs?.filter(job => 
          new Date(job.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length || 0,
        profileCompletion: 85,
        responseRate: 68,
      });

      setRecentActivity([
        { id: 1, type: "application", action: "applied", title: "Backend Engineer", time: "2 hours ago", status: "pending" },
        { id: 2, type: "job", action: "posted", title: "Senior Frontend Developer", time: "1 day ago", status: "active" },
        { id: 3, type: "application", action: "reviewed", title: "Product Manager", time: "2 days ago", status: "interview" },
        { id: 4, type: "application", action: "status", title: "UX Designer", time: "3 days ago", status: "reviewed" },
      ]);

      setIsLoading(false);
    }, 500);
  }, []);

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

  if (isLoading || !user) {
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
            Welcome back, <span className="font-semibold text-blue-700">{user.name}</span>. Here's your career snapshot
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Post Job
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: "Total Applications", 
            value: stats.totalApplications, 
            change: "+12%", 
            icon: FileText, 
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
            trend: "up"
          },
          { 
            label: "Jobs Posted", 
            value: stats.totalJobsPosted, 
            change: "+2", 
            icon: Briefcase, 
            color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
            trend: "up"
          },
          { 
            label: "Response Rate", 
            value: `${stats.responseRate}%`, 
            change: "+5%", 
            icon: Target, 
            color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
            trend: "up"
          },
          { 
            label: "Profile Score", 
            value: `${stats.profileCompletion}%`, 
            change: "Complete", 
            icon: Award, 
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
            trend: "complete"
          },
        ].map((stat, index) => (
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
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
            {/* Animated progress bar */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-full transition-all duration-500" />
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { status: ApplicationStatus.PENDING, count: stats.pendingApplications, label: "Pending" },
              { status: ApplicationStatus.INTERVIEW, count: stats.interviewApplications, label: "Interview" },
              { status: ApplicationStatus.REVIEWED, count: user.applications?.filter(app => app.status === ApplicationStatus.REVIEWED).length || 0, label: "Reviewed" },
              { status: ApplicationStatus.ACCEPTED, count: stats.acceptedApplications, label: "Accepted" },
            ].map((item, index) => {
              const config = getStatusBadge(item.status);
              const Icon = config.icon;
              
              return (
                <div 
                  key={index}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 rounded-xl border-2 border-blue-100/50 group-hover:border-blue-300/50 transition-all duration-300" />
                  <div className="relative p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`h-5 w-5 ${config.color.replace('bg-', 'text-').replace(' text-', '-')}`} />
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                    <div className="mt-2">
                      <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                          style={{ width: `${(item.count / Math.max(stats.totalApplications, 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className={`flex items-center gap-4 p-3 rounded-xl border border-blue-100 hover:border-blue-300/50 hover:bg-blue-50/30 transition-all duration-300 group ${index === 0 ? 'animate-pulse' : ''}`}
                  >
                    <div className={`p-2 rounded-lg ${activity.type === "application" ? "bg-blue-100" : "bg-emerald-100"}`}>
                      {activity.type === "application" ? (
                        <FileText className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {activity.action === "applied" && "Applied for"}
                        {activity.action === "posted" && "Posted"}
                        {activity.action === "reviewed" && "Application reviewed for"}
                        {activity.action === "status" && "Status updated for"}
                        {" "}
                        <span className="text-blue-600">{activity.title}</span>
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
              <Button className="w-full justify-start gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg">
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50">
                <Search className="h-4 w-4" />
                Find Candidates
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 border-blue-200 hover:bg-blue-50">
                <Share2 className="h-4 w-4" />
                Share Profile
              </Button>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Applications</CardTitle>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  {user.applications?.length || 0} total
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.applications?.slice(0, 3).map((application, index) => (
                  <div 
                    key={application.id}
                    className={`p-4 rounded-xl border-2 hover:border-blue-300/50 hover:shadow-md transition-all duration-300 group cursor-pointer ${
                      index === 0 ? 'border-yellow-200 bg-yellow-50/30' : 'border-blue-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {application.job?.title}
                        </h4>
                        <p className="text-sm text-gray-600">{application.job?.company}</p>
                      </div>
                      <Badge className={getStatusBadge(application.status).color}>
                        {application.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs">{application.job?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-xs">{application.job?.salary}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          Applied {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                        <ChevronRight className="h-4 w-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
                {user.applications && user.applications.length > 3 && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    View all applications
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
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
                    { label: "Resume", completed: true },
                    { label: "Skills", completed: true },
                    { label: "Experience", completed: true },
                    { label: "Portfolio", completed: false },
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