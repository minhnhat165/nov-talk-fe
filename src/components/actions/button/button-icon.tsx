import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonIconVariants = cva('inline-block', {
  variants: {
    type: {
      left: 'mr-2 -ml-1',
      right: 'ml-2',
      default: '',
    },
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
  defaultVariants: {
    type: 'default',
    size: 'md',
  },
});

export interface ButtonIconProps
  extends VariantProps<typeof buttonIconVariants> {
  children: React.ReactNode;
  className?: string;
}

export const ButtonIcon = ({
  children,
  type,
  className,
  size,
}: ButtonIconProps) => {
  const Comp = children;
  return (
    <span className={cn(buttonIconVariants({ type, size }), className)}>
      {children}
    </span>
  );
};
