import { useState , useEffect } from 'react'
import './App.css'
import { ThemeProvider } from './context/Theme'
import ThemeBtn from './components/ThemeBtn';
import Card from './components/Card';

function App() {

  const [themeMode , setThemeMode] = useState("Light");

  const lightTheme = () => {
    setThemeMode("Light");
  }

  const darkTheme = () => {
    setThemeMode("Dark");
  }

  useEffect(() => {
    document.querySelector("html").classList.remove("dark" , "light");
    document.querySelector("html").classList.add(themeMode.toLowerCase());  
  }, [themeMode])
  


  return (
    <ThemeProvider value={{themeMode , lightTheme , darkTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <Card />

          <div className="w-full max-w-sm mx-auto">

          </div>
        </div>
      </div>
    </ThemeProvider>

  )
}

export default App
