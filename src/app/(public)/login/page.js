import LoginForm from "@/components/LoginPage/LoginForm/LoginForm.jsx";
import SocialLoginButtons from "@/components/LoginPage/SocialLoginButtons/SocialLoginButtons.jsx";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-main-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <LoginForm />
        <SocialLoginButtons />
      </div>
    </div>
  )
}