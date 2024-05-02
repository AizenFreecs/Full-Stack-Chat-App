import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className='flex flex-col items-center gap-2'>
        <RiErrorWarningFill size={200} />
        <h1 className="text-5xl">404</h1>
        <h2 className="text-3xl">Page Not Found</h2>
        <Link to={"/"} className="text-blue-500 text-md hover:text-blue-600 hover:scale-110">Go back to home . . .</Link>
     </div>
    </main>
  )
}

export default NotFound