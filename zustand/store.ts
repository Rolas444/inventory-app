import {create} from 'zustand';

interface inventoryState {
    entityName: string;
    entityId: string | null;
    action: string;
}

export const useInventoryStore = create<inventoryState>((set) => ({
    entityName: '',
    entityId: null,
    action: '',
    setEntityObject: (entityName : string, entityId: string | null, action: string ) => set({entityName, entityId, action}),
}));