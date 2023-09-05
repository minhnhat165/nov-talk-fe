import { ButtonHTMLAttributes, forwardRef } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

export interface SearchInputProps
  extends ButtonHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  btnDisabled?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ btnDisabled, ...props }, ref) => {
    return (
      <div className="relative overflow-hidden rounded-lg bg-background">
        <div className="flex h-10">
          <div className="flex items-center bg-inherit">
            <SearchButton disabled={btnDisabled} />
            <div className="h-[65%] w-[1px] bg-text/50"></div>
          </div>
          <input
            ref={ref}
            type="text"
            className="border-0 bg-inherit p-2 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent"
            {...props}
          />
        </div>
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export interface SearchButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex aspect-square h-full items-center justify-center p-2 text-primary hover:bg-slate-300 disabled:text-text',
          className,
        )}
        {...props}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    );
  },
);

//  ({}) => {
//    return (
//      <div className="flex h-10 w-10 items-center">
//        <button className="dark:hover:bg-dark-600 flex h-10 w-10 cursor-pointer items-center justify-center hover:bg-slate-300">
//          <MagnifyingGlassIcon
//            className={cn(
//              'h-6 w-6 transition-all duration-500',
//              disabled
//                ? 'text-normal'
//                : 'text-primary-700 dark:text-primary-500',
//            )}
//          />
//        </button>
//        <div className="dark:bg-dark-400 h-[65%] w-[1px] bg-slate-400"></div>
//      </div>
//    );
//  };

SearchButton.displayName = 'SearchButton';
