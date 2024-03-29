import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'admin',
    initialState: null,
    reducers: {
        updateAdmin: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateAdmin } = adminSlice.actions;

export default adminSlice.reducer;