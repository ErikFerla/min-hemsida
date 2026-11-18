import PraktiskLayout, { praktiskMetadata } from './_shared/PraktiskLayout';

export const metadata = praktiskMetadata('praktiskt');

export default function PraktisktLayout({ children }: { children: React.ReactNode }) {
  return <PraktiskLayout sida="praktiskt">{children}</PraktiskLayout>;
}
