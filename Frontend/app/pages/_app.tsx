import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import customTheme from '../styles/theme'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider> 
  )
}

export default MyApp
