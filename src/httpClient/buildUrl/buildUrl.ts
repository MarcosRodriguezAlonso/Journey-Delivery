const buildUrl = (
  baseUrl: string,
  path: string,
  query?: Record<string, string>,
): string => {
  const url = new URL(`${baseUrl}${path}`);

  if (query) {
    const urlParams = new URLSearchParams(query);
    url.search = urlParams.toString();
  }

  return url.toString();
};

export default buildUrl;
