export default function LoginTest() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Login Test Page</h1>
        <p className="text-gray-600 mb-4">This page is working!</p>
        <a 
          href="/admin/login" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Go to Login Page
        </a>
      </div>
    </div>
  )
} 