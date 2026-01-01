import SignUp from "@/components/SignUp";
import dynamic from "next/dynamic";

export default function SignUpPage() {
  return (
    <div className="py-3 flex flex-col items-center">
      <SignUp />
    </div>
  ); 
}
