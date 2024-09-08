const LoadingScreen = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-t-4 border-blue-600  border-t-white animate-spin"></div>
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-t-4 border-blue-600 border-opacity-20 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-300 text-lg">Cargando...</p>
        </div>
      </div>
    );
  };
  
  export default LoadingScreen;
  