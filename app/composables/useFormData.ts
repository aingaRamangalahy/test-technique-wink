import type {
    ProfileFormData,
    UserSettingsFormData,
    WorkspaceFormData
} from "~/types/form"


export const useFormData = () => {
    const formData = ref<UserSettingsFormData>({
      profile: {
        profileImage: null,
        firstName: '',
        lastName: '',
        email: ''
      },
      workspace: {
        logo: null,
        name: '',
        description: '',
        websiteURL: '',
        address: '',
        sector: ''
      }
    })

    const updateProfile = (data: Partial<ProfileFormData>) => {
      Object.assign(formData.value.profile, data)
    }

    const updateWorkspace = (data: Partial<WorkspaceFormData>) => {
      Object.assign(formData.value.workspace, data)
    }

    const validateProfile = () => {
      // const { firstName, lastName, email } = formData.value.profile
      // return !!(firstName && lastName && email)
      return true
    }

    const validateWorkspace = () => {
      const { name } = formData.value.workspace
      return !!name
    }

    const resetForm = () => {
      formData.value = {
        profile: {
          profileImage: null,
          firstName: '',
          lastName: '',
          email: ''
        },
        workspace: {
          logo: null,
          name: '',
          description: '',
          websiteURL: '',
          address: '',
          sector: ''
        }
      }
    }

    return {
      formData,
      updateProfile,
      updateWorkspace,
      validateProfile,
      validateWorkspace,
      resetForm
    }
  }