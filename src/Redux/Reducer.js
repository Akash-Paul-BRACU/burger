import * as actionTypes from "./ActionType"

const INGREDIENT_PRICES = {
    salad: 20,
    meat : 80,
    cheese:30,
}
const INITIAL_STATE = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },
        ],
        order: [],
        orderLoading: true,
        orderErr: false,
        totalPrice: 20,
        purchaseable:false,
        token: null,
        userId:null
}
    

export const reducer = (state=INITIAL_STATE, action ) =>{
    const ingredients = [...state.ingredients];
        switch(action.type){
            case actionTypes.ADD_INGREDIENT:
        for(let item of ingredients){
            if(item.type === action.payload){
                item.amount ++;
            }
        }
        return{
            ...state,
            ingredients:ingredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
        }

        case actionTypes.REMOVE_INGREDIENT:
        for(let item of ingredients){
            if(item.type ===action.payload){
                if(item.amount <=0) return state;
                item.amount --;
            }
        }
        return{
            ...state,
            ingredients:ingredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
        }


        case actionTypes.UPDATE_PURCHASEABLE:
                const sum = state.ingredients.reduce((sum, element) => {
                    return sum + element.amount;
                },0)
                return{
                    ...state,
                    purchaseable: sum> 0
                }
            
        case actionTypes.RESET_INGREDIENTS:
        return{
            ...state,
            ingredients: [
                { type: 'salad', amount: 0 },
                { type: 'cheese', amount: 0 },
                { type: 'meat', amount: 0 },
            ],
            
            totalPrice: 20,
            purchaseable:false
        }

        case actionTypes.LOAD_ORDERS:
            let orders =[]
            for(let key in action.payload){
                orders.push({
                    ...action.payload[key],
                    id:key
                })
            }
            console.log(orders);
            return{
                ...state,
                orders:orders,
                orderLoading:false,
                
            }
            case actionTypes.ORDER_LOAD_FAILED:
                return {
                    ...state,
                    orderErr:true,
                    orderLoading:false,
                }

            case actionTypes.AUTH_SUCCESS:
                return{
                    ...state,
                    token: action.payload.token,
                    userId: action.payload.userId,
                }

            default: return state;
        }
}
