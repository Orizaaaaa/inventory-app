import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/api/auth";
import { loginSchema, type LoginFormData } from "@/sso/types/login";
import { Input } from "@/components/ui/forms/input";
import { InputPassword } from "@/components/ui/forms/input-password";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Package } from "lucide-react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "12345678",
    },
  });

  const { mutate: login, isPending: isLoading } = useLogin({
    redirectTo: "/dashboard",
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
          <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Masukkan email Anda"
                icon={Mail}
                required
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Password Input */}
            <div>
              <InputPassword
                label="Password"
                placeholder="Masukkan password Anda"
                required
                error={errors.password?.message}
                showForgotPassword={false}
                {...register("password")}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradien"
              className="w-full h-12 text-base font-semibold"
              disabled={isLoading}
              load={isLoading}
            >
              <Lock className="w-5 h-5" />
              Masuk
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Belum punya akun?{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Hubungi Admin
              </a>
            </p>
          </div>
        </div>

        {/* Info Card */}
            {/* <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-800 text-center">
                <strong>Demo Account:</strong> Email dan password sudah terisi untuk kemudahan testing
            </p>
            </div> */}
      </div>
    </div>
  );
}

