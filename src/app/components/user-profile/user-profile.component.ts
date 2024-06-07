import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userProfile: any = {
    username: '',
    email: '',
    role: '',
    education: [],
    workExperience: [],
    skills: [''],
  };
  editMode: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  loadUserProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.userProfileService.getUserProfile(currentUser.id).subscribe(
        (response) => {
          this.userProfile = {
            ...response,
            education: response.education || [],
            workExperience: response.workExperience || [],
            skills: response.skills || [],
          };
        },
        (error) => {}
      );
    }
  }

  getProfilePictureUrl(filename: string): string {
    return `http://localhost:4000/uploads/${filename}`;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const updatedProfile = {
        ...this.userProfile,
        education: Array.isArray(this.userProfile.education)
          ? this.userProfile.education
          : this.userProfile.education
              .split(',')
              .map((edu: string) => edu.trim()),
        workExperience: Array.isArray(this.userProfile.workExperience)
          ? this.userProfile.workExperience
          : this.userProfile.workExperience
              .split(',')
              .map((work: string) => work.trim()),
        skills: Array.isArray(this.userProfile.skills)
          ? this.userProfile.skills
          : this.userProfile.skills
              .split(',')
              .map((skill: string) => skill.trim()),
      };

      this.userProfileService
        .updateUserProfile(currentUser.id, updatedProfile)
        .subscribe(
          (response) => {
            this.userProfile = response;
            if (this.selectedFile) {
              const formData = new FormData();
              formData.append(
                'profilePicture',
                this.selectedFile,
                this.selectedFile.name
              );
              this.userProfileService
                .uploadProfilePicture(currentUser.id, formData)
                .subscribe(
                  (response) => {
                    this.userProfile.profilePicture = response.profilePicture;
                  },
                  (error) => {}
                );
            }
            this.editMode = false;
          },
          (error) => {}
        );
    }
  }

  addSkill() {
    this.userProfile.skills.push('');
  }

  removeSkill(index: number) {
    this.userProfile.skills.splice(index, 1);
  }

  addWorkExperience() {
    this.userProfile.workExperience.push({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  }

  removeWorkExperience(index: number) {
    this.userProfile.workExperience.splice(index, 1);
  }
  addEducation() {
    this.userProfile.education.push({ degree: '', university: '', year: '' });
  }

  removeEducation(index: number) {
    this.userProfile.education.splice(index, 1);
  }
}
