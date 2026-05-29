import { useContext } from 'react';
import { SnackbarContext } from '../components/SnackbarContext';

export function useSnackbar() {
  return useContext(SnackbarContext);
}
