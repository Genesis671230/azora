import { mode } from '@chakra-ui/theme-tools';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isOpen: false,
    isAddModalOpen: false,
    isEditModalOpen: false,
    selectedModalIndex: null,
    
    loading: false,
    rowData: null,
};


const editModalSlice = createSlice({
    name: 'editModal',
    initialState,
    reducers: {
        modalOpened: (state) => {
            state.isOpen = true;
        },
        modalEditOpened: (state) => {
            state.isEditModalOpen = true;
            
        },
        modalOpenedWithData: (state, action) => {
            console.log(action, "payload");
            state.selectedModalIndex = action?.payload?.selectedModalIndex;
            state.rowData = action.payload;
            state.isEditModalOpen = true;
        },
        modalClosed: (state) => {
            state.rowData = null;
            state.isEditModalOpen = false;
            state.isOpen = false;

        },
      
    },
});

export const { modalOpened,modalClosed,modalOpenedWithData,modalEditOpened } = editModalSlice.actions;
export const modalData = (state) => state.editModal;
export default editModalSlice.reducer;


