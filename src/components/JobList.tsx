"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Building, Loader2, X } from "lucide-react";
import JobCard from "./JobCard";

import { JobType, JobCategory, Job } from "@/lib/types";
import { getAllJobs } from "@/lib/appClient";

interface JobListProps {
  dashboardMode?: boolean;
  showApplicationCount?: boolean;
}

export default function JobList({ dashboardMode, showApplicationCount }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Engineering", "Design", "Operations", "Marketing"];

  // Fetch jobs from backend on mount
  useEffect(() => {
    setIsLoading(true);
    getAllJobs()
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(() => {
        setJobs([]);
        setIsLoading(false);
      });
  }, []);

  // Filter jobs based on search and category
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = jobs.filter((job) => {
        const matchesSearch = searchQuery
          ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesCategory =
          selectedCategory === "All" || job.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });
      setFilteredJobs(filtered);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, jobs]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // ...existing code...
  // In the returned JSX, if dashboardMode is true, show edit/delete buttons for each job

  const hasActiveFilters = searchQuery || selectedCategory !== "All";

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="w-full mx-auto">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our curated list of opportunities and take the next step in your career journey.
          </p>
        </div>

        <Card className="w-full mx-auto shadow-xl border-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Available Jobs</h2>
                <p className="text-muted-foreground">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"} found
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-auto min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      Search: "{searchQuery}"
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSearchQuery("")}
                      />
                    </Badge>
                  )}
                  {selectedCategory !== "All" && (
                    <Badge variant="secondary" className="gap-1">
                      Category: {selectedCategory}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedCategory("All")}
                      />
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 hover:bg-transparent"
                >
                  Clear all
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600">Finding the best opportunities for you...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} dashboardMode={dashboardMode} showApplicationCount={showApplicationCount} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any jobs matching your criteria. Try adjusting your search or filters.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Stats */}
            {filteredJobs.length > 0 && !isLoading && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">
                      {new Set(filteredJobs.map(job => job.location)).size} locations
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">
                      {new Set(filteredJobs.map(job => job.company)).size} companies
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Last updated: Just now
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Found {filteredJobs.length} of {jobs.length} total jobs • 
            New opportunities added daily
          </p>
        </div>
      </div>
    </div>
  );
}