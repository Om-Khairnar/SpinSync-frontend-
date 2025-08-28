import { NavigationLayout } from '@/components/NavigationLayout';

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationLayout>
      {children}
    </NavigationLayout>
  );
}