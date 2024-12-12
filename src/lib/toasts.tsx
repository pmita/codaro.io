import { LoadingSpinner } from "@/components/loading-spinner";
import { toast } from "sonner";


export const showErrorToast = (description: string) => (
  toast("Something went wrong", {
    description,
    action: {
      label: "Close",
      onClick: () => toast.dismiss(),
  }})
);

export const showLoadingToast = (id: string) => (
  toast((
    <div className="flex justify-center items-center gap-4">
      <LoadingSpinner /> Loadding...
    </div>
  ), {
    id,
  })
)