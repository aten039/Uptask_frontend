import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";
import api from "../lib/axios";


export async function createAccount(formData:UserRegistrationForm) {
    try {
        const url = `/auth/create-account`
        const {data} = await api.post<string>(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function confirmAccount(token:ConfirmToken) {
    try {
        const url = `/auth/confirm-account`
        const {data} = await api.post<string>(url, token)

        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }  
}
export async function requestConfirmationCode(email: RequestConfirmationCodeForm) {
    try {
        const url = `/auth/request-code`
        const {data} = await api.post<string>(url, email)

        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }  
}
export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = `/auth/login`
        const {data} = await api.post<string>(url, formData)

        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }  
}
export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = `/auth/forgot-password`
        const {data} = await api.post<string>(url, formData)

        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
      
}
export async function validateToken(formData: ConfirmToken) {
    try {
        const url = `/auth/validate-token`
        const {data} = await api.post<string>(url, formData)

        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
      
}
export async function changfePasswordWithToken({formData, token}:{formData: NewPasswordForm, token:ConfirmToken['token']}) {
    try {
        const url = `/auth/change-password/${token}`
        const {data} = await api.post<string>(url, formData)

        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
      
}
