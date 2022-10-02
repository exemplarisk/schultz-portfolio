import type { NextPage } from 'next'
import About from '../components/about/About';
import Nav from '../components/nav/Nav';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer';
import Contact from '../components/contact/Contact';
import Experience from '../components/experience/Experience';
import Portfolio from '../components/portfolio/Portfolio';
import Services from '../components/services/Services';
import Story from '../components/story/Story';
import Head from 'next/head';
import BuyMeACoffeeWidget from '../components/buymeacoffee/BuyMeACoffeeWidget';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="js icon" href="/jslogo.png" />
      </Head>
      <Header />
      <Nav />
      <About />
      <BuyMeACoffeeWidget />
      <Experience />
      <Services />
      <Portfolio />
      <Story />
      <Contact />
      <Footer />
    </>
  );
}

export default Home
