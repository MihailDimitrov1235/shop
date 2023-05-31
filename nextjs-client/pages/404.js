import { useRouter } from "next/router"

export default function Page404(){
    const router = useRouter()
    return (
        <>
            <h1>404</h1>
            <h2>{router.asPath} not found</h2>
        </>
    )
}