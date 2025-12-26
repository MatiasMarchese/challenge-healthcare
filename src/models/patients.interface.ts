export interface Patient {
  id: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
  createdAt: string;
}

export interface PatientsState {
  data: Patient[];
  loading: boolean;
  error: string | null;
}

