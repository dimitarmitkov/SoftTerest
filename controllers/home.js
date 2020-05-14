import extend from "../utils/context.js"

export default {
    get:{
        home(context){
            //***
            extend(context).then(function (){
                this.partial("./views/home/home.hbs");
            });
        }
    }
}
            //*** replaced with extend function, comes form context.js
            // context.loadPartials({
            //     header:"./views/common/header.hbs",
            //     footer:"./views/common/footer.hbs"
            // }).then(function () {...
