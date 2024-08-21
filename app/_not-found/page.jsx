const PageNotFound =()=>{
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-2xl text-gray-600 mt-4">Ruta no encontrada</p>
            <p className="text-gray-500 mt-2">La página que buscas ya no existe o no es válida.</p>
            <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              Regresar
            </a>
          </div>
        </div>
      );
}

export default PageNotFound;

