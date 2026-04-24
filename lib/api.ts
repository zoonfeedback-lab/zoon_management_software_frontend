export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && typeof window !== "undefined") {
    // Optional: handle session expiry
    // localStorage.removeItem("access_token");
    // window.location.href = "/auth/login";
  }

  return response;
}

export const api = {
  get: (endpoint: string, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: "GET" }),
  
  post: (endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch(endpoint, { 
      ...options, 
      method: "POST", 
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  patch: (endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch(endpoint, { 
      ...options, 
      method: "PATCH", 
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  delete: (endpoint: string, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: "DELETE" }),
};
