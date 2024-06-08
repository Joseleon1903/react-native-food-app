import { WalletContextType } from "./type/WalletContextType";
import React from "react";


export const WalletContext = React.createContext<WalletContextType | null>(null);