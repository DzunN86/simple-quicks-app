import { updateTask } from "@/api/tasks";
import ClockIcon from "@/components/Icon/ClockIcon";
import EditIcon from "@/components/Icon/EditIcon";
import ExpandIcon from "@/components/Icon/ExpandIcon";
import MoreIcon from "@/components/Icon/MoreIcon";
import SelectTags from "@/components/SelectTags";
import { Checkbox } from "@/components/ui/checkbox";
import Collapse from "@/components/ui/collapse";
import { DatePicker } from "@/components/ui/date-picker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EditAbleInput from "@/components/ui/editableInput";
import EditableTextareaInput from "@/components/ui/editableTextArea";
import { calculateDaysLeft, cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

interface TaskItemProps {
  id?: string;
  title?: string;
  dateline?: Date | string;
  description?: string;
  status?: boolean;
  tags?: string[];
  isNew?: boolean;
  type?: string;
  onDelete?: (id: string) => void;
}

export default function TaskItem({ id, title, dateline, description, status, tags, type, isNew, onDelete }: TaskItemProps) {
  const [expanded, setExpanded] = useState(isNew || false);
  const queryClient = useQueryClient();

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const [newTask, setNewTask] = useState({
    id: id || "",
    title: title || "",
    dateline: dateline || "",
    description: description || "",
    tags: tags || [],
    status: status || false,
    type: type || "",
  });

  const doUpdate = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating task", error);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // handle field changes
  const debouncedUpdateTask = useCallback(
    debounce((field: string, value: string | boolean | Date) => {
      const updatedTask = { ...newTask, [field]: value };
      setNewTask(updatedTask);
      doUpdate.mutate({ id: id || "", task: updatedTask });
    }, 600), // Debounce delay
    [doUpdate, id]
  );

  const handleFieldChange = (field: string, value: string | boolean | Date | string[]) => {
    /*
     * Debounce the update for title and description fields
     * to avoid unnecessary API calls on every key stroke
     */
    if (field === "title" || field === "description") {
      debouncedUpdateTask(field, value as string);
      return;
    }

    const updatedTask = { ...newTask, [field]: value };
    setNewTask(updatedTask);
    doUpdate.mutate({ id: id || "", task: updatedTask });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox checked={newTask.status} onCheckedChange={() => handleFieldChange("status", !newTask.status)} />
          <EditAbleInput
            isEdit={isNew}
            defaultValue={newTask.title || ""}
            placeholder="Untitled"
            className={cn("font-bold text-base min-w-[380px]", newTask.status && "line-through text-primary-gray-light")}
            onChange={(e) => handleFieldChange("title", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          
          {!newTask.status && newTask.dateline && <p className="text-indicator-red text-sm">{calculateDaysLeft(newTask.dateline)}</p>}
          <p className="text-sm">{newTask.dateline ? format(new Date(newTask.dateline), "dd/MM/yyyy") : ""}</p>
          <button onClick={toggleExpand} className={cn("transition-transform duration-300", expanded ? "rotate-180" : "rotate-0")}>
            <ExpandIcon className="fill-primary-gray hover:fill-primary" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-indicator-red" onClick={() => onDelete && onDelete(id || "")}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Collapse isOpen={expanded}>
        <div className="flex flex-col gap-4 mt-4 me-5">
          <div className="flex items-center gap-4 ps-7">
            <ClockIcon className={cn(newTask.dateline ? "fill-primary" : "fill-primary-gray-light")} />
            <DatePicker value={newTask.dateline} onSelect={(date) => handleFieldChange("dateline", date)} />
          </div>
          <div className="flex items-start gap-4 ps-7">
            <EditIcon className={cn("mt-2", newTask.description ? "fill-primary" : "fill-primary-gray-light")} />
            <EditableTextareaInput
              placeholder="No Description"
              className="text-sm"
              defaultValue={newTask.description || ""}
              // onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </div>
          <SelectTags
            tags={newTask.tags}
            setTags={(value: string) => {
              if (newTask.tags.includes(value)) {
                handleFieldChange(
                  "tags",
                  newTask.tags.filter((t) => t !== value)
                );
              } else {
                handleFieldChange("tags", [...newTask.tags, value]);
              }
            }}
          />
        </div>
      </Collapse>
    </div>
  );
}
