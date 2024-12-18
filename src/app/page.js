import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={30}
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboards"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Manage API Keys
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16">
          <h1 className="text-4xl font-bold mb-6">Welcome to Your API Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
            Manage your API keys, monitor usage, and control access to your services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400">
                <li>Go to the API Keys dashboard</li>
                <li>Generate a new API key</li>
                <li>Use the key in your API requests</li>
                <li>Monitor your usage and set alerts</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Documentation</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn how to integrate our API into your applications.
              </p>
              <a
                href="https://nextjs.org/docs"
                className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation →
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t dark:border-gray-800 pt-8">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Terms</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Privacy</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Documentation</a>
            </div>
            <div>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
