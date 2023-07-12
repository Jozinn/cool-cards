import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'player',
    initialState: null,
    reducers: {
        updatePlayer: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updatePlayer } = playerSlice.actions;

export default playerSlice.reducer;