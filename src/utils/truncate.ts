// utils/truncate.ts
export type TruncateOptions = {
  ellipsis?: string; // default: "…"
  byWords?: boolean; // true = batasi jumlah kata, false = jumlah karakter
  preserveGraphemes?: boolean; // aman untuk emoji/aksara kombinasi (default: true)
  trim?: boolean; // trim spasi di ujung sebelum menambah ellipsis (default: true)
};

const defaultOpts: Required<TruncateOptions> = {
  ellipsis: "…",
  byWords: false,
  preserveGraphemes: true,
  trim: true,
};

/**
 * Membatasi string dengan rapi.
 * - byWords=false  => limit = jumlah karakter (grapheme-safe)
 * - byWords=true   => limit = jumlah kata (dipisah whitespace)
 */
export function truncate(
  input: string,
  limit: number,
  opts: TruncateOptions = {}
): string {
  const { ellipsis, byWords, preserveGraphemes, trim } = {
    ...defaultOpts,
    ...opts,
  };

  if (limit <= 0 || !input) return "";

  // Batasi berdasarkan kata
  if (byWords) {
    // Split kata memakai regex whitespace berurutan sebagai pemisah
    const words = input.trim().split(/\s+/);
    if (words.length <= limit) return input;
    const out = words.slice(0, limit).join(" ");
    return trim ? out.trimEnd() + ellipsis : out + ellipsis;
  }

  // Batasi berdasarkan karakter/grapheme
  // Jika ingin aman emoji/aksara kombinasi, gunakan Intl.Segmenter bila ada
  if (preserveGraphemes && typeof (Intl as any)?.Segmenter === "function") {
    const seg = new (Intl as any).Segmenter(undefined, {
      granularity: "grapheme",
    });
    const graphemes: string[] = [];
    for (const { segment } of seg.segment(input)) {
      graphemes.push(segment);
      if (graphemes.length > limit) break;
    }
    if (graphemes.length <= limit) return input;
    const out = graphemes.slice(0, limit).join("");
    return trim ? out.trimEnd() + ellipsis : out + ellipsis;
  } else {
    // Fallback: potong biasa (bisa memotong surrogate pair, tapi cepat)
    if (input.length <= limit) return input;
    const out = input.slice(0, limit);
    return trim ? out.trimEnd() + ellipsis : out + ellipsis;
  }
}
