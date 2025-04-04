import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

function QuoteForService() {
    const ScrollReveal = lazy(() => import('../../../../addon/ScrollReveal/ScrollReveal'))
    const navigate = useNavigate()

    return (
        <div className='w-full h-[400px] bg-black flex items-center justify-center'>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex flex-col justify-center items-center">
                    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
                        <ScrollReveal
                            baseOpacity={0}
                            enableBlur={true}
                            baseRotation={5}
                            blurStrength={10}
                        >
                            Need a service for your special day
                            Transform your events into unforgettable experiences

                        </ScrollReveal>
                    </Suspense>
                    <button
                        onClick={() => navigate('/services')}
                        className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuoteForService
