import { ReactNode } from "react"


type Props = {
    children: ReactNode
}

export default function ErrorMessage({children}: Props) {
  return (
    <div className=" text-center bg-red-100 my-4 text-red-600 font-bold p-3 uppercase text-sm">
        {children}
    </div>
  )
}