import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "@/lib/types";
import { 
  Briefcase, 
  FileText, 
  Mail, 
  User as UserIcon,
  Calendar,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

export default function ProfileCard({ user }: { user: User }) {
  const stats = [
    {
      label: "Jobs Posted",
      value: user.jobs?.length || 0,
      icon: <Briefcase className="w-4 h-4" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Applications",
      value: user.applications?.length || 0,
      icon: <FileText className="w-4 h-4" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short'
      }),
      icon: <Calendar className="w-4 h-4" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  // Calculate application status breakdown
  const applicationStats = user.applications?.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const statusIcons = {
    PENDING: <Clock className="w-3 h-3 text-yellow-600" />,
    REVIEWED: <Clock className="w-3 h-3 text-blue-600" />,
    INTERVIEW: <CheckCircle className="w-3 h-3 text-green-600" />,
    ACCEPTED: <CheckCircle className="w-3 h-3 text-green-600" />,
    REJECTED: <XCircle className="w-3 h-3 text-red-600" />,
  };

  return (
    <Card className="w-full overflow-hidden border border-gray-200 shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-2"></div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center border-4 border-white shadow-lg">
              <UserIcon className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.bgColor} rounded-lg p-4 border ${index === 0 ? 'border-blue-100' : index === 1 ? 'border-green-100' : 'border-purple-100'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <div className={`p-2 rounded-full ${stat.bgColor} ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {user.applications && user.applications.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Application Status</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(applicationStats).map(([status, count]) => (
                <div 
                  key={status} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200"
                >
                  {statusIcons[status as keyof typeof statusIcons]}
                  <span className="text-xs font-medium text-gray-700">{status}</span>
                  <span className="text-xs font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}