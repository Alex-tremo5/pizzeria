import { createContext, useEffect, useState } from "react";

export const PizzeriaContext = createContext();

export const PizzeriaProvider = ({ children }) => {
    const [getPizzas, setGetPizzas] = useState([]);
    const [cart, setCart] = useState([]);

    async function allPizzas() {
        const rest = await fetch("/pizzas.json");
        const data = await rest.json();
        setGetPizzas(data);
    }

    const addToCart = ({ id, price, name, img }) => {
        const indexPizza = cart.findIndex(p => p.id == id)
        console.log(cart, 'cart')
        console.log(indexPizza, 'indexPizza')

        const product = { id, price, name, img, count: 1 }
        console.log(product, "productContext")

        if (indexPizza >= 0) {
            //El producto ya existe en el carrito, por lo tanto se incrementa la cantidad del mismo
            cart[indexPizza].count++
            setCart([...cart])
        } else {
            //El producto no existe, por lo tanto se agrega al carrito
            setCart([...cart, product])
            console.log(cart, 'cart')
        }
        console.log(cart)
    }

    const addItem = (indexPizza) => {
        console.log(indexPizza, "indexPizza - addItem")
        console.log(cart[indexPizza])

        cart[indexPizza].count++
        console.log(cart[indexPizza])
        setCart([...cart])
    }

    const removeItem = (indexPizza) => {
        console.log(indexPizza, "indexPizza - removeItem")
        console.log(cart[indexPizza])

        if (cart[indexPizza].count > 1) {
            cart[indexPizza].count--
        } else {
            cart.splice(indexPizza, 1);
        }

        console.log(cart[indexPizza])
        setCart([...cart])
    }

    useEffect(() => {
        allPizzas();
    }, [])

    return (
        <PizzeriaContext.Provider value={{ getPizzas, cart, setGetPizzas, addToCart, addItem, removeItem }}>
            {children}
        </PizzeriaContext.Provider>
    )
};
