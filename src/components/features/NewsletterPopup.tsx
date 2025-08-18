'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Gift, Sparkles, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export type NewsletterPopupProps = {
  initialDelayMs?: number;
  exitIntentEnabled?: boolean;
  abVariant?: 'A' | 'B';
};

export default function NewsletterPopup({
  initialDelayMs = 1000,
  exitIntentEnabled = true,
  abVariant = 'A',
}: NewsletterPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    // Check if we should show the popup (every hour, but only if not subscribed)
    const checkAndShowPopup = () => {
      try {
        const isSubscribed = localStorage.getItem('newsletter_subscribed');
        const lastShown = localStorage.getItem('newsletter_popup_last_shown');
        const now = Date.now();
        
        // Only show if user hasn't subscribed AND (never shown before or it's been more than 1 hour)
        if (!isSubscribed && (!lastShown || (now - parseInt(lastShown)) > 3600000)) {
          if (!hasShownRef.current) {
            setOpen(true);
            hasShownRef.current = true;
            localStorage.setItem('newsletter_popup_last_shown', now.toString());
          }
        }
      } catch {}
    };

    // Initial delay
    const timer = setTimeout(() => {
      checkAndShowPopup();
    }, initialDelayMs);

    // Exit intent handler
    function onExit(e: MouseEvent) {
      if (!exitIntentEnabled) return;
      const isSubscribed = localStorage.getItem('newsletter_subscribed');
      if (e.clientY <= 0 && !hasShownRef.current && !isSubscribed) {
        setOpen(true);
        hasShownRef.current = true;
        localStorage.setItem('newsletter_popup_last_shown', Date.now().toString());
      }
    }

    document.addEventListener('mouseleave', onExit);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onExit);
    };
  }, [initialDelayMs, exitIntentEnabled]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      // Mark user as subscribed so popup won't show again
      localStorage.setItem('newsletter_subscribed', 'true');
      toast.success('Welcome to our community!');
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        setEmail('');
      }, 2000);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 newsletter-popup">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Join Our Artisan Community
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Be the first to see new designs and get 10% off your first purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Subscribing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Subscribe & Get 10% Off
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Maybe Later
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Gift className="h-4 w-4 text-primary" />
                  <span>10% off first purchase</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Exclusive updates</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome to Our Community!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check your email for your exclusive 10% discount code.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
