export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3">
      <svg className="w-11 h-11 animate-spin" xmlns="http://www.w3.org/2000/svg" width="61" height="61" fill="none" viewBox="0 0 61 61">
        <path stroke="#F8F8F8" strokeWidth="8" d="M57 30.5C57 45.136 45.136 57 30.5 57S4 45.136 4 30.5 15.864 4 30.5 4 57 15.864 57 30.5z"></path>
        <path
          fill="#C4C4C4"
          d="M49.238 11.762c1.562-1.562 1.576-4.12-.177-5.464A30.5 30.5 0 006.298 49.06c1.344 1.753 3.902 1.74 5.464.177l.089-.089c1.562-1.562 1.526-4.079.267-5.894a22.374 22.374 0 0131.137-31.137c1.815 1.26 4.332 1.295 5.894-.267l.09-.09z"
        ></path>
      </svg>
      <span className="text-sm font-bold">{message ? message : "Loading..."}</span>
    </div>
  );
}
