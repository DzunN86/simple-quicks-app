import ChatBubble from "@/components/ChatBubble";
import CloseIcon from "@/components/Icon/CloseIcon";
import InboxHeader from "@/components/InboxHeader";
import InboxTimeDivider from "@/components/InboxTimeDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InboxType, MessageType } from "@/types";
import { format } from "date-fns";
import { Fragment, useState } from "react";

// static
const me = "u1";

interface InboxDetailProps extends InboxType {
  back: () => void;
}

const groupMessagesByDate = (messages: MessageType[]) => {
  return messages.reduce((groups, message) => {
    const date = format(new Date(message.timestamp), "yyyy-MM-dd");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as { [key: string]: MessageType[] });
};

export default function InboxDetail({ groupName, messages, users, back }: InboxDetailProps) {
  // get user from last message
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);

  const groupedMessages = groupMessagesByDate(messages);
  return (
    <div className="flex flex-col h-full">
      <InboxHeader groupName={groupName} participants={users.length} back={back} />
      <div className="px-3 py-3 h-full overflow-y-auto mx-3">
        <div className="flex flex-col gap-4">
          {Object.keys(groupedMessages).map((date) => (
            <Fragment key={date}>
              <InboxTimeDivider time={format(new Date(date), "MMMM dd, yyyy")} />
              {groupedMessages[date].map((item, index) => (
                <ChatBubble
                  key={index}
                  isMe={item.senderId === me}
                  message={item.content}
                  messages={messages}
                  name={users.find((user) => user.userId === item.senderId)?.userName}
                  time={item.timestamp}
                  selectMessage={() => setSelectedMessage(item)}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-3 px-6 py-[19px]">
        <div className="w-full relative">
          {selectedMessage && (
            <Fragment>
              <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-5 ">
                <CloseIcon className="w-3 h-3" />
              </button>
              <div className="bg-[#F2F2F2] p-4 border border-input border-b-0 rounded-t-md">
                <h4 className="font-bold text-sm">Replying to {users.find((user) => user.userId === selectedMessage.senderId)?.userName}</h4>
                <p className="text-sm">
                  {selectedMessage.content}
                </p>
              </div>
            </Fragment>
          )}
          <Input placeholder="Type a message" className={cn(selectedMessage && "rounded-t-none", "focus-visible:ring-0 focus-visible:ring-offset-0")} />
        </div>
        <Button>Send</Button>
      </div>
    </div>
  );
}
