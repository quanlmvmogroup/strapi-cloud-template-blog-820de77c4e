import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import postContentType from '@/lib/strapi/postContentType';

const FormSchema = z.object({
  full_name: z.string().min(2, { message: 'Full name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  phone: z.string().min(7, { message: 'Phone number is required' }),
  company: z.string().optional(),
});

export const EventRegistrationForm = ({
  open,
  onClose,
  documentId,
}: {
  open: boolean;
  onClose: () => void;
  documentId: string;
}) => {
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await postContentType('event-registrations', {
      ...data,
      event: documentId,
    });

    if (res?.data) {
      form.reset();
      onClose();
      toast.success('Registration successful!');
    } else {
      console.error('Failed to submit the form');
      toast.error('Registration failed. Please try again.');
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!bg-white max-w-lg">
        <DialogTitle>Registration form</DialogTitle>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button variant={'outline'} onClick={() => onClose()}>
                Cancel
              </Button>
              <Button className="!bg-green-600 !text-white" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
