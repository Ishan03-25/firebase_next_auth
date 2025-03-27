"use client"
import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

type DialogContextType = {
    isLoginDialogActive: boolean;
    setIsLoginDialogActive: Dispatch<SetStateAction<boolean>>;
};


const DialogContext = createContext<DialogContextType | null>(null);

export const DialogContextProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoginDialogActive, setIsLoginDialogActive] = useState(true);
    return (
        <DialogContext.Provider value={{isLoginDialogActive, setIsLoginDialogActive}}>
            {children}
        </DialogContext.Provider>
    )
}

// export const useDialogContext = () => useContext(DialogContext)

export const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogContextProvider");
    }
    return context;
};