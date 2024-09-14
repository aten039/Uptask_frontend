
import { dashboardProjectSchema, ProjectFormData } from "../types";
import api from "../lib/axios";
import { isAxiosError } from "axios";


export async function createProject(dataForm: ProjectFormData) {
    try {
        const {data}  = await api.post('/projects', dataForm)
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function getProjects() {
    try {
        
        const {data} = await api.get('/projects');
        
        const response = dashboardProjectSchema.safeParse(data)
       
        if(response.success){
            return response.data
        }
        throw new Error('ha ocurrido un error');
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}