import { lazy, Suspense } from 'react'
import { useFindCategoryClient } from '@/hooks/ClientCustomHooks'
import LoadingScreen from '@/components/loading/LoadingScreen'
const LazyHeroSection = lazy(() => import('./HeroSection'))
const CategoryCarousal = lazy(() => import('./CarousalForCategory'))
const QuoteForService = lazy(() => import('./QuoteForService'))
function Home() {

  const findCategory = useFindCategoryClient()

  const categories = findCategory.data?.categories

  return (
    <div className='bg-black  w-full overflow-x-hidden '>
      <Suspense fallback={<LoadingScreen />}>
        <LazyHeroSection />
        {categories && <CategoryCarousal items={categories} />}
        <QuoteForService />
      </Suspense>
    </div>
  )
}

export default Home

