import Routing from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import customTheme from "./components/theme/MainTheme";
function App() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <ThemeProvider theme={customTheme}>
        <Router>
          <Routing />
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
