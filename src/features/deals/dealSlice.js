import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteManyApi, getApi } from "services/api";

const initialState = {
  deals: [],
  selectedDealsId: [],
  status: "idle",
  error: null,
};

const user = JSON.parse(localStorage.getItem("user"));

export const fetchDealsAsync = createAsyncThunk(
  "deals/fetchDeals",
  async () => {
    try {
      const response = await getApi("api/deal/");
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch processed deals");
    }
  }
);

export const deleteDealAsync = createAsyncThunk(
  "deals/deleteDeal",
  async (selectedDealsId, { getState, rejectWithValue }) => {
    const { deals } = getState();

    try {
      console.log(
        deals.selectedDealsId,
        "this is selected deals id s inside of the delete deal async"
      );
      await deleteManyApi("api/deal/deleteMany", deals.selectedDealsId);
      return deals.selectedDealsId;
    } catch (error) {
      return rejectWithValue("Failed to delete deals");
    }
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setDealIds: (state, action) => {
      state.selectedDealsId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDealsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDealsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deals = action.payload;
      })
      .addCase(fetchDealsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteDealAsync.pending, (state) => {
        console.log(state, "this is loading state");
        state.status = "loading";
      })
      .addCase(deleteDealAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "payloads");
        // Remove the deleted deals from the state
        state.deals = state.deals.filter(
          (deal) => !action.payload.includes(deal._id.toString())
        );
        state.selectedDealsId = []; // Reset selection after deletion
        console.log(state.deals, "this is succesed state");
      })
      .addCase(deleteDealAsync.rejected, (state, action) => {
        state.status = "failed";
        console.log(state, "this is failed state");
        state.error = action.payload;
      });
  },
});

export const selectDeals = (state) => state.deals.deals || [];
export const selectStatus = (state) => state.deals.status;
export const selectError = (state) => state.deals.error;
export const getSelectedDealsId = (state) => state?.deals?.selectedDealsId;
export const { setDealIds } = dealsSlice.actions;

export default dealsSlice.reducer;
