import type { Evenemang } from './data';

// Bygger en iCalendar-fil (RFC 5545) för ett heldagsevenemang. Inga externa tjänster –
// filerna förrenderas av route handlern i app/evenemang/kalender/[fil]/route.ts.

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

/** Viker rader till högst 75 oktetter (RFC 5545 3.1) utan att dela tecken. */
function fold(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let current = '';
  let bytes = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // fortsättningsrader börjar med ett mellanslag
    if (bytes + n > limit) {
      out.push(current);
      current = '';
      bytes = 0;
    }
    current += ch;
    bytes += n;
  }
  out.push(current);
  return out.join('\r\n ');
}

function datum(iso: string): string {
  return iso.replace(/-/g, '');
}

function dagenEfter(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function byggIcs(e: Evenemang, baseUrl: string): string {
  const beskrivning = [
    e.beskrivning,
    e.not,
    `Kontrollera datum och program hos arrangören: ${e.källa.href}`,
    `Från mymallorca.se – uppgifterna kontrollerades ${e.checked}.`,
  ]
    .filter(Boolean)
    .join('\n\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MyMallorca//Evenemang//SV',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.key}@mymallorca.se`,
    `DTSTAMP:${datum(e.checked)}T000000Z`,
    `DTSTART;VALUE=DATE:${datum(e.start)}`,
    `DTEND;VALUE=DATE:${datum(dagenEfter(e.slut))}`,
    `SUMMARY:${escapeText(e.namn)}`,
    `LOCATION:${escapeText(`${e.plats}, Mallorca`)}`,
    `DESCRIPTION:${escapeText(beskrivning)}`,
    `URL:${baseUrl}/evenemang`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}
