import { NavLink } from "react-router-dom"

export default function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      
      <p>Go to the <NavLink to="/">Homepage</NavLink>.</p>
    </div>
  )
}