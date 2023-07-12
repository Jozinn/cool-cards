import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slices/playerSlice'
import gameReducer from './slices/gameSlice'
import adminReducer from './slices/adminSlice'

export default configureStore({
    reducer: {
        player: playerReducer,
        game: gameReducer,
        admin: adminReducer
    }
});