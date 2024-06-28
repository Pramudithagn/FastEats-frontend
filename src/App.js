import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { Home } from './components/Home/Home';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <NavBar/>
    <Home/>

    </ThemeProvider>
  );
}

export default App;
