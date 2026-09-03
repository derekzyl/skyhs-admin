export interface AdminConsultant {
  id: string;
  name: string;
  npi: string;
  specialty: string;
  subSpecialty: string;
  licenseState: string;
  licenseNumber: string;
  malpracticeVerified: boolean;
  status: 'active' | 'pending_review' | 'suspended';
  rating: number;
  totalEncounters: number;
  consultationFee: number;
  payoutRouting: string;
  appliedDate: string;
  avatarUrl: string;
  hospital: string;
}

export interface AdminActiveCall {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  duration: string;
  heartRate: number;
  spo2: number;
  latencyMs: number;
  status: 'in_progress' | 'connecting' | 'wrapping_up';
  cptCode: string;
}

export interface AdminPayoutRecord {
  id: string;
  clinicianName: string;
  npi: string;
  period: string;
  encountersCount: number;
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  status: 'scheduled' | 'processed' | 'on_hold';
  bankAccount: string;
}

export interface AdminDispute {
  id: string;
  patientName: string;
  clinicianName: string;
  encounterId: string;
  reason: string;
  date: string;
  status: 'under_review' | 'resolved' | 'escalated';
  webrtcLogHealth: 'normal' | 'packet_loss_detected' | 'call_dropped';
  amount: number;
}

export const MOCK_ADMIN_CONSULTANTS: AdminConsultant[] = [
  {
    id: 'doc-1',
    name: 'Dr. Julian Vance, MD',
    npi: '1892049102',
    specialty: 'Cardiology',
    subSpecialty: 'Electrophysiology',
    licenseState: 'CA',
    licenseNumber: 'A149021',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.96,
    totalEncounters: 384,
    consultationFee: 140,
    payoutRouting: 'Chase ••••4819',
    appliedDate: '2025-11-12',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    hospital: 'St. Jude Heart & Vascular Institute',
  },
  {
    id: 'doc-2',
    name: 'Dr. Sarah Lin, MD, PhD',
    npi: '1903829104',
    specialty: 'Endocrinology',
    subSpecialty: 'Metabolic Syndrome & CGM',
    licenseState: 'MD',
    licenseNumber: 'D940128',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.92,
    totalEncounters: 260,
    consultationFee: 130,
    payoutRouting: 'Bank of America ••••2910',
    appliedDate: '2026-01-15',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813637-44f2c002221b?w=400&q=80',
    hospital: 'Johns Hopkins Medicine Center',
  },
  {
    id: 'doc-3',
    name: 'Dr. Anthony Adebayo, MBBS, FWACP',
    npi: '1783940182',
    specialty: 'General Health',
    subSpecialty: 'Hypertension & Preventative',
    licenseState: 'NY / Lagos',
    licenseNumber: 'MD839201',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.88,
    totalEncounters: 412,
    consultationFee: 95,
    payoutRouting: 'FirstBank / Citibank ••••7401',
    appliedDate: '2025-08-20',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    hospital: 'Lagos University Teaching Hospital (LUTH)',
  },
  {
    id: 'doc-4',
    name: 'Dr. Elena Rostova, MD',
    npi: '1492049183',
    specialty: 'Neurology',
    subSpecialty: 'Sleep & Autonomic Dysregulation',
    licenseState: 'OH',
    licenseNumber: 'N482019',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.94,
    totalEncounters: 195,
    consultationFee: 160,
    payoutRouting: 'PNC Bank ••••3319',
    appliedDate: '2026-02-04',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    hospital: 'Cleveland Clinic Neurological Institute',
  },
  {
    id: 'doc-5',
    name: 'Dr. Tariq Mansour, MD',
    npi: '1628394019',
    specialty: 'Pulmonology',
    subSpecialty: 'Asthma & Nocturnal SpO2',
    licenseState: 'TX',
    licenseNumber: 'P294012',
    malpracticeVerified: false,
    status: 'pending_review',
    rating: 0,
    totalEncounters: 0,
    consultationFee: 135,
    payoutRouting: 'Wells Fargo ••••9102',
    appliedDate: '2026-03-01',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    hospital: 'Houston Methodist Pulmonary Care',
  },
  {
    id: 'doc-6',
    name: 'Dr. Claire Beaumont, MD',
    npi: '1592039401',
    specialty: 'Cardiology',
    subSpecialty: 'Heart Failure & Wearable Telemetry',
    licenseState: 'IL',
    licenseNumber: 'C748201',
    malpracticeVerified: false,
    status: 'pending_review',
    rating: 0,
    totalEncounters: 0,
    consultationFee: 150,
    payoutRouting: 'Chase ••••1192',
    appliedDate: '2026-03-02',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
    hospital: 'Northwestern Memorial Hospital',
  },
];

export const MOCK_ACTIVE_CALLS: AdminActiveCall[] = [
  {
    id: 'call-01',
    patientName: 'Eleanor Vance-Kovacs',
    doctorName: 'Dr. Julian Vance, MD',
    specialty: 'Cardiology',
    duration: '06:42',
    heartRate: 104,
    spo2: 98,
    latencyMs: 14,
    status: 'in_progress',
    cptCode: 'CPT 99214 + 99453',
  },
  {
    id: 'call-02',
    patientName: 'Kareem Balogun',
    doctorName: 'Dr. Anthony Adebayo, MBBS',
    specialty: 'General Health',
    duration: '14:20',
    heartRate: 76,
    spo2: 99,
    latencyMs: 22,
    status: 'in_progress',
    cptCode: 'CPT 99213',
  },
  {
    id: 'call-03',
    patientName: 'David K. Adeleke',
    doctorName: 'Dr. Sarah Lin, MD, PhD',
    specialty: 'Endocrinology',
    duration: '01:15',
    heartRate: 82,
    spo2: 97,
    latencyMs: 18,
    status: 'connecting',
    cptCode: 'CPT 99214',
  },
];

export const MOCK_PAYOUTS: AdminPayoutRecord[] = [
  {
    id: 'PAY-2026-102',
    clinicianName: 'Dr. Julian Vance, MD',
    npi: '1892049102',
    period: 'Oct 14 - Oct 20, 2026',
    encountersCount: 24,
    grossAmount: 3360.00,
    platformFee: 504.00,
    netPayout: 2856.00,
    status: 'scheduled',
    bankAccount: 'Chase Checking ••••4819',
  },
  {
    id: 'PAY-2026-103',
    clinicianName: 'Dr. Anthony Adebayo, MBBS',
    npi: '1783940182',
    period: 'Oct 14 - Oct 20, 2026',
    encountersCount: 38,
    grossAmount: 3610.00,
    platformFee: 541.50,
    netPayout: 3068.50,
    status: 'scheduled',
    bankAccount: 'Citibank N.A. ••••7401',
  },
  {
    id: 'PAY-2026-104',
    clinicianName: 'Dr. Sarah Lin, MD, PhD',
    npi: '1903829104',
    period: 'Oct 14 - Oct 20, 2026',
    encountersCount: 20,
    grossAmount: 2600.00,
    platformFee: 390.00,
    netPayout: 2210.00,
    status: 'processed',
    bankAccount: 'Bank of America ••••2910',
  },
];

export const MOCK_DISPUTES: AdminDispute[] = [
  {
    id: 'DSP-401',
    patientName: 'Samantha Cruz',
    clinicianName: 'Dr. Anthony Adebayo',
    encounterId: 'sess-84920',
    reason: 'Audio dropped for 4 minutes during vital sign interpretation.',
    date: 'Oct 22, 2026',
    status: 'under_review',
    webrtcLogHealth: 'packet_loss_detected',
    amount: 95.00,
  },
  {
    id: 'DSP-402',
    patientName: 'Robert Vance',
    clinicianName: 'Dr. Marcus Brody',
    encounterId: 'sess-83910',
    reason: 'Prescription delay at local pharmacy due to DEA suffix typo.',
    date: 'Oct 21, 2026',
    status: 'resolved',
    webrtcLogHealth: 'normal',
    amount: 135.00,
  },
];
