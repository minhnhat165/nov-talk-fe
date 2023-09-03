import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ButtonIcon } from '@/components/actions/button/button-icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-90 transition-all focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground ',
        outline: 'border border-input hover:bg-accent',
        ghost: 'bg-transparent',
      },
      color: {
        default:
          'bg-gray-200 text-slate-800 enabled:hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:enabled:hover:bg-gray-800',
        primary: 'text-primary-foreground hover:bg-primary/90 bg-primary ',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-sm',
        md: 'h-10 px-5 text-base rounded-md',
        lg: 'h-12 px-6 text-lg rounded-lg',
      },
      shape: {
        circle: 'rounded-full',
        default: '',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        color: 'primary',
        className:
          'border-primary text-primary hover:bg-primary/5 hover:text-primary bg-transparent',
      },
      {
        variant: 'outline',
        color: 'default',
        className:
          'border bg-transparent text-slate-800  hover:bg-gray-700 dark:border dark:border-gray-600 dark:bg-transparent dark:text-gray-600 dark:hover:bg-gray-700',
      },
      {
        variant: 'ghost',
        color: 'default',
        className:
          'bg-transparent text-slate-800 hover:bg-slate-800/5 hover:text-slate-700 dark:bg-transparent dark:text-dark-100 dark:hover:!bg-gray-800/50 dark:hover:text-dark-50',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className:
          'text-primary bg-transparent hover:bg-primary/5 hover:text-primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'default',
      shape: 'default',
    },
  },
);

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = Omit<NativeButtonProps, keyof ButtonVariantsProps> &
  ButtonVariantsProps &
  IconProps & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      shape,
      asChild = false,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className, color, shape }),
        )}
        ref={ref}
        {...props}
      >
        {startIcon && (
          <ButtonIcon type="left" size={size}>
            {startIcon}
          </ButtonIcon>
        )}
        {children}
        {endIcon && <span className="-mr-1 ml-2 text-lg">{endIcon}</span>}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
