const Headline = ({
  children,
  level,
}: {
  children: React.ReactNode;
  level: number;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag>{children}</Tag>;
};

export default Headline;
