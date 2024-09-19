import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "../../services/taskApi"
import { Navigate, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    const projectId= useParams().projectId!
    const params = window.location.search
    const taskId = new URLSearchParams(params).get('taskId')!
    
    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: async()=> await getTaskById({taskId, projectId}),
        enabled: !!taskId
    })
    if(isError) return <Navigate to={'/404'}/>
    if(data) return <EditTaskModal task={data}/>
}
