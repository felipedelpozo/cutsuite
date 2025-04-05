export const fetchCallback = ({
  setIsPending,
}: {
  setIsPending: (value: boolean) => void;
}) => {
  return {
    onRequest: () => {
      setIsPending(true);
    },
    onResponse: () => {
      setIsPending(false);
    },
  };
};
