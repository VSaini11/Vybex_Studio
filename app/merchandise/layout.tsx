import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merchandise',
  description: 'A premium collection of digital crafts and physical artifacts, built for the next generation of creators.',
};

export default function MerchandiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
