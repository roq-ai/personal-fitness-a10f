const mapping: Record<string, string> = {
  clients: 'client',
  'credit-transactions': 'credit_transaction',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
