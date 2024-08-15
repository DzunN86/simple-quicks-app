import QuickApp from "@/components/QuickApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Home() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <QuickApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
