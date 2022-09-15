import React, { useState } from "react"
import { useSession } from "next-auth/react"
import Avatar from "./Avatar"
import {
  PhotoIcon,
  LinkIcon,
} from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import {
  ADD_POST,
  ADD_SUBREDDIT,
} from "../graphql/mutations"
import client from "../apollo-client"
import {
  GET_SUBREDDIT_LIST_BY_TOPIC,
  GET_ALL_POST,
} from "../graphql/queries"
import { toast } from "react-hot-toast"

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

function PostBox() {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POST, "getPostList"],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const [imageBoxOpen, setImageBoxOpen] =
    useState<boolean>(false)

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmt = handleSubmit(async (formData) => {
    console.log(formData)
    const notification = toast.loading(
      "Creating new post..."
    )

    try {
      //Query for subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_LIST_BY_TOPIC,
        variables: {
          topic: formData?.subreddit,
        },
      })

      const subredditExist =
        getSubredditListByTopic.length > 0

      if (!subredditExist) {
        //Create subreddit

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        const image = formData.postImage || ""

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
      } else {
        //Use existing subreddit
        const image = formData.postImage || ""

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
      }

      //After the post is added
      setValue("postBody", "")
      setValue("postTitle", "")
      setValue("postImage", "")
      setValue("subreddit", "")

      toast.success("New Post Created!", {
        id: notification,
      })
    } catch (error) {
      toast.error("Something went wrong")
    }
  })

  return (
    <form
      onSubmit={onSubmt}
      className="sticky top-20 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="bg-white rounded-50 flex-1 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? "Create a post by entering a title!"
              : "Sign in to post"
          }
        />

        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300 cursor-pointer" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center p-2">
            <p className="min-w-[90px]">Body:</p>

            <input
              {...register("postBody")}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          <div className="flex items-center p-2">
            <p className="min-w-[90px]">Subreddit:</p>

            <input
              {...register("subreddit", { required: true })}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              type="text"
              placeholder="i.e. reactjs"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center p-2">
              <p className="min-w-[90px]">Image URL:</p>

              <input
                {...register("postImage")}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="optional"
              />
            </div>
          )}

          {/* Erros */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- A Post Title is required!</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>- A Subreddit is required!</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default PostBox
