import type { Metadata } from 'next';
import { B2BPage } from '../../src/views/B2BPage';

export const metadata: Metadata = {
  title: 'B2B & Bulk Supply | Raj Tandoor & Kitchen Equipment',
  description:
    'Volume pricing, custom fabrication, and dedicated account management for restaurant chains, hotel groups, cloud kitchens, and catering businesses across India.',
};

export default function Page() {
  return <B2BPage />;
}
