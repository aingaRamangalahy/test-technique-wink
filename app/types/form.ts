export interface ProfileFormData {
    profileImage?: File | null
    firstName: string
    lastName: string
    email: string
}

export interface WorkspaceFormData {
    logo?: File | null
    name: string
    description: string
    websiteURL: string
    address: string
    sector: string
}
  
export interface UserSettingsFormData {
    profile: ProfileFormData,
    workspace: WorkspaceFormData
}