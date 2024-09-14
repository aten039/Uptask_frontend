import { Navigate, useParams } from "react-router-dom"
import { Project } from "../../types"
import { getProjectById } from "../../services/projectApi"
import { useQuery } from "@tanstack/react-query"
import EditProjectForm from "../../components/projects/EditProjectForm"



export default function EditProject() {
    const param = useParams()
    const projectId: Project['_id'] = param.projectId!

    const {data, isLoading, isError} = useQuery({
        queryKey: ['getProject', projectId] ,
        queryFn : ()=> getProjectById(projectId)
    })

  if(isLoading) return 'Cargando...' 
  if(isError) return <Navigate to={'/404'} />
  if(data) return (
    <>
        <EditProjectForm
            project={data}
        />
    </>
  )
}
