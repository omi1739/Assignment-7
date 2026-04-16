import Link from "next/link"


const notfound = () => {
  return (
    <div className="flex justify-center flex-col h-screen space-y-5 items-center">
      
      <h1 className="text-5xl text-center">404 not found !!</h1>
      <button className="btn btn-primary"> <Link href={"/"}>Back to Home</Link> </button>
      <p>If Back to Home button is not working,,, then Click the KeenKeeper logo</p>

    </div>
  )
}

export default notfound
