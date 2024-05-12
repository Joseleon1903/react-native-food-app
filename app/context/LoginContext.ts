import React from "react";
import { LoginContextType } from "./type/LoginContextType";

export const LoginContext = React.createContext<LoginContextType | null>(null);