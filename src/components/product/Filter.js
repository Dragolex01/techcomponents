function Filter({ categories, setCategoryFilter }){

    function handleCategory(value, checked){
        if(checked){
          setCategoryFilter(pre => [...pre, value])
        }else{
          setCategoryFilter(pre => {
            return [...pre.filter(cat => cat !== value)]
          })
        }
      }


    return(
        <div className="seccionLista__contTienda__contFiltros">
            <form className="seccionLista__contTienda__contFiltros__form">
              {
                categories && categories.map((category) => {
                  if (category.sub_categories.length === 0) {
                    return (
                      <ul key={category.name}>
                        <li key={category.id}>
                          <input type="checkbox" name="category_id" value={category.id.toString()} onChange={(e) => handleCategory(e.target.value, e.target.checked)}/>
                          <label>{category.name}</label>
                        </li>
                      </ul>
                    );
                  }else {
                    return(
                      <ul key={category.name}>
                        <h3>{category.name}</h3>
                        {
                          category.sub_categories.map((sub_category) => {
                            return(
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
                <div className="seccionLista__contTienda__contFiltros__form--price">
                  <li>
                    <input type="range" min="0" max="1000" list="listaPrecio"/>
                    <datalist id="listaPrecio">
                      <option value="0" label="0%" />
                      <option value="500" label="50%" />
                      <option value="1000" label="100%" />
                    </datalist>
                  </li>
                  {/* <li>
                    <input type="number" placeholder="€ Min" onChange={(e) => setFilterData({min_price: e.target.value})}/>
                  </li>
                  <li>
                    <input type="number" placeholder="€ Max" onChange={(e) => setFilterData({max_price: e.target.value})} />
                  </li> */}
                </div>
              </ul>
            </form>
          </div>
    )
}

export default Filter;