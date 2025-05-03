import React,{createContext, useContext} from "react";
import { useEffect,useState } from "react";


const DarkModeContext = createContext();

export const DarkModeProvider = ({children})=>{
    const [isDarkMode, setisDarkMode] = useState(()=>{
        const curr = localStorage.getItem('DarkMode');
        if(!curr){
            localStorage.setItem('DarkMode',JSON.stringify(false));
            return false;
        }
        return JSON.parse(curr);
    })
    
    const toggleDarkMode = () => {
        setisDarkMode((prevMode) => !prevMode);
        console.log("Toggled!");
      };

      useEffect(() => {
        localStorage.setItem('DarkMode', JSON.stringify(isDarkMode));
        
        document.body.classList.toggle('dark-mode', isDarkMode);
      }, [isDarkMode]);
      return (
        <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
        
      );
      
}

export const useDarkMode = () =>{
    return useContext(DarkModeContext);
}
