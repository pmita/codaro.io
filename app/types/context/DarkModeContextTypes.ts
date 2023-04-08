export type DarkModeProviderType = {
  children: React.ReactNode
}

export type DarkModeContextType = {
  darkMode: boolean
  toggleDarkMode: () => void
}