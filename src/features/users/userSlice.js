import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteManyApi, getApi } from "services/api";

const initialState = {
  users: [],
  selectedUsersId: [],
  status: "idle",
  error: null,
};

const user = JSON.parse(localStorage.getItem("user"));

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    try {
      const response = await getApi("api/user/");
      console.log(response);
      return response.data.user;
    } catch (error) {
      throw new Error("Failed to fetch processed users");
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (selectedUsersId, { getState, rejectWithValue }) => {
    const { users } = getState();

    try {
      console.log(
        users.selectedUsersId,
        "this is selected users id s inside of the delete User async"
      );
      await deleteManyApi("api/user/deleteMany", users.selectedUsersId);
      return users.selectedusersId;
    } catch (error) {
      return rejectWithValue("Failed to delete users");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserIds: (state, action) => {
      state.selectedUsersId = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        console.log(state, "this is loading state");
        state.status = "loading";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => !state.selectedUsersId.includes(user._id)
        );
        state.selectedUsersId = []; // Reset selection after deletion
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = "failed";
        console.log(state, "this is failed state");
        state.error = action.payload;
      });
  },
});

export const selectUsers = (state) => state?.users?.users || [];
export const selectStatus = (state) => state.users?.status;
export const selectError = (state) => state.users?.error;
export const getSelectedUsersId = (state) => state?.users?.selectedUsersId;
export const { setUserIds } = usersSlice.actions;

export default usersSlice.reducer;
