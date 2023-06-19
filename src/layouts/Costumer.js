import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import NavbarCostumer from '../components/Navbars/NavbarCostumer'

import LandingPage from '../views/costumer/LandingPage'
import DetailPage from '../views/costumer/DetailPage'
import WhislistPage from '../views/costumer/Whislist'
import HistoryOrder from '../views/costumer/HistoryOrder'
import ChatCustomer from '../views/costumer/ChatCustomer'
import DetailChatsCostumer from '../views/costumer/DetailChatsCostumer'
import ChartOrders from '../views/costumer/ChartOrders'

export default function Costumer() {
  return (
    <>
        <NavbarCostumer fixed/>
        <section className='header relative pb-24 pt-16 items-center flex h-screen max-h-860-px'>
            <div className='max-w-[1400px] h-[780px] w-full m-auto py-10 px-4 relative group'>
                <Switch>
                    <Route path="/costumer/list" exact component={LandingPage} />
                    <Route path="/costumer/whislist" exact component={WhislistPage} />
                    <Route path="/costumer/history" exact component={HistoryOrder} />
                    <Route path="/costumer/list-chats" exact component={ChatCustomer}/>
                    <Route path="/costumer/chart-orders" exact component={ChartOrders}/>
                    <Route path="/costumer/list-chats/detail" exact component={DetailChatsCostumer}/>
                    <Route path="/costumer/list/:id_vendor/detail-list" exact component={DetailPage} />
                    <Redirect from="/costumer" to="/costumer/list" />
                </Switch>
            </div>
        </section>
    </>
  )
}
