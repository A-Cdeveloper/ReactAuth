const Error = ({ error }: { error: string }) => {
  return (
    <p className=" text-red-600 text-center pt-1 text-sm">Error: {error}</p>
  );
};

export default Error;
