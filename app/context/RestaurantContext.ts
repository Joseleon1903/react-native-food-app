import * as React from 'react';
import { RestaurantContextType } from './type/RestaurantContextType';

export const RestaurantContext = React.createContext<RestaurantContextType | null>(null);

