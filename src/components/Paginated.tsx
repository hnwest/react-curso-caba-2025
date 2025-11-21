const Paginated = (params: {page:number}) => {
    const page = params.page || 1 ;
    return (
        <div className="mt-5 ">
          <ul className="flex justify-center list-none">
            <li className="mx-1">
              <button className="px-3 py-1 bg-yellow-300 rounded cursor-pointer">Anterior</button>
            </li>
            { page > 1 && (
            <li className="mx-1">
              <button className="px-3 py-1 bg-yellow-300 rounded cursor-pointer">{page - 1}</button>
            </li>
            )}
            <li className="mx-1">
              <button className="px-3 py-1 bg-yellow-500 text-white rounded font-bold">{page}</button>
            </li>
           
            <li className="mx-1">
              <button className="px-3 py-1 bg-yellow-300 rounded cursor-pointer">Siguiente</button>
            </li>
          </ul>
        </div>
    );
    }
export default Paginated;