import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { patientAdapter } from "@/adapter/patient-adapter";
import type {
  Patient,
  PatientsState,
} from "@/models/patients.interface";

const LOCAL_STORAGE_KEY = "patients_data";

const API = import.meta.env.VITE_API_URL;

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.map((item: any) => patientAdapter(item)) as Patient[];
    }

    const response = await fetch(API);
    const data = await response.json();

    const adaptedData = Array.isArray(data)
      ? data.map((item: any) => patientAdapter(item))
      : [];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(adaptedData));

    return adaptedData as Patient[];
  }
);

const initialState: PatientsState = {
  data: [],
  loading: false,
  error: null,
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatientLocal: (state, action: PayloadAction<Patient>) => {
      state.data.push(action.payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.data));
    },
    updatePatientLocal: (state, action: PayloadAction<Patient>) => {
      const index = state.data.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.data));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar pacientes";
      });
  },
});

export const { addPatientLocal, updatePatientLocal } = patientsSlice.actions;
export default patientsSlice.reducer;
