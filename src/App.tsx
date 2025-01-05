import { QueryProvider } from "./provider/query/QueryProvider";
import { AppRouterProvider } from "./provider/route/AppRouterProvider";
import { GlobalStyle } from "./styles/global-style";


function App() {
  
  return (
    <QueryProvider>
      <GlobalStyle/>
      <AppRouterProvider/>
    </QueryProvider>
  );
}

export default App;