import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { useBlog } from "src/context/Blog";
import { useHistory } from "react-router-dom";
import './profile.css';

export const Profile = () => {
  const history = useHistory();
  const [connecting, setConnecting] = useState(false);
  const { connected, select } = useWallet();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const { disconnect } = useWallet();

  const {
    user,
    initialized,
    setShowModalUser,
    setShowModalPost,
    posts,
    acceptFriendRequest,
  } = useBlog();

  const onConnect = () => {
    setConnecting(true);
    select(PhantomWalletName);
  };

  useEffect(() => {
    if (user) {
      setConnecting(false);
    } else {
      history.push("/");
    }
  }, [user]);
  return (  
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14 background-color shadow-md">
        <div className="flex justify-between items-center h-full container mx-auto px-6">
          <h2 className="text-2xl font-bold text-indigo-600">
            LinkedIn
          </h2>
          {connected ? (
            <div className="flex items-center">
              <p
                className=" font-bold text-sm ml-2 capitalize underlinepink"
                onClick={() => {
                  history.push(`/`);
                }}
              >
                Home
              </p>
              <p className=" font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 "
              />
              <p
                className=" font-bold text-sm ml-2 capitalize"
                onClick={() => {
                  history.push(`/profile`);
                }}
              >
                {user?.name}
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => setShowModalPost(true)}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => setShowModalUser(true)}
                >
                  Initialize User
                </Button>
              )}
            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container mx-auto px-6 flex relative mt-20">
        <div className="user-profile bg-purple shadow rounded">
          <div className="avatar w-24 h-24 rounded-full overflow-hidden mx-auto">
            <img src={user?.avatar} alt={`${user?.name}'s avatar`} className="w-full h-full object-cover" />
          </div>
          <div className="details mt-4 text-center">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">Your address <br />{user?.authority.toString()}</p>
            {//there disconnect button if user is connected
              connected ? (
                  <Button
                    onClick={() => {
                      disconnect();
                      history.push("/");
                    }}
                  >
                    Disconnect
                  </Button>
                ) : null}
              <p className="text-gray-600">Friends:<br />
              {user?.friends.map((friend, index) => (
                <div key={index}>{friend.toString()}</div>
              ))}
            </p>
          {// if friendRequests is empty, don't show the button and <p>
            user?.friendRequests.length > 0 ? (
              <div>
                <p>Friend Requests:</p>
                <div>
                    {user.friendRequests.toString()}
                    <Button
                      onClick={() => acceptFriendRequest(user.friendRequests)}
                      className="ml-2"
                    >
                      <img src="https://img.icons8.com/external-justicon-lineal-justicon/32/external-add-friend-notifications-justicon-lineal-justicon.png" alt="" />
                    </Button>
                </div>
              </div>
            ) : null}
            <div className="user-posts">
              <h3>User Posts</h3>
              {posts.map((item, index) => (
                <article
                  className="post__card-2"
                  onClick={() => {
                    history.push(`/read-post/${item.publicKey.toString()}`);
                  }}
                  key={index}
                >
                  {item.account.authority.toString() === user.authority.toString() ? (
                    <div className="post__card_-2">
                      <div
                        className="post__card__image-2"
                        style={{
                          backgroundImage: `url("https://user-images.githubusercontent.com/62637513/184338539-9cdbdc58-1e72-4c48-8203-0b7ec23d3eb0.png")`,
                        }}
                      ></div>
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat">
                            December 2, 2021<span className="dot"> </span>
                            {item.account.title}{" "}
                          </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    null
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
