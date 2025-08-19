'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.enum(['General', 'Order', 'Custom Design', 'Wholesale', 'Other']),
  message: z.string().min(10, 'Please provide details'),
  file: z.any().optional(),
  hp: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { subject: 'General' } });

  async function onSubmit(values: FormValues) {
    if (values.hp) return; // honeypot
    setLoading(true);
    try {
      const body = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (k === 'file' && v && v instanceof FileList && v.length) body.append('file', v[0]);
        else if (typeof v === 'string') body.append(k, v);
      });
      const res = await fetch('/api/contact', { method: 'POST', body });
      if (!res.ok) throw new Error('Failed to send');
      toast.success('Message sent! We will get back within 24 hours.');
      reset();
    } catch (e) {
      toast.error('Could not send your message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-secondary">
          Name
        </label>
        <Input id="name" placeholder="Your name" {...register('name')} />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-secondary">
          Email
        </label>
        <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-secondary">
          Phone (optional)
        </label>
        <Input id="phone" placeholder="(555) 123-4567" {...register('phone')} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-secondary">
          Subject
        </label>
        <select id="subject" className="h-10 rounded-md border px-3" {...register('subject')}>
          <option>General</option>
          <option>Order</option>
          <option>Custom Design</option>
          <option>Wholesale</option>
          <option>Other</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-secondary">
          Message
        </label>
        <Textarea id="message" rows={6} placeholder="How can we help?" {...register('message')} />
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="file" className="text-sm font-medium text-secondary">
          Attachment (custom orders)
        </label>
        <input id="file" type="file" className="text-sm" {...register('file')} />
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register('hp')}
      />
      <input type="hidden" {...register('recaptchaToken')} />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
