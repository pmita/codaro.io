import { RootLayout } from "@/layouts/content/course/root-layout";

export const ContentPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      {children}
    </ RootLayout>
  );
}