import { FC, ReactNode, useState } from "react";
import { Button } from "src/components/Button";
import { useBlog } from "src/context/Blog";

export const InitializeUser = (props) => {
  const { user } = useBlog();
  const {
    onSubmit,
    userName,
    userAvatar,
    setUserAvatar,
    setUserName,
    formHeader,
    buttonText = "Initialize",
  } = props;
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg py-4 px-6 bg- flex flex-col ">
      {formHeader}
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        placeholder="Your name"
        className="bg-white rounded-3xl h-10 px-4 black"
      />
      <textarea
        value={userAvatar}
        onChange={(e) => setUserAvatar(e.target.value)}
        type="text"
        placeholder="Avatar URL"
        className="bg-white rounded-xl px-4 py-2 mt-3 black"
      ></textarea>
      <Button
        className="mt-3"
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
