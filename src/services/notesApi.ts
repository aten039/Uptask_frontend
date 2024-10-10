import api from "../lib/axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteApiType = {
    formData: NoteFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    noteId: Note['_id']
}

export async function createNote({formData, projectId, taskId}: Pick<NoteApiType, 'formData'|'projectId'|'taskId'>) {
    try {
       const url = `/projects/${projectId}/task/${taskId}/notes`

       const {data} = await api.post<string>(url, formData)

       return data

    } catch (error) {

        throw new Error('ha ocurrido un error');
    }
}

export async function deleteNote({noteId, projectId, taskId}: Pick<NoteApiType, 'noteId'|'projectId'|'taskId'> ) {
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes/${noteId}`
 
        const {data} = await api.delete<string>(url)
 
        return data
 
     } catch (error) {
 
         throw new Error('ha ocurrido un error');
     }
  
}