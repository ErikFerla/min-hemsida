import PraktiskLayout, { praktiskMetadata } from '@/app/praktiskt/_shared/PraktiskLayout';

export const metadata = praktiskMetadata('budget');

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return <PraktiskLayout sida="budget">{children}</PraktiskLayout>;
}
