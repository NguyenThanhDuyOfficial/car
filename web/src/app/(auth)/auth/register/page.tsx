
"use client"
import Header from "@/components/modules/auth/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function AuthPage(
) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, error } = useAuth()
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const result = await register({ email, password })
    if (result) {
      router.push("/")
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <Header />
      <main className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4  min-w-xs max-w-xs"
        >
          <div>
            <h2 className="text-2xl font-medium">Register to Car.</h2>
          </div>
          <div className="flex flex-col gap-2">
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              required
              type="email" placeholder="Email"
              className="p-4 rounded-lg border-zinc-300 border-2" />
            <div className="flex items-center justify-between pr-4 rounded-lg border-zinc-300 border-2">
              <input
                value={password} onChange={(e) => setPassword(e.target.value)}
                required
                name="password" type={showPassword ? "text" : "password"} placeholder="Password"
                className="p-4 w-full " />
              <Button variant="ghost" onClick={togglePasswordVisibility}>{showPassword ? <EyeIcon /> : <EyeOffIcon />}</Button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <Button className="w-full rounded-3xl p-4" type="submit" >
            Register
          </Button>
          <div className="w-full h-px bg-zinc-300"></div>
          <div className="flex justify-center">
            <p>Already a member?  <Link href="/auth/login" className="text-blue-400 hover:text-blue-500 hover:underline active:text-blue-600">Login Now</Link> </p>
          </div>
        </form >
      </main >
    </>
  )
}
