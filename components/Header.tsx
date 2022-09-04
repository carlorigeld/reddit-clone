import Image from "next/image"
import React from "react"
import {
  ChevronDownIcon,
  HomeIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid"
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline"
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react"

function Header() {
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 z-50 flex px-4 py-2 shadow-sm items-center gap-x-4 bg-white">
      <div className="relative w-20 h-10 flex-shrink-0">
        <Image
          objectFit="contain"
          src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo-700x394.png"
          layout="fill"
        />
      </div>

      {/* Home */}
      <div className="flex items-center lg:min-w-[200px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search  */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      {/* Icons*/}
      <div className="hidden lg:inline-flex text-gray-500 space-x-2 items-center">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon className="icon" />
      </div>

      {/* Hamburger Menu */}
      <div className="flex items-center icon lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {/* Sign-in / Sign-out */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center cursor-pointer p-2 space-x-2 border border-gray-100"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
            />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">
              {session?.user?.name}
            </p>
            <p className="text-gray-400 whitespace-nowrap">
              1 Karma
            </p>
          </div>

          <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-gray-500" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center cursor-pointer p-2 space-x-2 border border-gray-100"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
            />
          </div>

          <p className="text-gray-400 whitespace-nowrap">
            Sign in
          </p>
        </div>
      )}
    </div>
  )
}

export default Header
