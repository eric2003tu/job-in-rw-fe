
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/types";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: Job;
  dashboardMode?: boolean;
  showApplicationCount?: boolean;
}
export default function JobCard({ job, dashboardMode, showApplicationCount }: JobCardProps) {
  const router = useRouter();
  return (
    <Card className="w-full mx-auto mb-6 shadow-lg border border-border bg-card/80 hover:shadow-2xl transition-shadow duration-200 blue">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary mb-1 flex items-center gap-2">
            {job.title}
            <span className="ml-2 px-2 py-0.5 rounded bg-primary/10 text-xs font-semibold text-primary uppercase tracking-wide">
              {job.jobType ? job.jobType.replace("_", " ") : "Unknown"}
            </span>
            {showApplicationCount && job.applications && (
              <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-xs font-semibold text-blue-700">
                {job.applications.length} Application{job.applications.length !== 1 ? 's' : ''}
              </span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2 items-center text-muted-foreground text-sm mb-2">
            <span className="font-medium">{job.company}</span>
            <span className="mx-1">·</span>
            <span>{job.location}</span>
            <span className="mx-1">·</span>
            <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium">
              {job.category ? job.category.charAt(0) + job.category.slice(1).toLowerCase() : "Other"}
            </span>
          </div>
          <p className="text-base text-foreground/90 mb-3 line-clamp-2">{job.description}</p>
          <div className="flex gap-4 items-center text-sm">
            <span className="font-semibold text-green-600 dark:text-green-400">{job.salary}</span>
            <span className="text-xs text-muted-foreground">Posted: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Recently"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[120px]">
          {dashboardMode ? (
            <>
              <Button className="w-full" size="sm" variant="blue">Edit</Button>
              <Button className="w-full" size="sm" variant="destructive">Delete</Button>
            </>
          ) : (
            <>
              <Button
                className="w-full"
                size="sm"
                variant="green"
                onClick={() => router.push(`/jobs/${job.id}/apply`)}
              >
                Apply Now
              </Button>
                <Button
                  className="w-full"
                  size="sm"
                  variant="blue"
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  View Details
                </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
