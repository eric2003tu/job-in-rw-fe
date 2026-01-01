import { User } from "./types";
export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
}
export async function getMyJobs(): Promise<Job[]> {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/jobs/my`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch your jobs");
  }
  return response.json();
}
import { Application } from "./types";
export async function getMyApplications(): Promise<Application[]> {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/applications/my`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch your applications");
  }
  return response.json();
}
export async function applyForJob(applicationData: {
  userId: string;
  jobId: string;
  coverLetter: string;
  resumeUrl: string;
  status: string;
}) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    throw new Error("Failed to submit application");
  }
  return response.json();
}
export async function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt" | "postedById" | "applications" | "applicationsCount" | "_count">) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error("Failed to create job");
  }
  return response.json();
}
// lib/appClient.ts
// Handles API calls for the application
import { Job } from "./types";

const API_BASE_URL = "http://localhost:3000";

export async function getAllJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function getJobById(id: string): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }
  return response.json();
}
