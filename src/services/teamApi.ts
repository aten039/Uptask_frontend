import { isAxiosError } from "axios";
import { Project, TeamMemberForm, TeamMembersSchema, User } from "../types";
import api from "../lib/axios";

type TeamApi = {
    projectId: Project['_id'],
    formData: TeamMemberForm,
    id: User['_id']
    userId: User['_id']
}

export async function findUserByEmail({projectId , formData}:Pick<TeamApi, 'formData'|'projectId'>) {
    
    try {
        const url = `http://localhost:4000/api/projects/${projectId}/team/find`

        const {data} = await api.post(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function addMemberById({id, projectId}: Pick<TeamApi, 'id'|'projectId'>) {
    try {
        
        const url =`/projects/${projectId}/team`
        const {data} = await api.post<string>(url, {id})

        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg??'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function getProjectTeam(projectId: Project['_id']) {
    try {
        
        const url =`/projects/${projectId}/team/all`
        const {data} = await api.get(url)
        const result = TeamMembersSchema.safeParse(data)

        if(!result.success){
            throw new Error('ha ocurrido un error');
        }
        return result.data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg??'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}


export async function removeUserToProject({userId, projectId}: Pick<TeamApi, 'userId'|'projectId'>) {
    try {
        
        const url =`/projects/${projectId}/team/${userId}`
        const {data} = await api.delete<string>(url)

        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg??'ha ocurrido un error');
        }
        throw new Error('ha ocurrido un error');
    }
}