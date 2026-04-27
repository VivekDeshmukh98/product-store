import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const Navbar = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("Must be inside CartProvider")
  const { cart } = context

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Store</Link>
        
        <Link to="/cart" className="relative">
          🛒 Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}