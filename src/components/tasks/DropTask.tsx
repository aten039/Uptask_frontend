import { useDroppable } from "@dnd-kit/core"

type DropTaskProp = {
    status: string
}
export default function DropTask({status}:DropTaskProp) {

    const {isOver, setNodeRef}= useDroppable({
        id:status
    })

    const style = {
        opacity:isOver ? 0.4 :undefined
    }

  return (
    <div
        ref={setNodeRef}
        style={style}
        className='text-xs font-semibold p-2 uppercase border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500 transition-all'
    >
        Soltar tarea aqui
    </div>
  )
}
