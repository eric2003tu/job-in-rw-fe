import { Application } from "@/lib/types";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

export default function ApplicationStatusCard({ application }: { application: Application }) {
  let badgeVariant: "default" | "destructive" | "outline" | "secondary" | undefined = "secondary";
  if (application.status === "ACCEPTED") badgeVariant = "default";
  if (application.status === "REJECTED") badgeVariant = "destructive";

  return (
    <Card className="w-full mx-auto mb-4 blue">
      <CardHeader>
        <h3 className="text-lg font-semibold">{application.job?.title ?? "Job"}</h3>
        <Badge variant={badgeVariant}>
          {application.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>{application.coverLetter}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="green">View Details</Button>
      </CardFooter>
    </Card>
  );
}
