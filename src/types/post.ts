export type PostMeta = {
    id: string,
    title: string;
    description: string;
    author: string;
}

export type Post = {
    id: string,
    code: string,
    frontmatter: PostMeta,
}

export type PostSlugParams = {
    params: {
        slug: string;
    }
}