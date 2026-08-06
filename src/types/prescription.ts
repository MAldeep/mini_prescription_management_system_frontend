export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
};

export type Prescription = {
  id: string;
  patientName: string;
  patientAge: number;
  createdAt: string;
  medicines: Medicine[];
};

export type Doctor = {
  id: string;
  doctorName: string;
  speciality: string;
};
export type DoctorStore = {
  user: Doctor | null;
  accessToken: string | null;
  // actions
  setAuth: (user: Doctor, accessToken: string) => void;
  clearAuth: () => void;
};
