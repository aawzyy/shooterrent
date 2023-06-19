import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../views/auth/login";
import Register from "../views/auth/register";
import VerifyPass from "../views/auth/verify";


export default function Auth() {
    return (
        <>
            <main>
                <section className="relative w-full h-full py-20 min-h-screen">
                <div
                    className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                    style={{
                    backgroundImage:
                        "url(" + require("../assets/img/register_bg.png") + ")",
                    }}
                ></div>
                <Switch>
                    <Route path="/auth/login" exact component={Login} />
                    <Route path="/auth/register" exact component={Register} />
                    <Route path="/auth/forgot-password/check" exact component={VerifyPass} />
                    <Redirect from="/auth" to="/auth/login" />
                </Switch>
                {/* <FooterSmall absolute /> */}
                </section>
            </main>
        </>
    )
}