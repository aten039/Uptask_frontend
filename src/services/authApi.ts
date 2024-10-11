import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, PasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";
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
        localStorage.setItem('auth_token', data)
        return data
    } catch (error) {
        
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
        
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
      
}

export async function getUser() {
    try {
        const {data} = await api.get('/auth/user')
        const result= userSchema.safeParse(data)
        if(result.success){
            return data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function checkPassword(formData:PasswordForm) {
    try {
        const {data} = await api.post('/auth/check-password', formData)
    
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data?.errors?.msg ?? 'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}
