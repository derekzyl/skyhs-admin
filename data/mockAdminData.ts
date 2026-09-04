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
    name: 'Dr. Chidi Okafor, MD, FACC',
    npi: '1892049102',
    specialty: 'Cardiology',
    subSpecialty: 'Electrophysiology',
    licenseState: 'CA',
    licenseNumber: 'A149021',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.96,
    totalEncounters: 420,
    consultationFee: 140,
    payoutRouting: 'Chase ••••4819',
    appliedDate: '2025-11-12',
    avatarUrl: '/images/avatars/dr_chidi_okafor.jpg',
    hospital: 'St. Jude Heart & Vascular Institute',
  },
  {
    id: 'doc-2',
    name: 'Dr. Aminat Adeyemi, MD, FWACP',
    npi: '1903829104',
    specialty: 'Endocrinology',
    subSpecialty: 'Metabolic Syndrome & CGM',
    licenseState: 'MD',
    licenseNumber: 'D940128',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.95,
    totalEncounters: 310,
    consultationFee: 130,
    payoutRouting: 'Bank of America ••••2910',
    appliedDate: '2026-01-15',
    avatarUrl: '/images/avatars/dr_aminat_adeyemi.jpg',
    hospital: 'Johns Hopkins Medicine Center',
  },
  {
    id: 'doc-3',
    name: 'Dr. Damilola Adebayo, MBBS, MPH',
    npi: '1783940182',
    specialty: 'General Health',
    subSpecialty: 'Hypertension & Preventative',
    licenseState: 'NY / Lagos',
    licenseNumber: 'MD839201',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.91,
    totalEncounters: 445,
    consultationFee: 95,
    payoutRouting: 'FirstBank / Citibank ••••7401',
    appliedDate: '2025-08-20',
    avatarUrl: '/images/avatars/dr_damilola_ade.jpg',
    hospital: 'Lagos University Teaching Hospital (LUTH)',
  },
  {
    id: 'doc-4',
    name: 'Dr. Folake Bello, MD, PhD',
    npi: '1492049183',
    specialty: 'Neurology',
    subSpecialty: 'Sleep & Autonomic Dysregulation',
    licenseState: 'OH',
    licenseNumber: 'N482019',
    malpracticeVerified: true,
    status: 'active',
    rating: 4.96,
    totalEncounters: 230,
    consultationFee: 160,
    payoutRouting: 'PNC Bank ••••3319',
    appliedDate: '2026-02-04',
    avatarUrl: '/images/avatars/dr_folake_bello.jpg',
    hospital: 'Cleveland Clinic Neurological Institute',
  },
  {
    id: 'doc-5',
    name: 'Dr. Kofi Mensah, MD, FCCP',
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
    avatarUrl: '/images/avatars/dr_damilola_ade.jpg',
    hospital: 'Houston Methodist Pulmonary Care',
  },
  {
    id: 'doc-6',
    name: 'Dr. Ngozi Eze, MD',
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
    avatarUrl: '/images/avatars/dr_aminat_adeyemi.jpg',
    hospital: 'Northwestern Memorial Hospital',
  },
];

export const MOCK_ACTIVE_CALLS: AdminActiveCall[] = [
  {
    id: 'call-01',
    patientName: 'Zainab Balogun',
    doctorName: 'Dr. Chidi Okafor, MD',
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
    patientName: 'Kelechi Adeleke',
    doctorName: 'Dr. Damilola Adebayo, MBBS',
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
    patientName: 'Amara Okonkwo',
    doctorName: 'Dr. Aminat Adeyemi, MD',
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
    clinicianName: 'Dr. Chidi Okafor, MD',
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
    clinicianName: 'Dr. Damilola Adebayo, MBBS',
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
    clinicianName: 'Dr. Aminat Adeyemi, MD, FWACP',
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
    patientName: 'Kelechi Adeleke',
    clinicianName: 'Dr. Damilola Adebayo',
    encounterId: 'sess-84920',
    reason: 'Audio dropped for 4 minutes during vital sign interpretation.',
    date: 'Oct 22, 2026',
    status: 'under_review',
    webrtcLogHealth: 'packet_loss_detected',
    amount: 95.00,
  },
  {
    id: 'DSP-402',
    patientName: 'Zainab Balogun',
    clinicianName: 'Dr. Chidi Okafor',
    encounterId: 'sess-83910',
    reason: 'Prescription delay at local pharmacy due to DEA suffix typo.',
    date: 'Oct 21, 2026',
    status: 'resolved',
    webrtcLogHealth: 'normal',
    amount: 135.00,
  },
];
