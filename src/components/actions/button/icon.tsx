import { Children, cloneElement, isValidElement } from 'react';

import { IconVariants } from './variants';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export interface IconProps extends VariantProps<typeof IconVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Icon = ({ children, type, className, size }: IconProps) => {
  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: cn(IconVariants({ type, size }), className),
          } as React.HTMLProps<HTMLElement>);
        }
        return child;
      })}
    </>
  );
};
