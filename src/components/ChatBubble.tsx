import MoreIcon from "@/components/Icon/MoreIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MessageType } from "@/types";
import { format } from "date-fns";
import { Fragment } from "react";

interface ChatBubbleProps {
  isMe?: boolean;
  message: string;
  time: string;
  messages: MessageType[];
  replyTo?: string;
  name?: string;
  selectMessage: () => void;
}

export default function ChatBubble({ isMe, message, time, messages, name, replyTo, selectMessage }: ChatBubbleProps) {
  return (
    <div className={cn("flex flex-col", isMe && "items-end")}>
      <p className={cn("font-bold mb-1", isMe ? "text-chat-purple " : "text-chat-green")}>{isMe ? "You" : name}</p>
      {replyTo && (
        <div className="bg-[#F2F2F2] p-3 rounded-sm border border-input mb-2 max-w-max">
          <h4 className="font-bold text-sm">Replying to John Doe</h4>
          <p className="text-sm">Hey, I have a question about the application process.</p>
        </div>
      )}
      <div className={cn("flex items-start gap-2", isMe && "flex-row-reverse")}>
        <div className={cn("rounded-sm p-3", isMe ? "bg-chat-purple-light" : "bg-chat-green-light")}>
          <p className="text-sm">{message}</p>
          <p className="text-xs mt-2">{format(new Date(time), "HH:mm")}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isMe ? (
              <Fragment>
                <DropdownMenuItem className="text-primary">Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-indicator-red">Delete</DropdownMenuItem>
              </Fragment>
            ) : (
              <Fragment>
                <DropdownMenuItem className="text-primary" role="button">
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-primary" onClick={selectMessage}>
                  Reply
                </DropdownMenuItem>
              </Fragment>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
