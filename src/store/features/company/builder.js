import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

interface ChildrenEntry {
   parentId: ParentId;
   children: EntityState<ChildType>
 }
 
 interface ChildrenData {
   parentId: ParentId;
   children: ChildType[];
 }
 
 interface NewChildAdded {
   parentId: ParentId;
   child: ChildType;
 }
 
 export const childEntriesAdapter = createEntityAdapter<ChildrenEntry>();
 export const childrenAdapter = createEntityAdapter<ChildType>();
 
 const initialState = childEntriesAdapter.getInitialState();
 
 const createNewChildEntry = (parentId: ParentId) => ({
   parentId,
   children: childrenAdapter.getInitialState()
 });
 
 const childEntriesSlice = createSlice({
   name: "children",
   initialState,
   reducers: {
     childEntriesLoaded(state, action: PayloadAction<ChildrenData>) {
       const {parentId, children} = action.payload;
       const childEntry = state.entities[parentId];
       if (childEntry) {
         childrenAdapter.setAll(childEntry.children, children);
       }
     },
     // etc
   },
   extraReducers: builder => {
     builder
       .addCase(parentLoaded, (state, action) => {
         const childEntries = action.payload.map(parent => createNewChildEntry(parent.id));
         childEntriesAdapter.setAll(state, childEntries);
       })
       .addCase(parentDeleted, (state, action) => {
         childEntriesAdapter.removeOne(state, action);
       })
       .addCase(parentAdded, (state, action) => {
         const childEntry = createNewChildEntry(action.payload.id);
         childEntriesAdapter.addOne(state, childEntry);
       });
   }
 })