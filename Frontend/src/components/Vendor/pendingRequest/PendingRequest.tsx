import { Button } from "@/components/ui/button"

function PendingRequest() {
    const handleLogOut=()=>{
        
    }
    return (
        <div className="w-screen h-screen z-50 absolute backdrop-blur-lg top-0 right-0 flex items-center justify-center">

            <div className="w-[90vw] md:w-1/2 md:h-1/2 flex rounded-2xl justify-center items-center border-2 border-black bg-gray-400">
                <div className="flex flex-col py-5 items-center gap-5">

                    <h1 className="text-2xl md:text-4xl">Account Activation Request</h1>
                    <p> YOUR REQUEST IS NOW ON PENDING</p>
                    <Button onClick={handleLogOut}>Log out</Button>
                </div>
            </div>
        </div>
    )
}

export default PendingRequest
