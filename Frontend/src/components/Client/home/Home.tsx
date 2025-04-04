import { lazy, Suspense, useEffect } from 'react'
import Header from '../Header/Header'
import { useFindCategoryClient } from '@/hooks/ClientCustomHooks'
const LazyHeroSection = lazy(() => import('./HeroSection'))
const CategoryCarousal = lazy(() => import('./CarousalForCategory'))
function Home() {

  const findCategory = useFindCategoryClient()
  console.log(findCategory.data)
  const categories = findCategory.data?.categories
  useEffect(() => {

  }, [])
  return (
    <div className='bg-black  h-screen w-full'>
      <Header />
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <LazyHeroSection />
        {/* <h1>POPULAR CATEGEORIES</h1> */}
        {categories && <CategoryCarousal items={categories} />}
      </Suspense>
    </div>
  )
}

export default Home

