import React from "react"
import Avatar from "./Avatar"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline"
import TimeAgo from "react-timeago"

type PostProps = {
  post: Post
}

function Post({ post }: PostProps) {
  return (
    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
      {/* Votes */}
      <div className="flex flex-col items-center space-y-1 bg-gray-50 text-gray-400 p-4 rounded-l-md">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-xs font-bold text-black">0</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
      </div>

      <div className="p-3">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post?.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400">
            <span className="text-black font-bold hover:text-blue-400 hover:underline">
              r/{post?.subreddit[0]?.topic}
            </span>{" "}
            • Posted by u/{post?.username}{" "}
            <TimeAgo date={post?.created_at} />
          </p>
        </div>

        {/* Body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">
            {post?.title}
          </h2>
          <p className="mt-2 text-sm font-light">
            {post?.body}
          </p>
        </div>

        {/* Image */}
        <img className="w-full" src={post?.image} alt="" />

        {/* Footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
            <p>{post?.comments.length} Comments</p>
          </div>

          <div className="postButtons">
            <GiftIcon className="h-6 w-6" />
            <p> Comments</p>
          </div>

          <div className="postButtons">
            <ShareIcon className="h-6 w-6" />
            <p> Comments</p>
          </div>

          <div className="postButtons">
            <BookmarkIcon className="h-6 w-6" />
            <p> Comments</p>
          </div>

          <div className="postButtons">
            <EllipsisHorizontalIcon className="h-6 w-6" />
            <p> Comments</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
