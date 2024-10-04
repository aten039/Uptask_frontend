import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../services/projectApi";
import AddTaskModal from "../../components/tasks/AddModal";
import TaskList from "../../components/tasks/TaskList";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import { useMemo } from "react";


export default function DetailsProjectView() {

    const {data:user , isLoading:authLoading} = useAuth()

    const navigate = useNavigate()
    const param = useParams();
    const projectId = param.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['details', projectId],
        queryFn: ()=> getProjectById(projectId),
        retry:1
    })

    const canEdit = useMemo(()=> data?.manager === user?._id , [data,user])

    if(isLoading && authLoading) return "Cargando..."
    if(isError) return <Navigate to={'/404'}/>
    if (data && user) return (
    <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">{data.description}</p>
        <nav className="my-5 flex gap-3">
            <Link
                to={'..'}
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >Volver</Link>
            {isManager(data.manager, user._id) && (
                <>
                     <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={()=> navigate('?newTask=true')}
                    >Agregar Tarea</button>
                    <Link to={'team'}           className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">
                Colaboradores
                    </Link>
                </>
            )}
           
        </nav>

        <TaskList
            tasks={data.tasks}
            canEdit={canEdit}
        />

        <AddTaskModal/>
        <EditTaskData/>
        <TaskModalDetails/>
    </>
    )
}
