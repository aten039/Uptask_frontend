import { useForm } from "react-hook-form"
import { NoteFormData } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../services/notesApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const params = useParams()
    const location = useLocation()
    const queryClient = useQueryClient()

    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const projectId = params.projectId!
    const initialValue:NoteFormData = {
        content : ''
    }
    const {register, handleSubmit,reset ,formState:{errors} } = useForm({defaultValues: initialValue})

    const {mutate }= useMutation({
        mutationFn: createNote,
        onError:(err)=>{
            toast.error(err.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey:['taskDetails', taskId]})
        }
    })

   const handleAddNote = (formData: NoteFormData)=>{
        mutate({formData, projectId, taskId})
   }

    return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className='space-y-3'
        noValidate
    >
        <div className='flex flex-col gap-2'>
            <label className='font-bold' htmlFor='content'>Crear Nota</label>
            <input
                id='content'
                type='text'
                placeholder='Contenido de la nota'
                className='w-full p-3 border border-gray-300'
                {...register('content', {
                    required:'El contenido de la nota es obligatorio'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>

        <input
            type='submit'
            value='crear nota'
            className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-bold cursor-pointer uppercase'
        />
    </form>
  )
}
