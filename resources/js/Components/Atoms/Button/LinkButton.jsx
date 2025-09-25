import { Link } from "@inertiajs/react"
import clsx from "clsx"

const LinkButton = ({className, href, children}) => {
  return (
    <Link className={clsx("py-2 bg-black px-5 text-white rounded items-center gap-2 transition text-xs tracking-wide font-[Montreal-Bold]", className)} href={href}>
        {children}
    </Link>
  )
}

export default LinkButton