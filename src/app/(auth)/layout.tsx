export default async function AuthLayout({ children } : { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-[90dvh] grid place-items-center bg-neutral">
      {children}
    </main>
  )
}