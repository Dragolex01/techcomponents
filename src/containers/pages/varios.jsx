// const [sortList, setSortList] = useState({
//     sortKey: 'none',
//     isReverse: false
//   });
//   const {
//     sortKey,
//     isReverse
//   } = sortList;

//   const [filterData, setFilterData] = useState({
//     min_price: 100,
//     max_price: 1000
//   });
//   const {
//     min_price,
//     max_price
//   } = filterData;
  
  // const listProducts = filterProducts();

  // function filterProducts(){
  //   if(categoryFilter.length !== 0){
  //     return(
  //       products && sortProducts().filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())) && (categoryFilter.includes(product.category.toString())) && (product.price >= min_price && product.price <= max_price)).map((product, i) => {
  //         return (
  //           <div className="contProducto" key={product.id}> 
  //             <Card product={product} />
  //           </div>
  //         );
  //       })
  //     )
  //   }else{
  //     return(
  //       products && sortProducts().filter(product => (product.name.toLowerCase().includes(searchTerm.toLowerCase())) && (product.price >= min_price && product.price <= max_price)).map((product, i) => {
  //         return (
  //           <div className="contProducto" key={product.id}> 
  //             <Card product={product} />
  //           </div>
  //         );
  //       })
  //     )
  //   }
  // }

  // function sortProducts(){
  //   if(sortKey !== 'none'){
  //     return sortBy(products, sortKey, isReverse)
  //   }else{
  //     return products
  //   }
  // }

  // function handleSort(value){
  //   switch(value){
  //     case 'price_asc':
  //       setSortList({sortKey: 'price', isReverse: true})
  //       break;
  //     case 'price_des':
  //       setSortList({sortKey: 'price', isReverse: false})
  //       break;
  //     case 'name_asc':
  //       setSortList({sortKey: 'name', isReverse: false})
  //       break;
  //     case 'name_des':
  //       setSortList({sortKey: 'name', isReverse: true})
  //       break;
  //     default:
  //       setSortList({sortKey: 'none'})
  //       break;
  //   }
  // }