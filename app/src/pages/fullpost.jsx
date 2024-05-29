import { AnchorProvider, Program } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "src/context/functions/getPostById";
import idl from "src/idl.json";

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}
function formatTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export const FullPost = () => {
  const { id } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    try {
      if (provider) {
        const getPost = async () => {
          const program = getProgram(provider);
          const post = await getPostById(id.toString(), program);
          setPost(post);
        };
        getPost();
      }
    } catch { }
  }, [provider]);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);

  return (
    <article className="hentry background-color">
      <div className="featured-image">
        <img
          src={post?.image}
          alt=""
        />
      </div>
      <h1 className="entry-title">{post?.title}</h1>
      <div className="entry-meta">
        <p>
          <span className="author">
            Written by <a href="#">{post?.author}</a>
          </span>{" "}
          <span className="date">
            {post?.createdAt ? formatTimestamp(post.createdAt.toString()) : 'Invalid date'}
          </span>
        </p>
      </div>
      <div className="entry-content">
        <p>{post?.content}</p>
      </div>
    </article>
  );
};
