
type SDKResponse<T> = {
  code: number;
  meseeage: string;
  data: T | undefined;
};

export function safeGet<T>(
  res: SDKResponse<T>,
  defaultValue?: T
): T {
  if (res.code === 200 && res.data !== undefined) {
    return res.data;
  }

  return defaultValue as T;
}