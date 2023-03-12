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
import PartyParticles from '../components/particles/PartyParticles';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="js icon" href="/jslogo.png" />
        <title>Jonatan Schultz</title>
        <meta name="description" content="Author: Jonatan Schultz"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="author" content="Jonatan Schultz"/>
        <meta name="keywords" content="author, development, portfolio, project"/>
        <meta name="language" content="en"/>
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
      <PartyParticles />
    </>
  );
}

export default Home
