import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk(
  'results/fetch',
  async (startMatch) => {
    const { data } = await axios.get(`/api/match/results?m=${startMatch}`);
    return data;
  },
);

const resultsSlice = createSlice({
  name: 'results',
  initialState: [],
  reducers: {
    clearResults: () => [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (start, action) => action.payload);
  },
});

const { actions, reducer } = resultsSlice;
export const { setResults, clearResults } = actions;
export default reducer;
