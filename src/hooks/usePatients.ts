import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { PatientFormData } from "@/models/form.interface";
import type { Patient } from "@/models/patients.interface";
import {
  addPatientLocal,
  fetchPatients,
  updatePatientLocal,
} from "@/redux/store/slices/patient-slice";
import type { AppDispatch } from "@/redux/store/store";
import { type RootState } from "@/redux/store/store";

export const usePatients = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.patients
  );

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchPatients());
    }
  }, [dispatch, data.length]);

  const addPatient = useCallback(
    (formData: PatientFormData) => {
      const newPatient: Patient = {
        // Se pasa de crypto.UUID() a este nuevo formato debido a que al probarlo en el naveador de la tablet (npm run dev -- --host) no se generaba ese id por no ser https
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        createdAt: new Date().toISOString(),
        ...formData,
      };
      dispatch(addPatientLocal(newPatient));
    },
    [dispatch]
  );

  const updatePatient = useCallback(
    (id: string, formData: PatientFormData) => {
      const existingPatient = data.find((p: Patient) => p.id === id);
      if (!existingPatient) return;

      const updatedPatient: Patient = {
        ...existingPatient,
        ...formData,
      };
      dispatch(updatePatientLocal(updatedPatient));
    },
    [dispatch, data]
  );

  return {
    patients: data,
    isLoading: loading,
    isError: !!error,
    addPatient,
    updatePatient,
  };
};
