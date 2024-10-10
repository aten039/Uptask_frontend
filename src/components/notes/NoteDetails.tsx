import { useMemo } from "react"
import { useAuth } from "../../hooks/useAuth"
import { Note } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../services/notesApi"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type NoteDetailsProp={
    note: Note
}

export default function NoteDetails({note}:NoteDetailsProp) {

    const params = useParams()
    const projectId = params.projectId!

    const taskId = new URLSearchParams(location.search).get('viewTask')!

    const queryClient = useQueryClient()
    const { data, isLoading } = useAuth()
    const canDelete = useMemo(()=> data?._id === note.createBy._id , [data])

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onError:(err)=>{
            toast.error(err.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({
                queryKey: ['taskDetails', taskId]
            })
        }
    })

    const handleClickDelete = ()=>{
        mutate({noteId:note._id, projectId, taskId})
    }

    if(isLoading) return 'Cargando...'

  return (
    <div className="p-3 flex justify-between  items-center">
        <div>
            <p>
                por: <span className="font-bold">{note.createBy.name}</span>
            </p>
            <p>
                <span className="font-bold"> mensaje: </span>{note.content} 
            </p>
        </div>
        {canDelete && (
            <button className=" bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold transition-colors cursor-pointer "
                onClick={handleClickDelete}
            >Eliminar</button>
        )}
        
    </div>
  )
}
