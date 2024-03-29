import type { AppProps } from 'next/app'
import '../styles/base.scss'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )

}

export default MyApp
