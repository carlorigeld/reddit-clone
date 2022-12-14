import type { NextPage } from "next"
import Head from "next/head"
import Feed from "../components/Feed"
import PostBox from "../components/PostBox"

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      {/* Post Box */}
      <PostBox />

      <div className="flex">
        <Feed />
      </div>
    </div>
  )
}

export default Home
