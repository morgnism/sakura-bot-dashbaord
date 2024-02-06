import { Slot } from '@radix-ui/react-slot';
import { cn, withRef } from '@udecode/cn';
import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-zinc-950 focus-visible:ring-zinc-300',
  {
    variants: {
      variant: {
        default: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-50/90',
        destructive: 'bg-red-900 text-zinc-50 hover:bg-red-900/90',
        outline:
          'border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:text-zinc-50',
        secondary: 'bg-zinc-800 text-zinc-50 hover:bg-zinc-800/80',
        ghost: 'hover:bg-zinc-800 hover:text-zinc-50',
        link: 'underline-offset-4 hover:underline text-zinc-50',
        inlineLink: 'text-base underline underline-offset-4 text-zinc-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-8 rounded-md px-3',
        sm: 'h-9 rounded-md px-3',
        sms: 'h-9 w-9 rounded-md px-0',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        none: '',
      },
      isMenu: {
        true: 'h-auto w-full cursor-pointer justify-start',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = withRef<
  'button',
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }
>(({ className, isMenu, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ isMenu, variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
