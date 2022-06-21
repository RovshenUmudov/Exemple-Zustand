import create from "zustand";
import {persist} from 'zustand/middleware'
import api from "../api/api";

export type Item = {
    url: string,
    title: string,
    id: number
}

type InitialState = {
    items: Item[],
    loading: boolean,
    fetchItem: () => void,
    removeItem: (payload: number) => void
    toggleFetching: (payload: boolean) => void,
}

const useStore = create(
    persist<InitialState>(
        (set, get) => ({
            items: [],
            loading: false,
            toggleFetching: (payload) => set(() => ({loading: payload})),
            fetchItem: async () => {
                try {
                    get().toggleFetching(true)

                    const lastItem = get().items[get().items.length - 1]
                    const res = await api.getPhotos(lastItem ? lastItem.id : 0)
                    let data: Item[] = []

                    res.forEach((el: Item) => {
                        data = [...data, {url: el.url, title: el.title, id: el.id}]
                    })

                    set(state => ({items: [...state.items, ...data]}))
                    get().toggleFetching(false)
                } catch (error) {
                    console.log(error)
                    get().toggleFetching(false)
                }
            },
            removeItem: (payload) => {
                set((state) => ({items: state.items.filter(el => el.id !== payload)}))
            }
        }),
        {
            name: 'storage',
            getStorage: () => sessionStorage, // (optional) by default, 'localStorage'
        }
    )
)

export default useStore