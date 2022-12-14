import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Post } from "../types";
import Card from "../components/Card";
import { sortByDate } from "../utils";

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>{`JK\`s`} 개발노트</title>
      </Head>
      <div className="posts">
        {posts.map((post: Post, index: number) => (
          <Card key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((file): Post => {
    const slug = file.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(path.join("posts", file), "utf-8");

    const { data: frontmatter, content } = matter(markdownWithMeta);

    const { title, date, cover_image } = frontmatter;

    return {
      slug,
      frontmatter: {
        title,
        date,
        cover_image,
      },
      content,
    };
  });

  return {
    props: {
      posts: posts.sort((a: Post, b: Post) => sortByDate(a, b)),
    },
  };
};
