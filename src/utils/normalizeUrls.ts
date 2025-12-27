export function normalizeUrls(
  url: string | null | undefined
): string | undefined {
  if (!url || typeof url !== "string") {
    return undefined;
  }

  const cleanUrl = url.trim();
  if (cleanUrl === "") return undefined;

  if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
    return cleanUrl;
  }
  return `https://${cleanUrl}`;
}
