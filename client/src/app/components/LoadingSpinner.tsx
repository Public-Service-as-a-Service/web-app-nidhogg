import { Spinner } from "@sk-web-gui/react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;
