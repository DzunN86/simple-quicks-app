import InboxItem from "@/components/InboxItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { InboxType } from "@/types";
import { useMemo, useState } from "react";

interface InboxListProps {
  data: InboxType[];
  isLoading?: boolean;
  onSelected: (inbox: InboxType) => void;
}

export default function InboxList({ data, isLoading, onSelected }: InboxListProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => item.groupName.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  return (
    <div className="flex flex-col gap-[22px] px-8 pt-5 pb-3">
      <Input type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      {isLoading && (
        <div className="flex items-center justify-center h-full mt-36">
          <LoadingSpinner message="Loading Inbox..." />
        </div>
      )}  

      {filteredData?.length === 0 && !isLoading && (
        <div className="flex items-center justify-center h-full mt-36">
          <p className="text-primary-gray">No Inbox Available</p>
        </div>
      )}
      <ul className="flex flex-col gap-[22px] divide-y divide-input">
        {filteredData.map((item, i) => (
          <div className="pt-[18px] " key={i} role="button" onClick={() => onSelected(item)}>
            <InboxItem groupName={item.groupName} messages={item.messages} users={item.users} id={item.id} />
          </div>
        ))}
      </ul>
    </div>
  );
}
