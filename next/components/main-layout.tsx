import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster theme="light" position="top-center" />
      </body>
    </html>
  );
}
