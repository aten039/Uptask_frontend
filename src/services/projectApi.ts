import { dashboardProjectSchema, Project, ProjectFormData,  } from "../types";
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

export async function getProjectById(id:Project['_id']) {
    try {
        const {data} = await api.get(`/projects/${id}`);
        // console.log(data)
        // const result = projectSchema.safeParse(data)
        // console.log(result)
        // if(!result.success){
        //     throw new Error('ha ocurrido un error');
        // }
        return data
    } catch (error) {

        throw new Error('ha ocurrido un error');
    }
}

export async function updateProject(project:Project) {
    try {
        const {data} = await api.put<string>(`/projects/${project._id}`,{
            projectName:project.projectName,
            clientName:project.clientName,
            description:project.description
         });
         if(!data){
            throw new Error('ha ocurrido un error');
         }
         return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}
export async function deleteProject(id:Project['_id']) {
    try {
        const {data} = await api.delete<string>(`/projects/${id}`);
         if(!data){
            throw new Error('ha ocurrido un error');
         }
         return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}