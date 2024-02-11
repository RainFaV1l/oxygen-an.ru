import {createStore} from "vuex"
import {productModule} from "@/store/productModule"
import {cartModule} from "@/store/cartModule";
import {authModule} from "@/store/authModule";
import {profileModule} from "@/store/profileModule";
export default createStore({

    modules: {
        product: productModule,
        cart: cartModule,
        auth: authModule,
        profile: profileModule,
    },

})