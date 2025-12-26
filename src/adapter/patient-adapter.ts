import type { Patient } from "@/models/patients.interface";

export const patientAdapter = (apiResponse: any): Patient => {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    avatar: apiResponse.avatar || "default-image.png",
    website: apiResponse.website,
    description: apiResponse.description,
    createdAt: new Date(apiResponse.createdAt).toLocaleDateString(),
  };
};
