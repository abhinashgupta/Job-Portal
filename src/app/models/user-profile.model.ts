export interface Skill {
  id: string;
  name: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email : string
}

export interface UserProfile {
  id: string;
  userId: string;
  personalInformation: PersonalInformation;
  education: any[]; 
  workExperience: WorkExperience[];
  skills: Skill[];
}
