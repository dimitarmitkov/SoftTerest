import extend from "../utils/context.js"

export default {
    get:{
        success(context){
            //***
            extend(context).then(function (){
                this.partial("./notifications/success.hbs");
            });
        },
        loading (context){
            //***
            extend(context).then(function (){
                this.partial("./notifications/loading.hbs");
            });
        },
        error(context){
            //***
            extend(context).then(function (){
                this.partial("./notifications/error.hbs");
            });
        },
    }
}