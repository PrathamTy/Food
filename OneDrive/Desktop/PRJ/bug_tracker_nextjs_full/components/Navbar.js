import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Navbar(){
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = ()=>{
    logout();
    router.push('/');
  }

  return (
    <nav style={{display:'flex', justifyContent:'space-between', padding:'10px', background:'#0070f3', color:'#fff'}}>
      <span>Bug Tracker</span>
      {user && <span>{user.username} | <button onClick={handleLogout}>Logout</button></span>}
    </nav>
  )
}