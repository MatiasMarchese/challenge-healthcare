import type { Patient } from "./parients.interface";

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