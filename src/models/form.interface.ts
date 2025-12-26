import type { Patient } from "./patients.interface";

export interface PatientFormData {
  name: string;
  website: string;
  avatar: string;
  description: string;
}

export interface PatientFormProps {
  defaultValues?: Patient | null;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}
