import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import LoginCard from "./components/Login";
import { CorrectorProvider } from "./context/CorrectorContext";

function App() {
  return (
    <CorrectorProvider>
      <CssBaseline />
      <Header />
      <LoginCard />
    </CorrectorProvider>
  );
}

export default App;
