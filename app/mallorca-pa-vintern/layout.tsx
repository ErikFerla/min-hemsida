import PraktiskLayout, { praktiskMetadata } from '@/app/praktiskt/_shared/PraktiskLayout';

export const metadata = praktiskMetadata('vinter');

export default function VinterLayout({ children }: { children: React.ReactNode }) {
  return <PraktiskLayout sida="vinter">{children}</PraktiskLayout>;
}
