export type DarkModeProviderType = {
  children: React.ReactNode
}

export type DarkModeContextType = {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  color: string
}