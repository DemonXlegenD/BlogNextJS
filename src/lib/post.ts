import path from "path";
import fs from "fs"
import matter from "gray-matter";
import { Post, PostMeta, PostSlugParams } from "@/types/post";
import { bundleMDX } from "mdx-bundler"
import rehypePrism from "rehype-prism-plus";
const postsDirectory = path.join(process.cwd(), 'content');

export const getSortedPostsData = (): PostMeta[] => {
    const fileNames = fs
        .readdirSync(postsDirectory)
        .filter((f) => f.includes(".mdx"));


    const allPostsData: PostMeta[] = fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...(matterResult.data as Omit<PostMeta, "id">),
        }
    });
    return allPostsData;
}

export const getPostsSlugs = (): PostSlugParams[] => getSortedPostsData().map((p) => ({
    params: {
        slug: p.id,
    },
}));

export const getPostBySlug = async (slug: string): Promise<Post> => {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { code, frontmatter } = await bundleMDX({
        source: fileContents,
        mdxOptions(options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? [])];
            options.rehypePlugins = [
                ...(options.remarkPlugins ?? []),
                rehypePrism,
            ];
            return options;
        }
    });

    return {
        id: slug,
        code,
        frontmatter: frontmatter as PostMeta,
    }
}