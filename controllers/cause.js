import extend from "../utils/context.js"
import models from "../models/index_model.js";
import docModifier from "../utils/doc_modifier.js";

export default {
    get: {
        dashboard(context) {

            models.cause.getAll().then((response) => {
                //response.docs is array of "docs" that contains all data loaded on firebase server
                //below, spread all data from response.docs (comes form firebase) and take all cause data including id (form firebase)
                const causes = response.docs.map(docModifier);
                // docModifier replaces => return {...d.data(), id: d.id}


                //below, spreads causes into cause.hbs as cause data
                context.causes = causes;
                extend(context).then(function () {
                    this.partial("./views/cause/dashboard.hbs")
                })
            });

        },
        create(context) {
            extend(context).then(function () {
                this.partial("./views/cause/create.hbs")
            })
        },
        details(context) {
            const {causeId} = context.params;
            models.cause.get(causeId).then((response) => {
                // console.log(response.data());

                const cause = docModifier(response);

                //below, spreads causes into cause.hbs as cause data => this is version with "cause.cause" case
                // context.cause = cause;

                //other version just with cause version:
                Object.keys(cause).forEach(key => {
                    context[key] = cause[key];
                    // console.log(context[key])
                });

                //canDonate - variable for donations
                //uId - cause creator
                //expression below - current user is not cause creator
                context.canDonate = cause.uid !== localStorage.getItem("userId");

                //below check if user is logged-in  + set header and footer
                extend(context).then(function () {
                    this.partial("./views/cause/details.hbs")
                })

            }).catch(e => console.error(e));
        },
        // likes(context) {
        //     console.log(context);
        // },

    },
    post: {
        create(context) {
            //below, gives data which user is created this cause
            const data = {
                ...context.params,
                uid: localStorage.getItem("userId"),
                likes: 0,
                donors: [],
            };

            models.cause.create(data).then((response) => {
                // console.log(response);
                context.redirect("#/cause/dashboard");
            }).catch((e) => console.error(e));

            //context is Object, but it is Sammy Object, not common JS Object
            //params is also not common JS Object, it is "kind of" Sammy Object
        }
    },
    del: {
        close(context) {
            let {causeId} = context.params;

            models.cause.close(causeId).then((response) => {
                context.redirect("#/cause/dashboard");
            })
        }
    },
    put: {
        donate(context) {

            const {causeId, newComment} = context.params;
            models.cause.get(causeId).then((response) => {
                const cause = docModifier(response);
                // cause.collectedFunds += Number(donateAmount);
                cause.donors.push(newComment);
                return models.cause.donate(causeId, cause)
            }).then((response) => {
                context.redirect(`#/cause/details/${causeId}`);
            })
        },
        like (context) {

            const {causeId} = context.params;
            models.cause.get(causeId).then((response) => {
                const cause = docModifier(response);
                cause.likes ++;
                // cause.donors.push(newComment);
                return models.cause.donate(causeId, cause)
            }).then((response) => {
                context.redirect(`#/cause/details/${causeId}`);
            })
        }
    }
};