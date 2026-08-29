import LogoMark from './LogoMark'

function LogoBlack({ className = '', alt = 'Norda Logo' }) {
  return <LogoMark className={`text-black ${className}`} title={alt} />
}

export default LogoBlack
