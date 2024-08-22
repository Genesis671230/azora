import editModalReducer from '../slices/editModalSlice/editModalSlice';
import { configureStore } from '@reduxjs/toolkit';
import dealSlice from 'features/deals/dealSlice';
import usersSlice from 'features/users/userSlice';

const store = configureStore({
    reducer: {
        editModal: editModalReducer,
        // Add other reducers here if needed
        deals: dealSlice,
        users: usersSlice,
    
        
    },
});

export default store;