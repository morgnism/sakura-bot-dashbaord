export const getPathParts = (path: string) => path.split('/');

export const getBasePath = (path: string) => getPathParts(path)[1] ?? undefined;

export const hasChildPath = (path: string) => getPathParts(path).length > 2;
