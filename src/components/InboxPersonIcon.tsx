import PersonIcon from "@/components/Icon/PersonIcon";

const InboxPersonIcon = () => {
  return (
    <div className="relative flex items-center">
      <div className="w-[34px] h-[34px] bg-[#E0E0E0] rounded-full flex items-center justify-center">
        <PersonIcon className="fill-black/50" />
      </div>
      <div className="w-[34px] h-[34px] bg-primary rounded-full flex items-center justify-center -ml-4">
        <PersonIcon className="fill-white" />
      </div>
    </div>
  );
};

export default InboxPersonIcon;
