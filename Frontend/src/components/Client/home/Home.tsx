import { lazy, Suspense, useEffect } from 'react'
import Header from '../Header/Header'
import { useFindCategoryClient, useFindVendorForCarousal } from '@/hooks/ClientCustomHooks'
const LazyHeroSection = lazy(() => import('./HeroSection'))
const CategoryCarousal = lazy(() => import('./CarousalForCategory'))
const QuoteForService = lazy(() => import('./QuoteForService'))
const VendorCarousal = lazy(() => import('./CarousalForVendorListing'))
function Home() {

  const findCategory = useFindCategoryClient()
  const findVendor = useFindVendorForCarousal()

  const categories = findCategory.data?.categories
  const vendors = findVendor.data?.vendors
  console.log(vendors)
  useEffect(() => {

  }, [])
  return (
    <div className='bg-black  h-screen w-full'>
      <Header />
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <LazyHeroSection />
        {categories && <CategoryCarousal items={categories} />}
        <QuoteForService />
        <VendorCarousal vendors={vendors} />
      </Suspense>
    </div>
  )
}

export default Home

