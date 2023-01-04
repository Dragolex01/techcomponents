function Filter({ categories, setCategoryFilter, setPriceFilter, priceFilter }) {

  const {
    minPrice,
    maxPrice
  } = priceFilter

  function handleCategory(value, checked) {
    if (checked) {
      setCategoryFilter(pre => [...pre, value])
    } else {
      setCategoryFilter(pre => {
        return [...pre.filter(cat => cat !== value)]
      })
    }
  }

  function handlePrice(name, value){
    setPriceFilter({...priceFilter, [name]: value})
  }


  return (
    <div className="seccionLista__contTienda__contFiltros">
      <form className="seccionLista__contTienda__contFiltros__form">
        {
          categories && categories.map((category) => {
            if (category.sub_categories.length === 0) {
              return (
                <ul key={category.name}>
                  <li key={category.id}>
                    <input type="checkbox" name="category_id" value={category.id.toString()} onChange={(e) => handleCategory(e.target.value, e.target.checked)} />
                    <label>{category.name}</label>
                  </li>
                </ul>
              );
            } else {
              return (
                <ul key={category.name}>
                  <h3>{category.name}</h3>
                  {
                    category.sub_categories.map((sub_category) => {
                      return (
                        <li key={sub_category.id}>
                          <input type="checkbox" name="category_id" value={sub_category.id.toString()} onChange={(e) => handleCategory(e.target.value, e.target.checked)} />
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
        <ul>
          <h3>Precio</h3>
          <li className="seccionLista__contTienda__contFiltros__form--price">
            <span>{minPrice}€ - {maxPrice}€</span>
            <label>Mínimo: </label>
            <input type="range" defaultValue="0" min="0" max={maxPrice} step="50" name="minPrice" onChange={(e) => handlePrice(e.target.name, e.target.value)} />
            <label>Maximo: </label>
            <input type="range" defaultValue="2000" min={minPrice} max="2000" step="50" name="maxPrice" onChange={(e) => handlePrice(e.target.name, e.target.value)} />
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Filter;