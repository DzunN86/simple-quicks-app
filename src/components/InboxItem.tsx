import InboxPersonIcon from "@/components/InboxPersonIcon";
import { InboxType } from "@/types";

interface InboxItemProps extends InboxType {
  unRead?: boolean;
}

export default function InboxItem({ unRead = false, groupName, messages, users }: InboxItemProps) {
  // get user from last message
  const lastMessage = messages[messages.length - 1];

  console.log(lastMessage);
  return (
    <div className="flex items-center justify-between cursor-pointer">
      <div className="flex items-start gap-4 w-screen">
        <InboxPersonIcon />
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <h3 className="text-primary font-bold text-base">{groupName}</h3>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <p className="font-bold text-base">{users.filter((user) => user.userId === lastMessage.senderId)[0].userName}:</p>
          <p className="text-sm">{lastMessage.content}</p>
        </div>
      </div>
      {unRead && <div className="w-[10px] h-[10px] bg-red-500 rounded-full" />}
    </div>
  );
}
