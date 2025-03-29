import React, { lazy, Suspense } from 'react'
import Header from '../Header/Header'
const LazyHeroSection = lazy(() => import('./HeroSection'))
function Home() {
  return (
    <div className='bg-black h-screen w-screen'>
      <Header />
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <LazyHeroSection />
      </Suspense>
    </div>
  )
}

export default Home

