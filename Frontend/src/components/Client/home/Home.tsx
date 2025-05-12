import { lazy, Suspense, useEffect } from 'react'
import { useFindCategoryClient } from '@/hooks/ClientCustomHooks'
import LoadingScreen from '@/components/loading/LoadingScreen'
const LazyHeroSection = lazy(() => import('./HeroSection'))
const CategoryCarousal = lazy(() => import('./CarousalForCategory'))
const QuoteForService = lazy(() => import('./QuoteForService'))
// const VendorCarousal = lazy(() => import('./CarousalForVendorListing'))
function Home() {

  const findCategory = useFindCategoryClient()
  // const findVendor = useFindVendorForCarousal()

  const categories = findCategory.data?.categories
  // const vendors = findVendor.data?.vendors
  useEffect(() => {

  }, [])
  return (
    <div className='bg-black  w-full overflow-x-hidden'>
      <Suspense fallback={<LoadingScreen />}>
        {/* <BlackHero /> */}
        <LazyHeroSection />
        {categories && <CategoryCarousal items={categories} />}
        <QuoteForService />
        {/* <VendorCarousal vendors={vendors} /> */}
      </Suspense>
    </div>
  )
}

export default Home

