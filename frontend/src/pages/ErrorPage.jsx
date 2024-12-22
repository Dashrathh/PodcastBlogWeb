import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();

    let errorMessage;
    let errorStatus = 500;

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status;
        errorMessage = `${error.status} - ${error.statusText || error.message}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'Unknown error';
    }

    return (
        <div className="block w-full h-screen bg-gray-900 text-white overflow-hidden relative">
            {/* Background animations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 opacity-20 w-full h-full blur-2xl" />
                <div className="absolute w-40 h-40 bg-yellow-400 rounded-full top-10 left-10 animate-pulse opacity-30"></div>
                <div className="absolute w-60 h-60 bg-pink-500 rounded-full bottom-20 right-20 animate-pulse opacity-40"></div>
            </div>

            {/* Content */}
            <div className="flex w-full h-full items-center justify-center">
                <div className="text-center">
                    {/* Crazy Header */}
                    <h1
                        className="text-6xl font-extrabold tracking-wide mb-4"
                        style={{
                            background: 'linear-gradient(90deg, #ff7eb3, #ff758c)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {errorStatus === 404 ? '404 - Page Not Found' : '500 - Oops!'}
                    </h1>

                    {/* Subtext with a fun twist */}
                    <p className="text-xl font-light mb-8">
                        {errorStatus === 404
                            ? "It seems like you're lost in the matrix. Let's get you back!"
                            : `Something went wrong: ${errorMessage}`}
                    </p>

                    {/* Button */}
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 text-lg font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transform hover:scale-105 transition-all"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>

            {/* Floating "crazy" elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-4xl font-bold text-white opacity-10 select-none"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float-${i} ${Math.random() * 3 + 5}s infinite ease-in-out`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    >
                        {['404', '500', 'Error', 'Oops'][Math.floor(Math.random() * 4)]}
                    </div>
                ))}
            </div>

            <style>
                {`
                /* Floating animations */
                ${[...Array(10)]
                    .map(
                        (_, i) => `
                        @keyframes float-${i} {
                            0%, 100% {
                                transform: translateY(0px) rotate(${Math.random() * 10}deg);
                            }
                            50% {
                                transform: translateY(-20px) rotate(${Math.random() * -10}deg);
                            }
                        }`
                    )
                    .join('')}
                `}
            </style>
        </div>
    );
}
