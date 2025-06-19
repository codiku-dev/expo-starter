import AsyncStorage from '@react-native-async-storage/async-storage';

import { StateStorage } from 'zustand/middleware';

// const mmkvStorage = new MMKV()

export const ZustandStorage: StateStorage = {
    getItem: async (name) => {
        const value = await AsyncStorage.getItem(name)
        if (!value) return null
        try {
            return JSON.parse(value)
        } catch {
            return null
        }
    },
    setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value))
    },
    removeItem: async (name) => {
        await AsyncStorage.removeItem(name)
    },
}

