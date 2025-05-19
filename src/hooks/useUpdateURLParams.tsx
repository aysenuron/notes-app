import { useNavigate, useSearchParams } from "react-router";

export function useUpdateURLParams() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    function updateSearchParams (key: string, value: string | string[]) {
        const params = new URLSearchParams(searchParams);

        if(value && (Array.isArray(value) ? value.length > 0 : value !== "")) {
            params.set(key, (Array.isArray(value) ? value.join(",") : value))
        } else {
            params.delete(key);
        }
        navigate(`?${params}`)
    }
    return updateSearchParams;
}
