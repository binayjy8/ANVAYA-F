export function getQueryValue(searchParams, key, fallback = "") {
  return searchParams.get(key) || fallback;
}

export function updateQueryParams(searchParams, updates) {
  const next = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  });

  return next;
}
