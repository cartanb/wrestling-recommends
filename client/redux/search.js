import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMatchNames = createAsyncThunk(
  'search/fetch',
  async () => {
    const { data } = await axios.get('/api/match/');
    return data;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: { allMatches: [], startMatch: '' },
  reducers: {
    setStartMatch: (state, action) => {
      state.startMatch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchNames.fulfilled, (state, action) => {
      state.allMatches = action.payload;
    });
  },
});

const { actions, reducer } = searchSlice;
export const { setStartMatch } = actions;
export default reducer;
