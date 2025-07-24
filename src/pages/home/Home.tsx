import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { About } from '@/components/about/About'
import { Destinations } from '@/components/destinations/Destinations'
import { ExperiencePackages } from '@/components/experience-packages/ExperiencePackages'
import { WhyChooseUs } from '@/components/wy-choose-us/WhyChooseUs'
import { Fleet } from '@/components/fleet/Fleet'
import { FAQ } from '@/components/faq/FAQ'
import { Footer } from '@/components/footer/Footer'

const Home = () => {
  return (
    <div>
        <Layout />
        <About />
        <Destinations />
        <ExperiencePackages />
        <WhyChooseUs />
        <Fleet />
        <FAQ />
        <Footer />
    </div>
  )
}

export default Home