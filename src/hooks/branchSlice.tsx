import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BranchState {
  uuid: string;
  branchId: string;
  mainBranchUuid: string; 
  mainBranchId: string;
}

const initialState: BranchState = {
  uuid: '',
  branchId: '', 
  mainBranchUuid: '',
  mainBranchId: '',

}

const BranchSlice = createSlice({
  name: 'branch', 
  initialState,
  reducers: {
    setBranchUuid: (state, action:PayloadAction<string>) => {
      state.uuid = action.payload; 
    },

    setBranchId: (state, action:PayloadAction<string>) => {
      state.branchId = action.payload; 
    },

    setMainBranchId: (state, action:PayloadAction<string>) => {
      state.mainBranchId = action.payload; 
    },

    setMainBranchUuid: (state, action:PayloadAction<string>) => {
      state.mainBranchUuid = action.payload; 
    },
  }
});

export const { setBranchUuid, setBranchId, setMainBranchId, setMainBranchUuid } = BranchSlice.actions;
export default BranchSlice.reducer;