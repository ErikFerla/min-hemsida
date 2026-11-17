import Link from 'next/link';

/**
 * Tydlig länk från en guide (urval/planering) till navsidan som är den kompletta katalogen
 * för samma ämne – så att guiden och navsidan inte konkurrerar om samma sökning.
 */
export default function HubLink({ text, href, label }: { text: string; href: string; label: string }) {
  return (
    <aside
      aria-label="Hela katalogen"
      style={{
        background: 'white',
        border: '1px solid #ede5da',
        borderLeft: '4px solid #993335',
        borderRadius: '12px',
        padding: '16px 20px',
        margin: '0 0 40px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p style={{ margin: 0, color: '#374151', fontSize: '0.95rem', lineHeight: 1.6, flex: '1 1 280px' }}>{text}</p>
      <Link href={href} style={{ color: '#993335', fontWeight: 700, fontSize: '0.95rem' }}>
        {label} <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
