import React from 'react';
import PostJobForm from "@/components/PostJobForm";

export default function PostJobDashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Post a New Job</h1>
      <PostJobForm dashboardMode />
    </div>
  );
}
