"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplicationsChart from '@/components/ApplicationsChart';
import { ApplicationStatus, Application } from '@/lib/types';
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
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  TrendingUp, 
  Calendar,
  Clock,
  XCircle,
  FileText,
  BarChart3,
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

  // Define tabs with proper status values - NO BLUE COLORS
  const statusTabs = [
    { value: "all", label: "All", color: "text-gray-700" },
    { value: ApplicationStatus.PENDING.toLowerCase(), label: "Pending", status: ApplicationStatus.PENDING, color: "text-amber-600" },
    { value: ApplicationStatus.REVIEWED.toLowerCase(), label: "Reviewed", status: ApplicationStatus.REVIEWED, color: "text-gray-700" },
    { value: ApplicationStatus.INTERVIEW.toLowerCase(), label: "Interview", status: ApplicationStatus.INTERVIEW, color: "text-purple-600" },
    { value: ApplicationStatus.ACCEPTED.toLowerCase(), label: "Accepted", status: ApplicationStatus.ACCEPTED, color: "text-green-600" },
    { value: ApplicationStatus.REJECTED.toLowerCase(), label: "Rejected", status: ApplicationStatus.REJECTED, color: "text-red-600" }
  ];

  // Show loading state while checking auth/fetching data
  if (isLoading || !authChecked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Applications...
          </h3>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Applications
              </h1>
              <p className="text-gray-600 mt-2">
                Track and manage your job applications
              </p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Button 
                variant="outline" 
                className="gap-2 border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={handleExport}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button 
                className="gap-2 bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleNewApplication}
              >
                <TrendingUp className="h-4 w-4" />
                Browse Jobs
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {getStatusCount(ApplicationStatus.PENDING)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interview</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {getStatusCount(ApplicationStatus.INTERVIEW)}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {getActiveApplicationsCount()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chart Section */}
        <Card className="mb-8 border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">Application Analytics</CardTitle>
                  <p className="text-sm text-gray-600">Track your application progress over time</p>
                </div>
              </div>
              <Badge variant="outline" className="border-gray-300 text-gray-700">
                Last 30 days
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
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
                className="pl-10 border border-gray-300 bg-white focus:border-gray-400 rounded-lg"
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
                  <TabsList className="bg-gray-100 border border-gray-300 p-1 rounded-lg flex-wrap h-auto">
                    {statusTabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.value}
                        value={tab.value}
                        className={`data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-300 rounded px-3 py-2 text-sm ${tab.color}`}
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
                  className="gap-2 border-gray-300 hover:bg-gray-50 text-gray-700"
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
              Showing <span className="font-semibold text-gray-900">{filteredApplications.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{applications.length}</span> applications
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
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-600" />
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
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                      onClick={handleNewApplication}
                    >
                      Browse Available Jobs
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      onClick={clearFilters}
                      className="border-gray-300 hover:bg-gray-50 text-gray-700"
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