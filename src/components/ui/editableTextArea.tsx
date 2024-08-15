import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";

interface EditableTextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  isEdit?: boolean;
}

export default function EditableTextareaInput({ className,isEdit, ...props }: EditableTextareaProps) {
  const [isEditing, setIsEditing] = React.useState(isEdit || false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // auto resize textarea every time it's content changes
  const onInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "34px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  return (
    <Textarea
      ref={textareaRef}
      dir="auto"
      type="text"
      className={cn("h-[32px] py-1 overflow-hidden break-words", isEditing ? "" : "border-transparent resize-none", className)}
      {...props}
      onFocus={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      onInput={onInput}
    />
  );
}
