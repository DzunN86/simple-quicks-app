import { createTask, deleteTask, fetchTasks } from "@/api/tasks";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskItem from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function TasksList() {
  const queryClient = useQueryClient();
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { data, isPending } = useQuery<Task[], Error>({ queryKey: ["tasks"], queryFn: fetchTasks });
  const [lastIndex, setLastIndex] = useState(-1);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // scroll to the bottom of the list
      setTimeout(() => {
        listContainerRef.current?.scrollTo({ top: listContainerRef.current?.scrollHeight, behavior: "smooth" });
      }, 500);
    },
  });

  const doDelete = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData<Task[]>(["tasks"], (old) => old?.filter((task) => task.id !== id) || []);
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const toggleNewTask = () => {
    // setNewTask((prev) => !prev);
    mutate();
    setLastIndex(data?.length || 0);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="My Tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal Errands</SelectItem>
            <SelectItem value="urgent">Urgent To-Do</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={toggleNewTask} isLoading={isLoading}>
          New Task
        </Button>
      </div>
      {isPending && (
        <div className="flex items-center justify-center h-full mt-36">
          <LoadingSpinner message="Loading Task List..." />
        </div>
      )}
      {data?.length === 0 && !isPending && (
        <div className="flex items-center justify-center h-full mt-36">
          <p className="text-primary-gray">No tasks available</p>
        </div>
      )}
      <div className="px-3 pb-6 h-full overflow-y-auto mx-3" ref={listContainerRef}>
        <ul className="flex flex-col gap-[22px] divide-y divide-input">
          <AnimatePresence mode="popLayout">
            {data?.map((item, idx) => (
              <motion.ul layout initial={{ opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring" }} className="pt-[18px]" key={item.id}>
                <TaskItem
                  isNew={lastIndex === idx}
                  onDelete={doDelete.mutate}
                  id={item.id}
                  title={item.title}
                  dateline={item.dateline}
                  description={item.description}
                  status={item.status}
                  tags={item.tags}
                />
              </motion.ul>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
