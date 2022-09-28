import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async function to fetch data from mongodb; automatically generates pending,
// fulfilled and rejected action types

export const fetchFilms = createAsyncThunk("films_list/fetchFilms", () => {
  const data = axios.get("/films").then((response) => {
    return response.data;
  });
  return data;
});

export const filmSlice = createSlice({
  name: "films_list",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: "",
  },
  //extrareducers used to access the action types generated by the createAsyncThunk function
  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchFilms.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
      state.errorCode = action.error.code;
    });
  },
});

export default filmSlice.reducer;
