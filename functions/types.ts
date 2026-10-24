export interface Env {
  DB: D1Database;
  [key: string]: unknown;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: number;
  created_at: string;
}

export interface CourseRecord {
  id: string;
  name: string;
  description: string | null;
  badge: string | null;
  modality: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export type EnrollmentStatus = 'new' | 'contacted' | 'confirmed' | 'rejected' | 'cancelled';

export interface EnrollmentRecord {
  id: string;
  course_id: string;
  course_name?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  comments: string | null;
  status: EnrollmentStatus;
  assigned_to: string | null;
  assigned_name?: string | null;
  privacy_accepted_at: string;
  created_at: string;
  updated_at: string;
}

export type ActionType = 'whatsapp' | 'email' | 'phone_call' | 'status_change' | 'note';

export interface ContactLogRecord {
  id: string;
  enrollment_id: string;
  user_id: string;
  user_name?: string;
  action_type: ActionType;
  notes: string;
  created_at: string;
}
