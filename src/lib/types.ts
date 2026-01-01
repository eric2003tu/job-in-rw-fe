export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  applicationMethod: any;
  salary: string;
  jobType: JobType;
  category: JobCategory;
  createdAt: string;
  updatedAt: string;
  postedBy?: User;
  postedById?: string;
  applications?: Application[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  jobs?: Job[];
  applications?: Application[];
  createdAt: string;
  updatedAt: string;
};

export type Application = {
  id: string;
  user: User;
  userId: string;
  job: Job;
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
  status: ApplicationStatus;
};

export enum JobType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
}

export enum JobCategory {
  TECHNOLOGY = "TECHNOLOGY",
  HEALTHCARE = "HEALTHCARE",
  FINANCE = "FINANCE",
  EDUCATION = "EDUCATION",
  MARKETING = "MARKETING",
  SALES = "SALES",
  OTHER = "OTHER",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  REVIEWED = "REVIEWED",
  INTERVIEW = "INTERVIEW",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}
