import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";

export const fetchResults = createAsyncThunk(
  'results/fetch',
  async (startMatch, thunkAPI) => {
    const { data } = await axios.get(`/api/match/results?m=${startMatch}`);
    return data;
  }
)

const resultsSlice = createSlice({
  name: 'results',
  initialState: [],
  reducers: {
    clearResults: (state) => {
      return [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (start, action) => {
      return action.payload;
    })
  }
});

const { actions, reducer } = resultsSlice;
export const { setResults, clearResults } = actions;
export default reducer;
