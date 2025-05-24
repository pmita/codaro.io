
// HOOKS
import { useSearchParams } from "next/navigation";
// UTILS
import { BASE_LIMIT } from "@/utils/constants";

export const useFilterSearchParams = () => {
    const searchParams = useSearchParams();
    const status = searchParams.get('status') || 'paid';
    const sort = searchParams.get('sort') || 'desc';
    const limit = searchParams.get('limit') || BASE_LIMIT;

    return { status, sort, limit };
}