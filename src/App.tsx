
import { Footer } from "./components/footer"
import { Guitarras } from "./components/guitarras"
import Header from "./components/header"
import useCart from "./hooks/useCart"



function App() {
  const {
    data,
    cart,
    addToCart,
    incrementGuitar,
    decrementGuitar,
    clearCart,
    removeGuitar,
    isEmpty,
    totalCart } = useCart()




  return (
    <>
      <Header cart={cart} removeGuitar={removeGuitar} incrementGuitar={incrementGuitar}
              decrementGuitar={decrementGuitar} clearCart={clearCart} isEmpty={isEmpty} totalCart={totalCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (

            <Guitarras key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
