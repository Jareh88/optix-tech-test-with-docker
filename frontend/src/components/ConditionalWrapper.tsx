interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.JSX.Element;
  fallbackWrapper: (children: React.ReactNode) => React.JSX.Element;
  children: React.ReactNode;
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  fallbackWrapper,
  children,
}: ConditionalWrapperProps) =>
  condition ? wrapper(children) : fallbackWrapper(children);
