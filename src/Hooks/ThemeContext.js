import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useState(false);


    // Get device theme and set as site theme
    useEffect(()=>{
        let storeTheme = localStorage.getItem("theme");

        if(!storeTheme || !(storeTheme === "dark" || storeTheme === "light")){
            storeTheme = window.matchMedia("(prefers-color-schema: dark)").matches ? "dark" 
            : "light"
        }
        setTheme(storeTheme)
    },[])

    // Set theme as attributes in html Tag.

    useEffect(()=>{
        document.querySelector("html").setAttribute("data-theme", theme)
    },[theme])
    
    useEffect(()=>{
        const onChange = (e) =>{
            const colorTheme = e.matches ? "dark" : "light";
            setTheme(colorTheme)
        }

        // get device theme & add even listener 
        window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", onChange)

        return ()=>{
            // remove even listener when changed
            window
            .matchMedia("(prefers-color-scheme: dark)")
            .removeEventListener("change", onChange)
        }
    },[])

    const themeToggle = () =>{
        setTheme((preTheme)=>{
            const currentTheme = preTheme === "dark" ? "light" : "dark";

            localStorage.setItem("theme", currentTheme)
            return currentTheme;
        })
    }

    return (<ThemeContext.Provider value={{theme, themeToggle}}>
        {children}
    </ThemeContext.Provider>)
}


/**
 * 1. Get Device theme & set as state theme.
 * 2. Select parents tag and state theme set as tag   
      attributes.
 * 3. device theme change functionality.
 * 4. toggle theme functionality.
 * 5. theme, toggle functionality provide's value.
 */