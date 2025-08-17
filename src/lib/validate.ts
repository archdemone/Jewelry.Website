import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(1).default('General'),
  message: z.string().min(10, 'Message too short').max(5000, 'Message too long'),
});

export type Contact = z.infer<typeof ContactSchema>;

export async function parseFormData(request: Request): Promise<Record<string, unknown>> {
  const form = await request.formData();
  const obj: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    obj[key] = typeof value === 'string' ? value : String(value);
  }
  return obj;
}

export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const res = schema.safeParse(data);
  if (!res.success) {
    const first = res.error.issues[0];
    throw new Error(first?.message || 'Invalid input');
  }
  return res.data;
}
