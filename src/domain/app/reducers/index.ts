import { createSlice } from '@reduxjs/toolkit';
import startLoading from './startLoading';
import endLoading from './endLoading';
import startBlocking from './startBlocking';
import endBlocking from './endBlocking';

const slice = createSlice({
  name: 'app',
  initialState: {
    loading: 0,
    blocking: 0,
    loadingNames: [''],
  },
  reducers: {
    startLoading,
    endLoading,
    startBlocking,
    endBlocking,
  },
});
export default slice;
