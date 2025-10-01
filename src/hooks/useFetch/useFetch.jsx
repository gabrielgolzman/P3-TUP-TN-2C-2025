import { useContext, useState } from "react";
import { AuthContext } from "../../services/authContext/AuthContext";


const baseUrl = import.meta.env.VITE_APP_API_URL;

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useContext(AuthContext);

    const call = (url, method, isPrivate, header, body, onSucces, onError) => {
        setIsLoading(true);

        fetch(baseUrl + url, {
            method,
            headers: {
                ...header,
                "Authorization": isPrivate ? `Bearer ${token}` : ''
            },
            body: body && JSON.stringify(body)
        })
            .then(async res => {
                if (!res.ok) {
                    const errData = await res.json();
                    console.log(errData.message)
                    throw new Error(errData.message || "Algo ha salido mal");
                }

                return res.json();
            })
            .then(onSucces)
            .catch(onError)
            .finally(() => {
                setIsLoading(false);
            })
    }

    const get = (url, isPrivate, onSucces, onError) =>
        call(url, "GET", isPrivate, null, null, onSucces, onError)

    const post = (url, isPrivate, body, onSucces, onError) =>
        call(url,
            "POST",
            isPrivate,
            {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body,
            onSucces,
            onError
        )

    return {
        get,
        post,
        isLoading
    }

}

export default useFetch;