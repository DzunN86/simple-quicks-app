import { fetchInbox } from "@/api/inbox";
import InboxDetail from "@/components/InboxDetail";
import InboxList from "@/components/InboxList";
import { InboxType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function InboxContainer() {
  const [selectedInbox, setSelectedInbox] = useState<InboxType>({ id: "", groupName: "", users: [], messages: [] });

  const resetSelectedInbox = () => setSelectedInbox({ id: "", groupName: "", users: [], messages: [] });

  const { data, isPending } = useQuery<InboxType[], Error>({ queryKey: ["inbox"], queryFn: fetchInbox });

  if (selectedInbox.id) {
    return <InboxDetail groupName={selectedInbox.groupName} users={selectedInbox.users} messages={selectedInbox.messages} id={selectedInbox.id} back={resetSelectedInbox} />;
  }

  return <InboxList data={data || []} isLoading={isPending} onSelected={setSelectedInbox} />;
}
