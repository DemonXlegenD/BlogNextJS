import { MDXComponent } from '@/app/components/mdx/MDXComponent';
import { getPostBySlug } from '@/lib/post'
import { PostSlugParams } from '@/types/post'
import Link from 'next/link';
import React from 'react'
import 'prismjs/themes/prism-dark.css';
import styles from "./post.slug.module.css"

export default async function PostPage({params} : PostSlugParams) {

  const post = await getPostBySlug(params.slug);
  console.log(post);
  return (
    <div className='flex flex-col items-center justify-between'>
      <Link href="/" className='block mt-1 text-pink-600 underline'>
      Home
      </Link>
      <h1 className='text-4xl text-center'>{post.frontmatter.title}</h1>
      <hr />
      <article className={`prose mt-4 bg-neutral-100 p-2 shadow ${styles["container"]}`}>
        <MDXComponent code={post.code}/>
      </article>
    </div>
  )
}

