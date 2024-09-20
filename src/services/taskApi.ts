import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";
import api from "../lib/axios";

type TaskApi = {
    taskFormData: TaskFormData,
    projectId: Project['_id'],
    taskId:Task['_id'],
    status: Task['status']
}

export async function createTask({taskFormData , projectId}: Pick<TaskApi, 'taskFormData' | 'projectId'>) {
    try {
        
        const {data} =await api.post<string>(`/projects/${projectId}/task`, taskFormData)
        if(!data){
            throw new Error('no se creo la tarea')
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function getTaskById({projectId , taskId}: Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`

        const {data} = await api.get(url)
        const result = taskSchema.safeParse(data)
        if(!result.success){
            throw new Error('ha ocurrido un error');
        }
        return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function editTask({projectId , taskId, taskFormData}: Pick<TaskApi, 'projectId' | 'taskId' | 'taskFormData'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`

        const {data} = await api.put<string>(url, taskFormData)
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function deleteTask({projectId, taskId}:Pick<TaskApi, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}`

        const {data} = await api.delete<string>(url)
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}

export async function updateStatus({projectId,taskId, status}: Pick<TaskApi, 'projectId'| 'taskId' | 'status'>) {

    const url = `/projects/${projectId}/task/${taskId}/status`

    try {
        const {data} = await api.post<string>(url, {status})
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error)
            throw new Error(error.response?.data.errors.msg);
        }
        throw new Error('ha ocurrido un error');
    }
}