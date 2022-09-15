type Comment = {
  id: number
  post_id: number
  text: string
  username: string
}

type Subreddit = {
  id: number
  topic: string
}

type Vote = {
  id: number
  post_id: number
  upvote: boolean
  username: string
}

type Post = {
  created_at: string
  id: number
  image: string
  subreddit_id: number
  title: string
  username: string
  body: string
  comments: Comment[]
  subreddit: Subreddit[]
  votes: Vote[]
}
