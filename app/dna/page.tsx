import VybexDNAClient from './dna-client';
import { getDNAStats } from './actions';

export const metadata = {
  title: 'Vybex DNA | AI Startup Idea Analyzer',
  description: 'Get a data-backed report on your startup idea\'s potential, competition, and execution roadmap.',
};

export default async function VybexDNAPage() {
  const statsRes = await getDNAStats();

  return (
    <VybexDNAClient 
      initialStats={statsRes.stats} 
      initialTestimonials={statsRes.testimonials} 
    />
  );
}
