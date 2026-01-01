"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { JobType, JobCategory } from "@/lib/types";
import { createJob } from "@/lib/appClient";
import { 
  Briefcase, 
  Building, 
  MapPin, 
  FileText, 
  DollarSign,
  Clock,
  Tag,
  Sparkles,
  ArrowRight
} from "lucide-react";

const jobTypes = [
  { value: JobType.FULL_TIME, label: "Full Time", icon: "🕒" },
  { value: JobType.PART_TIME, label: "Part Time", icon: "⏱️" },
  { value: JobType.CONTRACT, label: "Contract", icon: "📝" },
  { value: JobType.INTERNSHIP, label: "Internship", icon: "🎓" },
  { value: JobType.REMOTE, label: "Remote", icon: "🌍" },
  { value: JobType.HYBRID, label: "Hybrid", icon: "🏢" },
];

const categories = [
  { value: JobCategory.TECHNOLOGY, label: "Technology", color: "bg-blue-500" },
  { value: JobCategory.HEALTHCARE, label: "Healthcare", color: "bg-emerald-500" },
  { value: JobCategory.FINANCE, label: "Finance", color: "bg-amber-500" },
  { value: JobCategory.EDUCATION, label: "Education", color: "bg-violet-500" },
  { value: JobCategory.MARKETING, label: "Marketing", color: "bg-rose-500" },
  { value: JobCategory.SALES, label: "Sales", color: "bg-sky-500" },
  { value: JobCategory.OTHER, label: "Other", color: "bg-gray-500" },
];

interface PostJobFormProps {
  dashboardMode?: boolean;
  onSubmit?: (data: JobFormData) => void;
}

interface JobFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  jobType: JobType;
  category: JobCategory;
}

export default function PostJobForm({ dashboardMode, onSubmit }: PostJobFormProps) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    jobType: JobType.FULL_TIME,
    category: JobCategory.TECHNOLOGY,
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof JobFormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJob({
        ...formData,
        applicationMethod: { url: "" }, // You may want to add a field for this in the form
      });
      if (onSubmit) {
        onSubmit(formData);
      }
      alert("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
        jobType: JobType.FULL_TIME,
        category: JobCategory.TECHNOLOGY,
      });
    } catch (error) {
      alert("Error posting job. Please try again.");
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full mx-auto mt-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="relative">
        {/* Background accent elements */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        
        <Card className="relative bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm border-2 border-blue-100/50 shadow-2xl shadow-blue-200/20 overflow-hidden group hover:shadow-blue-300/30 transition-shadow duration-500">
          {/* Animated header border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-500 animate-pulse" />
          
          <CardHeader className="pb-6 relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  {dashboardMode ? 'Post New Opportunity' : 'Share Your Opportunity'}
                </h2>
                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Connect with exceptional talent
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Job Title
                  </label>
                  <Input 
                    placeholder="e.g., Senior Frontend Developer" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3"
                  />
                </div>
                
                {/* Company */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company
                  </label>
                  <Input 
                    placeholder="Your company name" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Input 
                    placeholder="City, State or Remote" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3"
                  />
                </div>
                
                {/* Salary */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Salary Range
                  </label>
                  <Input 
                    placeholder="$70,000 - $90,000" 
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
              
              {/* Job Description */}
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Job Description
                </label>
                <Textarea 
                  placeholder="Describe the role, responsibilities, and requirements..." 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required 
                  rows={5}
                  className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 resize-none min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Type */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Employment Type
                  </label>
                  <Select 
                    value={formData.jobType}
                    onValueChange={handleSelectChange("jobType")}
                    required
                  >
                    <SelectTrigger className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 h-auto">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-blue-100 rounded-xl shadow-lg">
                      {jobTypes.map((type) => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{type.icon}</span>
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Category */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-blue-800/80 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category
                  </label>
                  <Select 
                    value={formData.category}
                    onValueChange={handleSelectChange("category")}
                    required
                  >
                    <SelectTrigger className="border-2 border-blue-100 bg-white text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 group-hover:border-blue-300 rounded-xl px-4 py-3 h-auto">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-blue-100 rounded-xl shadow-lg">
                      {categories.map((cat) => (
                        <SelectItem 
                          key={cat.value} 
                          value={cat.value}
                          className="py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 ${cat.color} rounded-full`} />
                            <span>{cat.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className={`
                    w-full py-6 rounded-xl text-base font-semibold
                    bg-gradient-to-r from-blue-600 to-blue-700 
                    hover:from-blue-700 hover:to-blue-800
                    active:scale-[0.98] transition-all duration-300
                    shadow-lg shadow-blue-500/25 hover:shadow-blue-600/30
                    border-2 border-blue-500/20
                    relative overflow-hidden group
                    ${loading ? 'opacity-90' : ''}
                  `}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    {loading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        <span>Creating Opportunity...</span>
                      </>
                    ) : (
                      <>
                        <span>Post Job Opportunity</span>
                        <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                      </>
                    )}
                  </div>
                  
                  {/* Button shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Success animation background */}
                  {loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-700/90 animate-pulse" />
                  )}
                </Button>
                
                {/* Form submission hint */}
                <p className="text-center text-sm text-muted-foreground mt-3">
                  Your posting will be live immediately. No hidden fees.
                </p>
              </div>
            </form>
          </CardContent>
          
          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        </Card>
        
        {/* Floating decoration */}
        <div className="absolute -z-10 top-1/2 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300" />
        <div className="absolute -z-10 bottom-8 left-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700" />
      </div>
    </div>
  );
}