"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplicationsChart from '@/components/ApplicationsChart';
import { ApplicationStatus, JobType, JobCategory, Application, Job, User } from '@/lib/types';
import ApplicationStatusCard from '@/components/ApplicationStatusCard';
import { getMyApplications } from "@/lib/appClient";
import { isUserLoggedIn } from "@/lib/authClient";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Sparkles,
  BarChart3,
  ChevronDown,
  Eye
} from "lucide-react";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  // Single useEffect for authentication and data fetching
  useEffect(() => {
    const checkAuthAndFetchApplications = async () => {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') return;
      
      // Check authentication
      if (!isUserLoggedIn()) {
        router.push('/login');
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getMyApplications();
        setApplications(data);
        setAuthChecked(true);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        // If fetch fails, token might be invalid - redirect to login
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchApplications();
  }, [router]);

  // Filter applications based on search and active tab
  useEffect(() => {
    let filtered = applications;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app =>
        app.job?.title?.toLowerCase().includes(query) ||
        app.job?.company?.toLowerCase().includes(query) ||
        app.job?.description?.toLowerCase().includes(query) ||
        app.id?.toLowerCase().includes(query)
      );
    }
    
    if (activeTab !== "all") {
      // Convert activeTab to uppercase to match ApplicationStatus enum
      const status = activeTab.toUpperCase() as ApplicationStatus;
      filtered = filtered.filter(app => app.status === status);
    }
    
    setFilteredApplications(filtered);
  }, [applications, searchQuery, activeTab]);

  // Show loading state while checking auth/fetching data
  if (isLoading || !authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Applications...
          </h3>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  // Helper functions to get counts
  const getStatusCount = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status).length;
  };

  const getActiveApplicationsCount = () => {
    return applications.filter(app => 
      [ApplicationStatus.PENDING, ApplicationStatus.REVIEWED, ApplicationStatus.INTERVIEW]
        .includes(app.status)
    ).length;
  };

  const handleExport = () => {
    console.log("Export applications");
    // Implement export logic
  };

  const handleNewApplication = () => {
    router.push('/jobs');
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
  };

  // Define tabs with proper status values
  const statusTabs = [
    { value: "all", label: "All" },
    { value: ApplicationStatus.PENDING.toLowerCase(), label: "Pending", status: ApplicationStatus.PENDING, color: "text-yellow-700" },
    { value: ApplicationStatus.REVIEWED.toLowerCase(), label: "Reviewed", status: ApplicationStatus.REVIEWED, color: "text-blue-700" },
    { value: ApplicationStatus.INTERVIEW.toLowerCase(), label: "Interview", status: ApplicationStatus.INTERVIEW, color: "text-purple-700" },
    { value: ApplicationStatus.ACCEPTED.toLowerCase(), label: "Accepted", status: ApplicationStatus.ACCEPTED, color: "text-green-700" },
    { value: ApplicationStatus.REJECTED.toLowerCase(), label: "Rejected", status: ApplicationStatus.REJECTED, color: "text-red-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/10">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                    My Applications
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    Track and manage your job applications in one place
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Button 
                variant="outline" 
                className="gap-2 border-blue-200 hover:bg-blue-50"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button 
                className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={handleNewApplication}
              >
                <TrendingUp className="h-4 w-4" />
                Browse Jobs
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-blue-700">{applications.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-yellow-100/50 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {getStatusCount(ApplicationStatus.PENDING)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-100/50 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interview</p>
                    <p className="text-2xl font-bold text-green-700">
                      {getStatusCount(ApplicationStatus.INTERVIEW)}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-100/50 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {getActiveApplicationsCount()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chart Section */}
        <Card className="mb-8 border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Application Analytics</CardTitle>
                  <p className="text-sm text-gray-600">Track your application progress over time</p>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                Last 30 days
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Check if ApplicationsChart accepts applications prop */}
            <ApplicationsChart />
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applications by job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2 border-blue-100 bg-white/70 focus:border-blue-400 rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex gap-2 flex-wrap">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-blue-50/50 border border-blue-100 p-1 rounded-xl flex-wrap h-auto">
                    {statusTabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.value}
                        value={tab.value}
                        className={`data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 ${tab.color}`}
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              
              {(searchQuery || activeTab !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                  className="gap-2 border-blue-200 hover:bg-blue-50"
                >
                  <XCircle className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Results Count */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-700">{filteredApplications.length}</span> of{" "}
              <span className="font-semibold text-gray-700">{applications.length}</span> applications
            </p>
            {filteredApplications.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredApplications.map((app) => (
                <ApplicationStatusCard
                  key={app.id}
                  application={app}
                />
              ))}
            </div>
          ) : (
            <Card className="border-2 border-blue-100/50 bg-white/80 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {applications.length === 0 ? "No Applications Yet" : "No Matching Applications"}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {applications.length === 0 
                    ? "You haven't applied to any jobs yet. Start your job search today!"
                    : searchQuery 
                      ? `No applications match "${searchQuery}"`
                      : `No applications found with "${statusTabs.find(t => t.value === activeTab)?.label || activeTab}" status`}
                </p>
                <div className="flex gap-3 justify-center">
                  {applications.length === 0 ? (
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      onClick={handleNewApplication}
                    >
                      Browse Available Jobs
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      onClick={clearFilters}
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      View All Applications
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}