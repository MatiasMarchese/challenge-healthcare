import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Patient } from "@/models/patients.interface";

const BASE_URL = import.meta.env.BASE_URL;

export const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => "/users",
      providesTags: ["Patients"],
    }),
  }),
});

export const { useGetPatientsQuery } = patientsApi;
