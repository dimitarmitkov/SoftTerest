import models from "../models/index_model.js"
import extend from "../utils/context.js"

export default {
    get: {
        login(context) {
            //***
            extend(context).then(function () {
                this.partial("./views/user/login.hbs");
            })
        },
        register(context) {
            //***
            extend(context).then(function () {
                this.partial("./views/user/register.hbs");
            })
        },
        logout(context) {
            models.user.logout().then((response) => {
                context.redirect("#/");
            })
        },
        profile(context){
            extend(context).then(function () {
                this.partial("./views/user/user_id.hbs");
            })
        },
    },
    post: {
        login(context) {
            const {username, password} = context.params;

            models.user.login(username, password)
                .then((response) => {
                    //connection between user.js data and header.hbs variables and if/else check for login
                    context.user = response;
                    context.username = response.email;
                    context.isLoggedIn = true;

                    document.getElementById("successBox").style.display = "block";
                    setTimeout(function(){
                        document.getElementById("successBox").style.display = "none"
                    }, 2000);
                    context.redirect("#/cause/dashboard");
                })
                .catch((e) => console.error(e))
        },
        register(context) {
            const {username, password, repeatPassword} = context.params;
            //these username and password comes form register.hbs and they are name fields in <input>
            if (password !== repeatPassword) {
                document.getElementById("errorBox").style.display = "block";
                setTimeout(function(){
                    document.getElementById("errorBox").style.display = "none"
                }, 2000);
            } else {
                models.user.register(username, password)
                    .then((response) => {
                        context.redirect("#/user/login");
                    })
                    .catch((e) => console.error(e))
            }
        },
    }
};

//*** replaced with extend function, comes form context.js
// context.loadPartials({
// header: "./views/common/header.hbs",
// footer: "./views/common/footer.hbs"