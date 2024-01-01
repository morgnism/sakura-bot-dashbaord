export const bigintSerializer = (key: string, value: any) =>
  typeof value === 'bigint' ? value.toString() : value;
