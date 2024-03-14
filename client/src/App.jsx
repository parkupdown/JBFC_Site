import Router from "./Router.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./styles/global.js";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 2,
        //2시간
        cacheTime: 1000 * 60 * 60 * 2,
        //2시간
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
