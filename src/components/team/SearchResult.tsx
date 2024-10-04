import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "../../types"
import { addMemberById } from "../../services/teamApi"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type SearchResultProp = {
    user: TeamMember,
    reset:()=>void
}

export default function SearchResult({user, reset}:SearchResultProp) {

    const param = useParams()
    const projectId = param.projectId!
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:addMemberById,
        onError:(err)=>{
            toast.error(err.message)
            reset()
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({
                queryKey:['projectTeam', projectId]
            })
        }
    })

    const handleAddUserToProject = ()=>{
        const data = {
            id:user._id,
            projectId:projectId
        }
        mutate(data)
    }

  return (
    <>
        <p className="mt-10 text-center font-bold">Resultado:</p>
        <div className=" flex flex-col justify-between items-center sm:flex-row space-y-2">
            <div>
                <p><span className=" font-bold">Name:</span> {user.name}</p>
                <p><span className=" font-bold">E-mail:</span> {user.email}</p>
            </div>
            
            <button
                className=" text-purple-600 hover:bg-purple-100 border-purple-100 border-4 transition-all px-10 py-3 cursor-pointer font-bold"
                onClick={handleAddUserToProject}
            >
                Agregar al proyecto
            </button>
        </div>
    </>
  )
}
