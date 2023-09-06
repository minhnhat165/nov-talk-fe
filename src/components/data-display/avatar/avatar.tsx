import Image, { ImageProps } from 'next/image';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const avatarVariants = cva('overflow-hidden relative', {
  variants: {
    size: {
      sm: 'w-9 h-9',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});

export interface AvatarProps
  extends ImageProps,
    VariantProps<typeof avatarVariants> {}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size, alt, shape, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(avatarVariants({ size, shape }), className)}>
        <Image
          fill
          alt={alt}
          {...props}
          sizes="(max-width: 640px) 100px, 200px"
          className="object-cover"
        />
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
