import { toggleChapterProgress } from "@/data/progress"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useToggleProgressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['progress'],
    mutationFn: async ({ chapterId, isCompleted }: { chapterId: string, isCompleted: boolean }) => {
      await toggleChapterProgress(chapterId, isCompleted);
    },
    onMutate: async ({ chapterId, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: ['progress'] });

      const previousData = queryClient.getQueryData(['progress']);

      queryClient.setQueryData(['chapter-progress', chapterId], (old: any) => {
        return {
          ...old,
          [chapterId]: isCompleted
        }
      });

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['progress'], context?.previousData);
      toast("Something went wrong", {
        description: _error.message,
        action: {
          label: "Close",
          onClick: () => toast.dismiss()
        }
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      toast.dismiss('loading-toggle-progress');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
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