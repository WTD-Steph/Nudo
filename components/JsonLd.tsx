/**
 * Emit one or more JSON-LD blobs as a single <script>. Pass an object or
 * an array of objects. Renders inside <head> via Next.js (or anywhere in
 * the tree — script type=application/ld+json is location-agnostic).
 */
type Props = { data: object | object[] };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
