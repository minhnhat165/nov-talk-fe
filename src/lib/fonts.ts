import localFont from 'next/font/local';

export const novFont = localFont({
  src: [
    {
      path: '../assets/fonts/nov-thin.otf',
      weight: '100',
    },
    {
      path: '../assets/fonts/nov-regular.otf',
      weight: '400',
    },

    {
      path: '../assets/fonts/nov-bold.otf',
      weight: '700',
    },
  ],
});
