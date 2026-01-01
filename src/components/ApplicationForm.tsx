import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ApplicationForm({ jobId }: { jobId: string }) {
  return (
    <Card className="w-full mx-auto mt-8 p-6 shadow-xl">
      <CardHeader>
        <h2 className="text-2xl font-bold mb-2">Apply for this Job</h2>
        <p className="text-muted-foreground">Submit your application below.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Textarea placeholder="Cover Letter" required rows={4} />
          <Input type="url" placeholder="Resume URL (Google Drive, etc.)" required />
          <Button type="submit" className="w-full">Submit Application</Button>
        </form>
      </CardContent>
    </Card>
  );
}
