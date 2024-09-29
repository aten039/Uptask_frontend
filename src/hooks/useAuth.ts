import { useQuery } from "@tanstack/react-query"
import { getUser } from "../services/authApi"
import { User } from "../types"

export function useAuth() {

    const {data, isError, isLoading} = useQuery<User>({
        queryKey:['user'],
        queryFn:getUser,
        retry:1,
        refetchOnWindowFocus:false
    })

    return {
        data, isError, isLoading
    }
}