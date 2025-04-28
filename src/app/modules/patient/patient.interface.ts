import { Gender } from "@prisma/client";

export interface IPatientUpdate {
    
    name: string;
    
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
  
    patientHealthData?: IPatientHealthData | null;
    medicalReport?: IMedicalReport[];
  }
  
  export interface IPatientHealthData {
   
    dateOfBirth: string;
    gender: Gender
    bloodGroup: "A_POSITIVE" | "B_POSITIVE"; 
    hasAllergies?: boolean;
    hasDiabetes?: boolean;
    height: string | null;
    weight: string | null;
    smokingStatus?: string | null;
    dietaryPreferences?: string | null;
    pregnancyStatus?: boolean;
    mentalHealthHistory?: string | null;
    immunizationStatus?: string | null;
    hasPastSurgeries?:  boolean;
    recentAnxiety?: boolean;
    recentDepression?: boolean;
    maritalStatus?: string | null;

  }
  
  export interface IMedicalReport {
 
    reportName: string;
    reportLink: string;

  }
  