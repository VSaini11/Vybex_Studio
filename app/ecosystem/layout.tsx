import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecosystem',
  description: 'One unified network. From creative strategy to AI and predictive engines, explore the Vybex roadmap.',
};

export default function EcosystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
