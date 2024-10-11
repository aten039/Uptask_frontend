import { isAxiosError } from "axios";
import { UpdateCurrentUserPAsswordForm, UserProfileForm } from "../types"
import api from "../lib/axios";

type ProfileApiTypes = {
    userProfile: UserProfileForm,
    changePasswordForm: UpdateCurrentUserPAsswordForm
}

export async function updateProfile({userProfile}: Pick<ProfileApiTypes, 'userProfile'>) {
    try {
        
        const url = `/auth/profile`
        const {data} = await api.put<string>(url, userProfile)
        
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg??'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}
export async function changePassword({changePasswordForm: formData}: Pick<ProfileApiTypes, 'changePasswordForm'>) {
    try {
        
        const url = `/auth/update-password`
        const {data} = await api.post<string>(url, formData)
        
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg??'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}