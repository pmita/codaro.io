// PACKAGES
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
// HOOKS
import { useAuth } from "@/hooks/useAuth"
import { toggleUserProgress } from "@/data/db/progress"
// TYPES
import { ToggleProgressMutationProps } from "./types"

export const useToggleProgressMutation = (courseSlug: string, chapterSlug: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationKey: ['chapter-progress', user?.uid, courseSlug, chapterSlug],
    mutationFn: async ({ courseSlug, chapterSlug }: ToggleProgressMutationProps) => {
      await toggleUserProgress(courseSlug, chapterSlug);
    },
    onMutate: async ({ chapterSlug }) => {
      await queryClient.cancelQueries({ queryKey: ['chapter-progress', user?.uid, courseSlug, chapterSlug] });

      const previousData = queryClient.getQueryData(['chapter-progress', user?.uid, courseSlug, chapterSlug]);

      queryClient.setQueryData(['chapter-progress', user?.uid, courseSlug, chapterSlug], (old: any) => {
        return {
          ...old,
          isCompleted: !old.isCompleted
        }
      });

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['chapter-progress', user?.uid, courseSlug, chapterSlug], context?.previousData);
      toast("Something went wrong", {
        description: _error.message,
        action: {
          label: "Close",
          onClick: () => toast.dismiss()
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters-progress', user?.uid, courseSlug] });
      toast.dismiss('loading-toggle-progress');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters-progress', user?.uid, courseSlug] });
      toast("Success", {
        description: "Progress Updated",
        action: {
          label: "Close",
          onClick: () => toast.dismiss()
        }
      })
    }
  })
}