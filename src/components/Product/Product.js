import React, {useReducer} from 'react';
import './Product.css';

const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}
function getTotal(total) {
    return total.toLocaleString(undefined,currencyOptions);
}
const products = [
    {
        emoji: '🍦',
        name: 'ice cream',
        price: 5
    },
    {
        emoji: '🍩',
        name: 'donuts',
        price: 2.5
    },
    {
        emoji: '🍉',
        name: 'watermelon',
        price: 4
    }
];
function cartReducer(state, action) {
    // return [...state, product];
    switch(action.type) {
        case 'add':
            return [...state, action.name];
        case 'remove':
            const update = [...state];
            update.splice(update.indexOf(action.name), 1);
            return update;
        default: 
         return state;
    }
}
function totalReducer(state, action) {
    //  return state + price;
    if(action.type == 'add') {
        return state + action.price;
    }
    return state - action.price;
}
export default function Product() {
    // const [cart, setCart] = useState([]);
    // const [total, setTotal] = useState(0);
    const [cart, setCart] = useReducer(cartReducer, []);
    const [total, setTotal] = useReducer(totalReducer, 0);
    //const [total, setTotal] = useState(0);
    // function add(product) {
    //     setCart(current => [...current,product.name]);
    //     setTotal(current => current + product.price);
    // }
    function add(product) {
        const {name, price} = product;
        setCart({name, type: 'add'});
        setTotal({price, type:'add'});
    }
    function remove(product) {
        const {name, price} = product;
        setCart({name, type: 'remove'});
        setTotal({price, type: 'remove'});
    }

    const showCart = () => {
        console.log(cart);
    }
    return (
        <div className="wrapper">
            <div>
                Shopping Cart: {cart.length} total items.
            </div>
            <div> Total: {getTotal(total)}</div>
            <div>
                {
                    products.map(item => (
                        <div key={item.name}>
                            <div className="product">
                                <span role="img" aria-label="{item.name}">{item.emoji}</span>
                            </div>
                     
                            <button onClick={() => add(item)}>Add</button>
                            <button onClick={() => remove(item)}>Remove</button>
                        </div>
                    ))
                  
                }
                <button onClick= {() => showCart()}>Show cart items</button>
            </div>
        </div>
    )
}