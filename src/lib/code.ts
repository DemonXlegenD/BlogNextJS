import { Editor, PostMeta } from "@/types/post";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "rehype-prism-plus";

export const getCode = async (fileContents : string) : Promise<Editor> => {

    const { code, frontmatter } = await bundleMDX({
      source: fileContents,
      mdxOptions(options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? [])];
        options.rehypePlugins = [...(options.remarkPlugins ?? []), rehypePrism];
        return options;
      },
    });
  
    return {
      code,
      frontmatter : frontmatter as PostMeta,
    }
  }