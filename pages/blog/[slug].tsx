import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

import { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "../../types";
import Link from "next/link";
import Image from "next/image";

const PostPage: React.FC<Post> = ({
  frontmatter: { title, date, cover_image },
  content,
}) => {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">뒤로 가기</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">{date}</div>
        <Image
          src={cover_image}
          alt=""
          layout="responsive"
          width={0}
          height={0}
        />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((file) => {
    return {
      params: {
        slug: file.replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

type PathProps = {
  params: {
    slug: string;
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", context?.params?.slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
    },
  };
};

export default PostPage;
