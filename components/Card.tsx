import Image from "next/image";
import { Post } from "../types";

type Props = {
  post: Post;
};

import React from "react";
import Link from "next/link";

const Card: React.FC<Props> = ({ post }) => {
  return (
    <div className="card">
      <Image
        src={post.frontmatter.cover_image}
        alt={post.frontmatter.title}
        width={300}
        height={200}
        layout="responsive"
      />
      <div className="post-date">{post.frontmatter.date}</div>
      <h3>{post.frontmatter.title}</h3>
      <Link href={`/blog/${post.slug}`}>
        <a className="btn">자세히 읽기</a>
      </Link>
    </div>
  );
};

export default Card;
