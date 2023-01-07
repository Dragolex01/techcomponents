function Filter({ categories, setFilterData, filterData, setFiltered }) {

  const { min_price, max_price } = filterData;

  return (
    <div className="seccionLista__contTienda__contFiltros">
      <form className="seccionLista__contTienda__contFiltros__form">
        {
          categories && categories.map((category) => {
            if (category.sub_categories.length === 0) {
              return (
                <ul key={category.name}>
                  <li key={category.id}>
                    <input type="radio" name="category_id" value={category.id.toString()} onChange={(e) => {
                      setFilterData({ ...filterData, [e.target.name]: e.target.value})
                      setFiltered(true)
                    }} />
                    <label>{category.name}</label>
                  </li>
                </ul>
              );
            } else {
              return (
                <ul key={category.name}>
                  <h3>{category.name}</h3>
                  <li key={category.id}>
                    <input type="radio" name="category_id" value="0" onChange={(e) => {
                        setFilterData({ ...filterData, [e.target.name]: e.target.value})
                        setFiltered(true)
                      }} />
                    <label>Todos</label>
                  </li>
                  {
                    category.sub_categories.map((sub_category) => {
                      return (
                        <li key={sub_category.id}>
                          <input type="radio" name="category_id" value={sub_category.id.toString()} onChange={(e) => {
                              setFilterData({ ...filterData, [e.target.name]: e.target.value})
                              setFiltered(true)
                            }} />
                          <label>{sub_category.name}</label>
                        </li>
                      )
                    })
                  }
                </ul>
              )
            }
          })
        }
        <ul className="seccionLista__contTienda__contFiltros__form--price">
          <h3>Precio</h3>
          <span>{min_price}€ - {max_price}€</span>
          <li>
            <label>Mínimo: </label>
            <input type="range" defaultValue="0" min="0" max={max_price} step="50" name="min_price" onChange={(e) => {
              setFilterData({ ...filterData, [e.target.name]: e.target.value})
              setFiltered(true)
              }} />
          </li>
          <li>
            <label>Maximo: </label>
            <input type="range" defaultValue="2000" min={min_price} max="2000" step="50" name="max_price" onChange={(e) => {
              setFilterData({ ...filterData, [e.target.name]: e.target.value})
              setFiltered(true)
              }} />
          </li>
        </ul>
        <ul>
          <h3>Existencias</h3>
          <li>
            <input type="radio" id="filterAllStock" name="stock" value="all" onChange={(e) => {
              setFilterData({ ...filterData, [e.target.name]: e.target.value})
              setFiltered(true)
              }} />
            <label id="filterAllStock">Todo</label>
          </li>
          <li>
            <input type="radio" id="filterYesStock" name="stock" value="yes" onChange={(e) => {
              setFilterData({ ...filterData, [e.target.name]: e.target.value})
              setFiltered(true)
              }} />
            <label id="filterYesStock">En stock</label>
          </li>
          <li>
            <input type="radio" id="filterNoStock" name="stock" value="no" onChange={(e) => {
              setFilterData({ ...filterData, [e.target.name]: e.target.value})
              setFiltered(true)
              }}/>
            <label id="filterNoStock">Sin stock</label>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Filter;