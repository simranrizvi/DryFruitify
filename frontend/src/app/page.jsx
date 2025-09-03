import React from 'react'
import HeroSection from './components/HeroSection';
import TopProduct from './components/TopProduct';
import Paraller from './components/Paraller';
import ImageSection from './components/ImageSection';
import OurTeam from './components/OurTeam';
import PremiumQuality from './components/PremiumQuality';
import Shipment from './components/Shipment';

const page = () => {
  return (
  
    <div>
      <HeroSection/>
      <TopProduct/>
      <Paraller/>
      <ImageSection/>
      <OurTeam/>
      {/* <PremiumQuality/> */}
      <Shipment/>
    </div>

  )
}

export default page