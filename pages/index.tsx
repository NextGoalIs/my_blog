import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

type Post = {
  slug: string;
  frontmatter: {
    cover_image: string;
    date: string;
    title: string;
  };
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>JK's 개발노트</title>
      </Head>
      <div className="posts">
        {posts.map((post: Post, index: number) => (
          <h3 key={index}>{post.frontmatter.title}</h3>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((file) => {
    const slug = file.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(path.join("posts", file), "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
