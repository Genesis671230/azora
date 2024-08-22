import editModalReducer from '../slices/editModalSlice/editModalSlice';
import { configureStore } from '@reduxjs/toolkit';
import usersSlice from 'features/users/userSlice';

const store = configureStore({
    reducer: {
        editModal: editModalReducer,
        // Add other reducers here if needed
        users: usersSlice,
    
        
    },
});

export default store;