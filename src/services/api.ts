const defaultHeaders = {
  'Content-Type': 'application/json',
};

const baseUrl = 'https://recruitment-test.flip.id';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const get = async <T>(
  endpoint: string,
  headers: Record<string, string> = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {...defaultHeaders, ...headers},
  });
  return handleResponse<T>(response);
};

export const post = async <T>(
  endpoint: string,
  data: unknown,
  headers: Record<string, string> = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {...defaultHeaders, ...headers},
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
};

export const put = async <T>(
  endpoint: string,
  data: unknown,
  headers: Record<string, string> = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'PUT',
    headers: {...defaultHeaders, ...headers},
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
};

export const deleteRequest = async <T>(
  endpoint: string,
  headers: Record<string, string> = {},
): Promise<T> => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'DELETE',
    headers: {...defaultHeaders, ...headers},
  });
  return handleResponse<T>(response);
};
