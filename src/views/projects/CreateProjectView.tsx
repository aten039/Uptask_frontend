import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../services/projectApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function CreateProjectView() {

  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    projectName:"",
    clientName:"",
    description:""
 }
  const {register, handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues});

  const {mutate} = useMutation({
    mutationFn: createProject,
    onError: (error)=>{
      toast.error(error.message);
      navigate('/');
    },
    onSuccess: (data)=>{
      toast.success(data);
      navigate('/');
    }
  });

  const handleForm: SubmitHandler<ProjectFormData>=(formData)=> mutate(formData)

  return (
    <>
      <h1 className=" text-5xl font-black">Crear Proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>
    
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
        <input type="submit" value="Crear Proyecto"
        className=" bg-fuchsia-600 w-full p-3 text-white uppercase hover:bg-fuchsia-700 font-bold cursor-pointer transition-colors"  
      />
      </form>
      </div>
      
    </>
   
  )
}
