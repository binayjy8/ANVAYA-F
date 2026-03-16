export function buildLeadQuery(params) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.set(key, value);
  });

  return query.toString();
}

export function getFilterValue(searchParams, key, fallback = "") {
  return searchParams.get(key) || fallback;
}
