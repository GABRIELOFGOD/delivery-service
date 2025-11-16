import { Package } from "lucide-react";

const Header = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              // onClick={() => { setCurrentPage('home'); setTrackingInput(''); }}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Package className="w-8 h-8" />
              <span className="text-xl font-bold">GlobalExpress</span>
            </button>
          </div>
        </div>
      </nav>
  )
}
export default Header;