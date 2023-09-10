import { ReactQueryProvider } from '@/providers/react-query-provider';

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  return <ReactQueryProvider>{props.children}</ReactQueryProvider>;
};
