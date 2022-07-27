import { useContext } from 'react';
import { Context } from './Context';

export const useDigitalArtContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('No digital art context was found');
  return context;
};
