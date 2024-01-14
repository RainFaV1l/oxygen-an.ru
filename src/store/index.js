import {createStore} from "vuex"
import {productModule} from "@/store/productModule"
import {cartModule} from "@/store/cartModule";
export default createStore({

    modules: {
        product: productModule,
        cart: cartModule,
    },

})