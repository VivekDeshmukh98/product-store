
// import { NavLink, useParams } from 'react-router-dom'

import { useParams } from "react-router-dom";

export const ProductDetail = () => {
    
const { id } = useParams();
    
  return (
    
    <div>Product Page {id}</div>
  )
}
