import PraktiskLayout, { praktiskMetadata } from '@/app/praktiskt/_shared/PraktiskLayout';

export const metadata = praktiskMetadata('vandring');

export default function VandringLayout({ children }: { children: React.ReactNode }) {
  return <PraktiskLayout sida="vandring">{children}</PraktiskLayout>;
}
