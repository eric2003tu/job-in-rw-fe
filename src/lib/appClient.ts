// Update status of an application made on a job posted by the logged-in user
import { ApplicationStatus } from "./types";

/**
 * Update the status of an application for a job posted by the logged-in user
 * @param applicationId - The ID of the application to update
 * @param status - The new status (e.g., "REVIEWED", "INTERVIEW", etc.)
 * @param tokenFromParam - Optional access token
 */
export async function updateApplicationStatusForMyJob(
  applicationId: string,
  status: ApplicationStatus,
  tokenFromParam?: string
): Promise<Application> {
  const token = getToken(tokenFromParam);
  if (!token) throw new Error("No access token found");

  const response = await fetch(`${API_BASE_URL}/jobs/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to update this application status");
    }
    if (response.status === 404) {
      throw new Error("Application not found");
    }
    throw new Error(`Failed to update application status: ${response.statusText}`);
  }
  return response.json();
}
import { Application, Job, User } from "./types";

const API_BASE_URL = "https://job-in-rw.onrender.com";

// Utility function for consistent token handling
function getToken(tokenFromParam?: string): string {
  if (tokenFromParam) return tokenFromParam;
  
  // Consistent token key name
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
  return "";
}

// Fetch a single application by id for the current user (applicant)
// Fetch a single application by id for the current user (applicant)
export async function getMyApplicationById(id: string, tokenFromParam?: string): Promise<Application> {
  const token = getToken(tokenFromParam);
  if (!token) throw new Error("No access token found");
  
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to view this application");
    }
    if (response.status === 404) {
      throw new Error("Application not found");
    }
    throw new Error(`Failed to fetch application details: ${response.statusText}`);
  }
  return response.json();
}

// Fetch a single application by id for job owner
export async function getApplicationForMyJob(id: string, tokenFromParam?: string): Promise<Application> {
  const token = getToken(tokenFromParam);
  if (!token) throw new Error("No access token found");
  
  const response = await fetch(`${API_BASE_URL}/jobs/my/applications/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("You don't have permission to view this application (not job owner)");
    }
    if (response.status === 404) {
      throw new Error("Application not found");
    }
    throw new Error(`Failed to fetch application details: ${response.statusText}`);
  }
  return response.json();
}

// Fetch current user profile
export async function getCurrentUser(tokenFromParam?: string): Promise<User> {
  const token = getToken(tokenFromParam);
  
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }
  return response.json();
}

// Fetch jobs posted by current user
export async function getMyJobs(tokenFromParam?: string): Promise<Job[]> {
  const token = getToken(tokenFromParam);
  
  const response = await fetch(`${API_BASE_URL}/jobs/my`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch your jobs: ${response.statusText}`);
  }
  return response.json();
}

// Fetch applications submitted by current user
export async function getMyApplications(tokenFromParam?: string): Promise<Application[]> {
  const token = getToken(tokenFromParam);
  
  const response = await fetch(`${API_BASE_URL}/applications/my`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch your applications: ${response.statusText}`);
  }
  return response.json();
}

// Fetch applications for jobs posted by current user
export async function getMyJobsApplications(tokenFromParam?: string): Promise<Application[]> {
  const token = getToken(tokenFromParam);
  if (!token) throw new Error("No access token found");
  
  const response = await fetch(`${API_BASE_URL}/jobs/my/applications`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch applications for your jobs: ${response.statusText}`);
  }
  return response.json();
}

// Submit application for a job
export async function applyForJob(applicationData: {
  userId: string;
  jobId: string;
  coverLetter: string;
  resumeUrl: string;
  status: string;
}, tokenFromParam?: string): Promise<Application> {
  const token = getToken(tokenFromParam);
  
  const response = await fetch(`${API_BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(applicationData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to submit application: ${response.statusText}`);
  }
  return response.json();
}

// Create a new job
export async function createJob(
  jobData: Omit<Job, "id" | "createdAt" | "updatedAt" | "postedById" | "applications" | "applicationsCount" | "_count">,
  tokenFromParam?: string
): Promise<Job> {
  const token = getToken(tokenFromParam);
  
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(jobData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create job: ${response.statusText}`);
  }
  return response.json();
}

// Fetch all public jobs
export async function getAllJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }
  return response.json();
}

// Fetch job by ID
export async function getJobById(id: string): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch job details: ${response.statusText}`);
  }
  return response.json();
}

// Update application status
export async function updateApplicationStatus(
  id: string, 
  status: Application["status"], 
  tokenFromParam?: string
): Promise<Application> {
  const token = getToken(tokenFromParam);
  if (!token) throw new Error("No access token found");
  
  const response = await fetch(`${API_BASE_URL}/jobs/applications/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update application status: ${response.statusText}`);
  }
  return response.json();
}

// Delete application
export async function deleteApplication(id: string, tokenFromParam?: string): Promise<void> {
  const token = getToken(tokenFromParam);
  if (!token) throw new Error("No access token found");
  
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete application: ${response.statusText}`);
  }
}