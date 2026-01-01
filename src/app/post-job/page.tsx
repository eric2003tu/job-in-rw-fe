import dynamic from "next/dynamic";
const PostJobForm = dynamic(() => import("@/components/PostJobForm"), { ssr: false });

export default function PostJobPage() {
  return (
    <div className="py-8">
      <PostJobForm />
    </div>
  );
}
