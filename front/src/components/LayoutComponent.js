import Navigation from './NavigationComponent'
import { Outlet } from "react-router-dom";

export default function Layout(){
  return (
    <>
      <Navigation/>
      <Outlet/>
    </>
  )
}
