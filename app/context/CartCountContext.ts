import React from "react";
import { CartCountContextType } from "./type/CartCountContextType";

export const CartCountContext = React.createContext<CartCountContextType | null>(null);
