import { Link } from "@inertiajs/react"
import clsx from "clsx"

const LinkHref = ({href, text}) => {
  return (
    <Link className={clsx("text-sm md:text-xs font-[Montreal-Medium] flex hover:opacity-70 transition text-black tracking-wide")} href={href}>
        {text}
    </Link>
  )
}

export default LinkHref