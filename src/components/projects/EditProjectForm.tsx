import { SubmitHandler, useForm } from "react-hook-form"
import ProjectForm from "./ProjectForm"
import { Project, ProjectFormData } from "../../types"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "../../services/projectApi"
import { toast } from "react-toastify"

type Props = {
    project: Project
}

export default function EditProjectForm({project}: Props) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const {register, handleSubmit, formState:{errors}} = useForm<ProjectFormData>({defaultValues:{
        projectName:project.projectName,
        clientName:project.clientName,
        description:project.description
    }})

    const queryClient = useQueryClient()
    const {mutate}= useMutation({
        mutationFn: updateProject,
        onError: (error)=>{
            toast.error(error.message)
            navigate('/')
        },
        onSuccess: (data)=>{
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:['getProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm: SubmitHandler<ProjectFormData
    > = (formData: ProjectFormData)=>{
        const project = {
            ...formData,
            _id: projectId
        }
        mutate(project)
    }

    return (
        <>
          <h1 className=" text-5xl font-black">Editar Proyecto</h1>
          <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>
        
          <nav className=" my-5">
            <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors " to={'/'}>Volver a Proyectos</Link>
          </nav>
          <div className=" max-w-3xl mx-auto">
          <form 
            className="mt-10 bg-white shadow-lg p-10 rounded-lg" 
            onSubmit={handleSubmit(handleForm)}
            noValidate
          >
    
            <ProjectForm
              register={register}
              errors={errors}
            />
            <input type="submit" value="Guardar Cambios"
            className=" bg-fuchsia-600 w-full p-3 text-white uppercase hover:bg-fuchsia-700 font-bold cursor-pointer transition-colors"  
          />
          </form>
          </div>
          
        </>
       
      )
}
