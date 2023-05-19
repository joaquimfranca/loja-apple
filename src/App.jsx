import "../src/styles/app.css";
import { CartProvider } from "../src/Context/context";
import Header from "./layout/Header";
import Card from "../src/components/card";
import Bag from "../src/components/bag";

export default function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Card />
        <Bag />
      </div>
    </CartProvider>
  );
}



