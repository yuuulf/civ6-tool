import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Top from "./pages/Top";
const theme = createTheme({
  palette: {
    mode: "dark",
    gray: {
      main: "#9e9e9e",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Top />
      </div>
    </ThemeProvider>
  );
}

export default App;
