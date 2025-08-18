import { createHash } from 'node:crypto';

export function weakETag(payload: string): string {
  const hash = createHash('sha1').update(payload).digest('hex');
  return `W/"${hash}"`;
}
