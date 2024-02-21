"use client";
import { useMediaQuery } from "~/hooks";
function Home() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <div className="h-[1000px]">{isDesktop}</div>
  )
}

export default Home