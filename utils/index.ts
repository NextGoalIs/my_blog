import { Post } from "../types";

export const sortByDate = (a: Post, b: Post): number => {
  return (
    Number(b.frontmatter.date.replaceAll("-", "")) -
    Number(a.frontmatter.date.replaceAll("-", ""))
  );
};
