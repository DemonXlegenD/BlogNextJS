import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Editor, Post, PostMeta, PostSlugParams } from "@/types/post";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "rehype-prism-plus";
const postsDirectory = path.join(process.cwd(), "public/content");

export const getSortedPostsData = (): PostMeta[] => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.includes(".mdx") || f.includes(".md"));

  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(mdx|md)$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as Omit<PostMeta, "id">),
    };
  });
  return allPostsData;
};

export const getPostsSlugs = (): PostSlugParams[] =>
  getSortedPostsData().map((p) => ({
    params: {
      slug: p.id,
    },
  }));

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fs = require("fs");
  const path = require("path");

  const fullPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  const fullPathMd = path.join(postsDirectory, `${slug}.md`);

  let fullPath;

  if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else if (fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  } else {
    throw new Error(`No file found for slug: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.remarkPlugins ?? []), rehypePrism];
      return options;
    },
  });

  return {
    id: slug,
    code,
    frontmatter: frontmatter as PostMeta,
  };
};