export interface Consultant {
  id: string;
  user_id: string;
  display_name: string;
  title: string;
  specialty: string;
  sub_specialty?: string | null;
  hospital?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  npi_number?: string | null;
  fee: number;
  experience_years: number;
  languages: string[];
  credentials: string[];
  status: string;
  accepts_telemetry: boolean;
  rating_avg: number;
  review_count: number;
  is_available_now?: boolean;
  next_available_slot?: string | null;
}

export interface ConsultationSession {
  id: string;
  patient_id: string;
  consultant_id: string;
  consultant_name?: string | null;
  consultant_title?: string | null;
  specialty?: string | null;
  consultant_avatar?: string | null;
  scheduled_at: string;
  duration_minutes: number;
  status: string;
  session_type: string;
  chief_complaint?: string | null;
  symptoms: string[];
  fee: number;
  payment_status: string;
  payment_reference?: string | null;
  payout_status: string;
  dispute_status?: string | null;
  dispute_notes?: string | null;
}

export interface DeviceOut {
  id: string;
  name: string;
  hardware_id: string;
  firmware_version?: string | null;
  is_active: boolean;
  last_sync_at?: string | null;
}

export function mapConsultantStatus(
  status: string
): 'active' | 'pending_review' | 'suspended' {
  if (status === 'approved') return 'active';
  if (status === 'suspended') return 'suspended';
  return 'pending_review';
}
