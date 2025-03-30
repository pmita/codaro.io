export default function ContentPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container px-2 pt-2 w-full">
      {children}
    </div>
  );
}