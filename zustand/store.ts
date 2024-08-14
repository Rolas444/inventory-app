import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

interface inventoryState {
    entityName: string;
    entityId: string | null;
    action: string;
    setEntityObject: (entityName: string, entityId: string | null, action: string) => void;
    session: any ;
    setSession: (session: any) => void;
    imageUrl: string;
    setImageUrl: (imageUrl: string) => void;
}

export const useInventoryStore = create<inventoryState>()(
    devtools(
        (set) => ({
            entityName: '',
            entityId: null,
            action: '',
            setEntityObject: (entityName, entityId, action ) => set({entityName, entityId , action}),
            session: null,
            setSession: (session) => set({session}),
            imageUrl: 'https://drive.usercontent.google.com/download?id=', 
            setImageUrl: (imageUrl) => set({imageUrl})
        })
    )
);