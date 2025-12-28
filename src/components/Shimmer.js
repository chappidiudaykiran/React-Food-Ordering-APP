const Shimmer = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-8">
                    <div className="h-10 bg-gray-200 animate-pulse w-96"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(20)].map((_, index) => (
                        <div key={index} className="bg-gray-100 border border-gray-300 rounded overflow-hidden">
                            <div className="h-44 bg-gray-200 animate-pulse"></div>
                            <div className="p-3 space-y-2">
                                <div className="h-4 bg-gray-200 animate-pulse"></div>
                                <div className="h-3 bg-gray-200 animate-pulse w-3/4"></div>
                                <div className="h-3 bg-gray-200 animate-pulse w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Shimmer;