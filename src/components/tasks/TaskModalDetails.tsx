import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '../../services/taskApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { statusTranslation } from '../../locales/es';
import { toast } from 'react-toastify';
import { Task } from '../../types';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {
  
    const taskId = new URLSearchParams(location.search).get('viewTask')!;
    const projectId = useParams().projectId!

    const navigate = useNavigate()
    const {data, isError} = useQuery({
        queryKey:['taskDetails', taskId],
        queryFn: ()=> getTaskById({taskId, projectId}), enabled: !!taskId,
        retry:false
    })
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onError: (err)=>{
            toast.error(err.message)
        },
        onSuccess: (data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['details', projectId]})
            queryClient.invalidateQueries({queryKey: ['taskDetails', taskId]})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        
        const data = {
            projectId,
            taskId,
            status: e.target.value as Task['status']
        }
        mutate(data)

    }

    const show = taskId ? true: false

    if(isError){
       return <Navigate to={location.pathname}/>
    }
   
    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)} </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    {data.completedBy.length ? (
                                        <>
                                            <p className='text-lg text-slate-500 mb-2'>Historial de cambios</p>
                                    <ul className=' list-decimal'>
                                        {data.completedBy.map((activityLog)=>(
                                            <li key={activityLog._id}>
                                                <span className='font-bold text-slate-600'>
                                                    {statusTranslation[activityLog.status]}
                                                </span>
                                                {' '} por: {activityLog.user.name}
                                            </li>
                                        ))}
                                    </ul>
                                        </>
                                    ): null}
                                    
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: {data.status}</label>

                                        <select className=' w-full p-3 border border-gray-300 bg-white'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslation).map(([key, vaalue])=> (
                                                <option key={key} value={key}>{vaalue}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <NotesPanel notes={data.notes}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}