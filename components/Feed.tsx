import { useQuery } from "@apollo/client"
import React from "react"
import { GET_ALL_POST } from "../graphql/queries"
import Post from "./Post"

function Feed() {
  const { data } = useQuery(GET_ALL_POST)

  const posts: Post[] = data?.getPostList

  return (
    <div className="my-5 space-y-4">
      {posts?.map((p) => (
        <Post key={p?.id} post={p} />
      ))}
    </div>
  )
}

export default Feed
