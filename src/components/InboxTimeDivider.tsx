
export default function InboxTimeDivider({ time }: { time: string }) {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-primary-gray"></div>
      <span className="flex-shrink mx-4 text-prborder-primary-gray font-bold">{time}</span>
      <div className="flex-grow border-t border-primary-gray"></div>
    </div>
  );
}
