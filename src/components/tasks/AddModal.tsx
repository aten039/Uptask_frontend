import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskFormData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createTask } from '../../services/taskApi';


export default function AddTaskModal() {

   const queryParams = new URLSearchParams(window.location.search).get('newTask')
   const show = queryParams ?true:false
   const navigate = useNavigate()
   const params = useParams()
   const projectId = params.projectId!
   const initialValues: TaskFormData = {
        name:'',
        description:''
   }
   const {register, handleSubmit, formState:{errors}} = useForm<TaskFormData>({defaultValues:initialValues})

   const queryClient = useQueryClient()

   const {mutate} = useMutation({
    mutationFn: createTask,
    onError: (error)=>{
        toast.error(error.message)
    },
    onSuccess:(data)=>{
        queryClient.invalidateQueries({queryKey:['details', projectId]})
        toast.success(data)
        navigate(window.location.pathname)
    }
   })

   const handleCreateTask:SubmitHandler<TaskFormData> = (formData)=>{
        mutate({taskFormData:formData, projectId:params.projectId!})
   }
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { navigate(window.location.pathname) }}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form onSubmit={handleSubmit(handleCreateTask)}>

                                        <TaskForm
                                            errors={errors}
                                            register={register}
                                        />
                                        <input 
                                            type='submit'
                                            value={'Guardar Tarea'}
                                            className=' bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
                                        />
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}