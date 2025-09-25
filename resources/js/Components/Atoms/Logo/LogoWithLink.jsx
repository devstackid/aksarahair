import { Link } from "@inertiajs/react"

const LogoWithLink = ({className, src, alt, href, width}) => {
  return (
    <Link href={href} className={className}>
        <img src={src} alt={alt} width={width} />
    </Link>
  )
}

export default LogoWithLink