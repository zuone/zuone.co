export default function Step({ children, title }) {
  return (
    <div className="mb-6 list-none">
      <div className="flex items-center mb-2 text-green-700 dark:text-green-300">
        <span className="sr-only">Check</span>
        <svg className="h-4 w-4 mr-3" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </g>
        </svg>
        <div className="font-medium text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">{title}</div>
      </div>
      <div className="text-gray-700 dark:text-gray-400 ml-7">{children}</div>
    </div>
  );
}
