type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Gemensam komponent för strukturerad data (schema.org JSON-LD).
 * Escapar "<" så att innehållet inte kan bryta ut ur <script>-taggen.
 */
export default function JsonLd({ data }: { data: JsonLdData }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
