import useAuth from "@/hooks/useAuth";
 

export default function LoginPage() {
  const { handleLogin, handleLogOut, isLoggedIn } = useAuth();
 
  if(isLoggedIn) return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        action=""
        className="flex flex-col justify-center items-start border rounded-xl p-4 gap-4"
      >
        
        <button type="submit" onClick={handleLogOut}>
          로그아웃
        </button>
      </form>
    </div>
  )


  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        action=""
        className="flex flex-col justify-center items-start border rounded-xl p-4 gap-4"
      >
        <input type="text" placeholder="아이디" />
        <input type="text" placeholder="비밀번호" />
        <button type="submit" onClick={handleLogin}>
          로그인
        </button>
      </form>
    </div>
  );
}
