import { postlogin, postRegister } from "../../api/Auth";
import Cookies from "js-cookie";
import { addressesInterface } from "../../interfaces/user-url-interface";

export class LoginServices {

    constructor(private email: string, private password: string) {
        this.email = email;
        this.password = password;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    async login() {
        return postlogin(this.email, this.password).then((res) => {
            if (res.token) Cookies.set("token", res.token, { expires: 1 });
            delete res.token;
            sessionStorage.setItem("user", JSON.stringify(res));
            window.location.href = "/";
            return res;
        }).catch((err) => {
            return err.response.data;
        });
    }

    async logout() {
        Cookies.remove("token");
        sessionStorage.removeItem("user");
        window.location.href = "/Auth/Login";
    }



    async register(firstName: string, lastName: string, addresses: addressesInterface[]) {
        return postRegister(this.email, this.password, firstName, lastName, addresses).then((res) => {
            return { response: res, error: null };
        }).catch((err) => {
            return { response: null, error: err };
        });
    }

}
