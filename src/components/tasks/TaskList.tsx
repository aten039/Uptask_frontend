import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { statusTranslation } from "../../locales/es"
import { Project, Task, TaskProject } from "../../types"
import DropTask from "./DropTask"
import TaskCard from "./TaskCard"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "../../services/taskApi"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type TaskListProp={
    tasks : TaskProject[],
    canEdit: boolean
}

type GroupTask = {
    [key:string]: TaskProject[]
}

const initialStatusGroups: GroupTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}


const statusStyle : {[key:string] : string}= {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}

export default function TaskList({tasks, canEdit}: TaskListProp) {
  
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);
  
    const queryClient = useQueryClient()
    const params = useParams()
    const projectId = params.projectId!
    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onError: (err)=>{
            toast.error(err.message)
        },
        onSuccess: (data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['details', projectId]})
            // queryClient.invalidateQueries({queryKey: ['taskDetails', taskId]})
        }
    })

    const handleDragEnd = (event: DragEndEvent)=>{
        const {over, active} = event
        if(over && over.id){
            const taskId= active.id.toString()
            const status = over.id as Task['status']
            mutate({projectId, taskId, status})

            queryClient.setQueryData(['details', projectId], (prevData:Project)=>{
                const updatedTask = prevData.tasks.map((task)=>{

                    if(task._id === taskId){
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })

                return {
                    ...prevData,
                    tasks: updatedTask
                }
            })
        }
    }

    return (
    <div>
        
        <h2 className="text-5xl font-black my-10">Tareas</h2>

        <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
            <DndContext onDragEnd={handleDragEnd}>
            {Object.entries(groupedTasks).map(([status, tasks]) => (
                <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                    
                    <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyle[status]}`}>{statusTranslation[status]}</h3>

                    <DropTask status={status}/>

                    <ul className='mt-5 space-y-5'>
                        {tasks.length === 0 ? (
                            <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                        ) : (
                            tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
                        )}
                    </ul>
                </div>
            ))}
            </DndContext>
        </div>
    </div>
  )
}
