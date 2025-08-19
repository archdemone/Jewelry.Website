// Helper functions for handling JSON stored as strings in SQLite

/**
 * Safely parse JSON string, returning null if invalid
 */
export function parseJsonString<T = any>(jsonString: string | null | undefined): T | null {
  if (!jsonString) return null;

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Failed to parse JSON string:', error);
    return null;
  }
}

/**
 * Safely stringify object to JSON string
 */
export function stringifyJson<T = any>(obj: T | null | undefined): string | null {
  if (obj === null || obj === undefined) return null;

  try {
    return JSON.stringify(obj);
  } catch (error) {
    console.warn('Failed to stringify object:', error);
    return null;
  }
}

/**
 * Type-safe JSON parsing with default value
 */
export function parseJsonWithDefault<T>(jsonString: string | null | undefined, defaultValue: T): T {
  const parsed = parseJsonString<T>(jsonString);
  return parsed ?? defaultValue;
}

/**
 * Parse images array from JSON string
 */
export function parseImages(jsonString: string | null | undefined): string[] {
  return parseJsonWithDefault<string[]>(jsonString, []);
}

/**
 * Stringify images array to JSON string
 */
export function stringifyImages(images: string[] | null | undefined): string {
  return stringifyJson(images) || '[]';
}

/**
 * Parse metadata object from JSON string
 */
export function parseMetadata<T = Record<string, any>>(
  jsonString: string | null | undefined,
): T | null {
  return parseJsonString<T>(jsonString);
}

/**
 * Stringify metadata object to JSON string
 */
export function stringifyMetadata<T = Record<string, any>>(
  metadata: T | null | undefined,
): string | null {
  return stringifyJson(metadata);
}

/**
 * Parse address object from JSON string
 */
export function parseAddress(jsonString: string | null | undefined): {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
} | null {
  return parseJsonString(jsonString);
}

/**
 * Stringify address object to JSON string
 */
export function stringifyAddress(
  address:
    | {
        firstName: string;
        lastName: string;
        company?: string;
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone?: string;
      }
    | null
    | undefined,
): string | null {
  return stringifyJson(address);
}
