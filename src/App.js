import {Route, Switch, Redirect} from 'react-router-dom'
import React from 'react';
import AllQuotes from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
import { Suspense } from 'react';
const NewQuote = React.lazy(()=>import('./pages/NewQuote'))
function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
    <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes'></Redirect>
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
        <QuoteDetail/>
      </Route>
      <Route path='/new-quote'>
        <NewQuote/>
      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
    </Switch>
    </Suspense>
    </Layout>
  );
}

export default App;
