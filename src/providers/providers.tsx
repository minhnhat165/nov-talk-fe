export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  return <div>{props.children}</div>;
};
