import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ContentState {
  content: string;
  loading: boolean;
  error: string | null; 
}

const initialState: ContentState = {
  content: '',
  loading: true,
  error: null, 
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<ContentState>) => {
      const { content } = action.payload;
      state.content = content;
      state.loading = false;
      state.error = null; 
    },
    resetContent: (state) => {
      state.content = '';
      state.loading = true;
      state.error = null; 
    },
    setError: (state, action: PayloadAction<string>) => {
      const error = action.payload;
      state.error = error;
      state.loading = false;
    },
  },
});

export const { setContent, resetContent, setError } = contentSlice.actions;
export default contentSlice.reducer;
