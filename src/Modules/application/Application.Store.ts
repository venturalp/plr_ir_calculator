import { create } from 'zustand'
import { ColorStatus } from 'Commons/types/Types.base'

export type SnackMessageProps = {
  opened?: boolean
  status?: ColorStatus
  duration?: number
  message?: string
}

export type ApplicationStoreProps = {
  isLoading: boolean
  snackSettings: SnackMessageProps
}

const initialState: ApplicationStoreProps = {
  isLoading: false,
  snackSettings: {
    opened: false,
    status: 'success',
    duration: 4000,
    message: '',
  },
}

export const [useApplicationStore] = create((set: Function) => ({
  ...initialState,
  setInitial: () => set({ ...initialState }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setSnackSettings: (snackSettings: SnackMessageProps) =>
    set((previousValue: ApplicationStoreProps) => ({
      snackSettings: { ...previousValue.snackSettings, ...snackSettings },
    })),
}))
