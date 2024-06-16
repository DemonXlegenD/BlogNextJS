import fs from "node:fs/promises";

import UploadForm from "../components/form/UploadForm";
import { getSortedPostsData } from "@/lib/post";
import { PostMeta } from "@/types/post";
import Link from "next/link";

export default async function Home() {
  const posts: PostMeta[] = getSortedPostsData();

  return (
    <main>
      <UploadForm />
      <h1 className="text-4xl text-center">Blog of Lahalle François</h1>
      <div>
        {posts.map(({ id, title, description }) => (
          <Link href={`/post/${id}`} key={id} className="my-4 block">
            <p className="text-xl font-bold">{title}</p>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
