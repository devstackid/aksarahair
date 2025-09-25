
const Logo = ({className, src, alt}) => {
  return (
    <div className={className}>
        <img src={src} className="w-full h-full object-cover" alt={alt} />
    </div>
  )
}

export default Logo