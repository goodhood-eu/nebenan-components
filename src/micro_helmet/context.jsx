import { createContext } from 'react';

const addProps = () => { console.warn('Please use MicroHelmet Provider'); };

const MicroHelmetContext = createContext({ addProps });

export const Consumer = MicroHelmetContext.Consumer;
export const Provider = MicroHelmetContext.Provider;

export default MicroHelmetContext;
