import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { InitializeUser } from "src/components/InitializeUser";
import { PostForm } from "src/components/PostForm";
import { useBlog } from "src/context/Blog";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
  const history = useHistory();
  const [connecting, setConnecting] = useState(false);
  const { connected, select } = useWallet();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const {
    user,
    initialized,
    initUser,
    showModalUser,
    setShowModalUser,
    showModalPost,
    setShowModalPost,
    createPost,
    posts,
    sendFriendRequest,
    acceptFriendRequest,
    searchUserByNameAndKey,
  } = useBlog();

  const onConnect = () => {
    setConnecting(true);
    select(PhantomWalletName);
  };

  useEffect(() => {
    if (user) {
      setConnecting(false);
    }
  }, [user]);

  const handleSearch = async () => {
    const results = await searchUserByNameAndKey(searchQuery);
    setSearchResults(results);
    setShowSearchModal(true);
  };
  console.log("results", searchResults);

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14 shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink">
              LinkedIn
            </div>
          </h2>

          <div className="search-section">
            <div className="flex">
              <input
                type="search"
                className="bg-purple-white shadow rounded border-0 p-3 mr-2 text-pink-600"
                placeholder="Search for users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
          {connected ? (
            <div className="flex items-center">
              <p className="font-bold text-sm ml-2 capitalize underlinepink">
                Home
              </p>
              <p className="font-bold text-sm ml-2 capitalize mr-4 underlinepink">
                Blog
              </p>
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200"
              />
              <p
                className="font-bold text-sm ml-2 capitalize"
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
      <main className="dashboard-main pb-4 container flex relative">
        <div className="pt-3">
          <div className="row">
            <article className="best-post">
              <div
                className="best-post-image"
                style={{
                  backgroundImage: `url("https://user-images.githubusercontent.com/62637513/184338364-a14b7272-d1dc-49f3-9f43-3ac37dacbe85.png")`,
                }}
              ></div>
              <div className="best-post-content">
                <div className="best-post-content-cat">
                  December 2, 2021<span className="dot"> </span>Blog
                </div>
                <div className="best-post-content-title">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
                <div className="best-post-content-sub">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </div>
            </article>

            <div className="all__posts">
              {posts.map((item) => (
                <article
                  className="post__card-2"
                  onClick={() => {
                    history.push(`/read-post/${item.publicKey.toString()}`);
                  }}
                  key={item.account.id}
                >
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
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className={`modal ${showModalUser && "show-modal"}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setShowModalUser(false)}
            >
              ×
            </span>
            <InitializeUser
              userName={userName}
              userAvatar={userAvatar}
              setUserName={setUserName}
              setUserAvatar={setUserAvatar}
              onSubmit={() => initUser(userName, userAvatar)}
            />
          </div>
        </div>
        <div className={`modal ${showModalPost && "show-modal"}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setShowModalPost(false)}
            >
              ×
            </span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postTitle, postContent)}
            />
          </div>
        </div>
        <div className={`modal ${showSearchModal && "show-modal"}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setShowSearchModal(false)}
            >
              ×
            </span>
            <div className="search-results">
              {searchResults.map((result) => (
                <div
                  key={result.publicKey.toString()}
                  className="each flex rounded shadow w-max text-pink-600 mb-5 bg-white search-result"
                >
                  <div className="sec self-center p-2 pr-1">
                    <img
                      data="picture"
                      className="h-10 w-10 border p-0.5 rounded-full"
                      src={result.account.avatar}
                      alt=""
                    />
                  </div>
                  <div className="sec self-center p-2 w-48">
                    <div className="flex">
                      <div className="name text-sm">{result.account.name}</div>
                    </div>
                    <div className="title text-xs text-gray-400 -mt-1">
                      {result.account.publicKey}
                    </div>
                  </div>
                  <div className="sec self-center p-2">
                    <Button onClick={() => sendFriendRequest(result.publicKey)}>
                      <img
                        src="https://img.icons8.com/external-justicon-lineal-justicon/32/external-add-friend-notifications-justicon-lineal-justicon.png"
                        alt="add friend"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
