import { Axios } from "../constant";

const signIn = (signInForm) => Axios.post("/login", signInForm);
const signUp = (signUpForm) => Axios.post("/signup", signUpForm);


export default{
    auth:{
        signIn,
        signUp
    }
}