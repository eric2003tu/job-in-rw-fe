import Login from "@/components/Login";
import dynamic from "next/dynamic";

export default function LoginPage() {
  return (
    <div className="py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <Login />
    </div>
  );
}
