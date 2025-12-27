import type { Patient } from "@/models/patients.interface";
import { normalizeUrls } from "@/utils/normalizeUrls";

export const patientAdapter = (apiResponse: any): Patient => {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    avatar: normalizeUrls(apiResponse.avatar),
    website: normalizeUrls(apiResponse.website),
    description: apiResponse.description,
    createdAt: new Date(apiResponse.createdAt).toLocaleDateString(),
  };
};
