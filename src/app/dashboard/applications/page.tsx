"use client";
import { useState, useEffect } from "react";
import ApplicationsChart from '@/components/ApplicationsChart';
import { ApplicationStatus, JobType, JobCategory, Application, Job, User } from '../../../lib/types';
import ApplicationStatusCard from '@/components/ApplicationStatusCard';
import { getMyApplications } from "@/lib/appClient";
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
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("access-token"));
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoading(true);
    getMyApplications()
      .then((data) => setApplications(data))
      .catch(() => setApplications([]))
      .finally(() => setIsLoading(false));
  }, [isLoggedIn]);

  useEffect(() => {
    let filtered = applications;
    if (searchQuery) {
      filtered = filtered.filter(app =>
        (app.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
        (app.job?.company?.toLowerCase().includes(searchQuery.toLowerCase()) || "")
      );
    }
    if (activeTab !== "all") {
      filtered = filtered.filter(app => app.status?.toLowerCase() === activeTab);
    }
    setFilteredApplications(filtered);
  }, [applications, searchQuery, activeTab]);

  if (!isLoggedIn) {
    return (
      <div className="py-8 px-4 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">My Applications</h1>
        <div className="text-red-500">You must be logged in to view your applications.</div>
      </div>
    );
  }

  const handleDeleteApplication = (id: string) => {
    console.log("Delete application:", id);
    // Implement delete logic
  };

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  My Applications
                </h1>
              </div>
              <p className="text-gray-600 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Track and manage your job applications in one place
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2 border-blue-200 hover:bg-blue-50"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <TrendingUp className="h-4 w-4" />
                New Application
              </Button>
            </div>
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
            <ApplicationsChart/>
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
            </div>
            
            <div className="flex items-center gap-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="bg-blue-50/50 border border-blue-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg px-4"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pending" 
                    className="data-[state=active]:bg-white data-[state=active]:text-yellow-700 data-[state=active]:shadow-sm rounded-lg px-4"
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviewed" 
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg px-4"
                  >
                    Reviewed
                  </TabsTrigger>
                  <TabsTrigger 
                    value="interview" 
                    className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-lg px-4"
                  >
                    Interview
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" className="gap-2 border-blue-200 hover:bg-blue-50">
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-700">{filteredApplications.length}</span> of{" "}
              <span className="font-semibold text-gray-700">{applications.length}</span> applications
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                Most Recent
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-2 border-blue-100/50 bg-white/50 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-blue-100 rounded mb-4"></div>
                    <div className="h-3 bg-blue-100 rounded mb-2"></div>
                    <div className="h-3 bg-blue-100 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredApplications.length > 0 ? (
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
                  No applications found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `No applications match "${searchQuery}"`
                    : `No applications in the "${activeTab}" status`}
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                >
                  View All Applications
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}