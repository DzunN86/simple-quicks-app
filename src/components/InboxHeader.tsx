import ArrowBackIcon from "@/components/Icon/ArrowBackIcon";

interface InboxHeaderProps {
  groupName: string;
  participants: number;
  back: () => void;
}

export default function InboxHeader({ groupName, participants, back }: InboxHeaderProps) {
  return (
    <div className="flex sticky top-0 bg-white items-center justify-between border-b border-input px-6 py-4">
      <div className="flex items-center gap-4">
        <button onClick={back}>
          <ArrowBackIcon />
        </button>
        <div className="flex flex-col">
          <h3 className="text-primary font-bold text-base">{groupName}</h3>
          <p className="text-xs">{participants} Participats</p>
        </div>
      </div>
      {/* <CloseIcon /> */}
    </div>
  );
}
