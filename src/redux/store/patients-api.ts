import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Patient } from "../../models/parients.interface";

export const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://63bedcf7f5cfc0949b634fc8.mockapi.io",
  }),
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => "/users",
      providesTags: ["Patients"],
    }),

  }),
});
export const {
  useGetPatientsQuery,
} = patientsApi;
