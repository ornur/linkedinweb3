function formatTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
} 
  
export const PostCard = ({ item, user, history }) => {
  const { publicKey, account } = item;
  const { authority, image, title, createdAt} = account;

  if (authority?.toString() !== user.authority?.toString()) {
    return null;
  }

  const handleOnClick = () => {
    history.push(`/read-post/${publicKey?.toString()}`);
  };

  const imageUrl = image || "https://user-images.githubusercontent.com/62637513/184338364-a14b7272-d1dc-49f3-9f43-3ac37dacbe85.png";

  const dateCreated = formatTimestamp(createdAt);
  return (
    <article className="post__card-2" onClick={handleOnClick}>
      <div className="post__card_-2">
        <div className="post__card__image-2" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div>
          <div className="post__card_meta-2">
            <div className="post__card_cat">
              {dateCreated}<span className="dot"> </span>
              {title}{" "}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}