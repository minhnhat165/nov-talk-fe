import { ReactQueryProvider } from '@/providers/react-query-provider';
import SocketProvider from './socket-provider';

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  return (
    <ReactQueryProvider>
      <SocketProvider />
      {props.children}
    </ReactQueryProvider>
  );
};
