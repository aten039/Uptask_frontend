import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "../../types";

type Props = {
    register: UseFormRegister<ProjectFormData>,
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors}: Props) {
  return (
    <>
        <div className="mb-5 space-y-3">
            <label htmlFor="projectName" className=" text-sm uppercase font-bold">Nombre del Proyecto</label>
            <input 
                id="projectName" 
                
                className="w-full p-3 border border-purple-400"
                type="text"
                placeholder="Nombre del proyecto"
                {...register("projectName", {required:"El Titulo es Obligatorio"})}
            />
            {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
        </div>
        <div className="mb-5 space-y-3">
            <label htmlFor="clientName" className=" text-sm uppercase font-bold">Nombre Cliente</label>
            <input 
                id="clientName" 
                
                className="w-full p-3 border border-purple-400"
                type="text"
                placeholder="Nombre del Cliente"
                {...register("clientName", {required:"El Nombre del Cliente es Obligatorio"})}
            />
            {errors.clientName && (
                <ErrorMessage>{errors.clientName.message}</ErrorMessage>
            )}
        </div>
        <div className="mb-5 space-y-3">
            <label htmlFor="description" className=" text-sm uppercase font-bold">Descripción del Proyecto</label>
            <textarea 
                id="description" 
                
                className="w-full p-3 border border-purple-400"
                placeholder="Descripción del Proyecto"
                {...register("description", {
                    required: "Una descripción del proyecto es obligatoria"
                })}
                
            />
            {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
        </div>
    </>
  )
}