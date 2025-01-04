const baseUrl = import.meta.env.VITE_API_URL;
async function fetchWrap<T>(endpoint: string, req: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}/${endpoint}`, {
    ...req,
    headers: {
      'Content-Type': 'application/json',
      ...req.headers,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  try {
    return response.json();
  } catch {
    return response.text() as unknown as T;
  }
}

export { fetchWrap };
