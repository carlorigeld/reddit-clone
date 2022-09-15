import { gql } from "@apollo/client"

export const GET_ALL_POST = gql`
  query GetAllPost {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      comments {
        id
        post_id
        text
        username
      }
      subreddit {
        id
        topic
      }
      votes {
        id
        post_id
        upvote
        username
      }
    }
  }
`

export const GET_SUBREDDIT_LIST_BY_TOPIC = gql`
  query GetSubredditListByTopic($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
