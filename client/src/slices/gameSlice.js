import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: null,
    reducers: {
        updateGame: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateGame } = gameSlice.actions;

export default gameSlice.reducer;