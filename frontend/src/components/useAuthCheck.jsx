import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useAuthCheck = () => {
    const navigate = useNavigate()
    const [userExist, setUserExist] = useState(false)

    useEffect(()=> {
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration')

        if(token && tokenExpiration) {
            const now = new Date().getTime();
            if(now > tokenExpiration) {
                print("here")
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                setUserExist(false);
                navigate('/login')
            } else {
                setUserExist(true);
            }
        } else {
            
            navigate('/login')
        }
    }, [navigate])

    return {userExist, setUserExist}
}

export default useAuthCheck