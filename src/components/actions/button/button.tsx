import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  ButtonHTMLAttributes,
  Children,
  ReactElement,
  forwardRef,
} from 'react';
import { buttonVariants } from '@/components/actions/button/variants';
import { IconButton } from '@/components/actions/button/button.icon';
import { Icon } from '@/components/actions/button/icon';

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

export interface ButtonComponent
  extends React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  Icon: typeof IconButton;
}

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
        <>
          {startIcon && (
            <Icon type="left" size={size}>
              {startIcon}
            </Icon>
          )}
          {children}
          {endIcon && <Icon type="right">{endIcon}</Icon>}
        </>
      </Comp>
    );
  },
) as ButtonComponent;
Button.displayName = 'Button';

Button.Icon = IconButton;
