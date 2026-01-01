


import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "@/lib/types";

export default function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-full mx-auto mb-4 blue">
      <CardHeader>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>
      <CardContent>
        <p>Jobs posted: {user.jobs ? user.jobs.length : 0}</p>
        <p>Applications: {user.applications ? user.applications.length : 0}</p>
      </CardContent>
    </Card>
  );
}
