export type Post = {
  slug: string;
  frontmatter: {
    cover_image: string;
    date: string;
    title: string;
  };
  content: string;
};
