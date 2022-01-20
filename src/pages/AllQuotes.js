import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/use-http'
import { useEffect } from 'react'
import { getAllQuotes } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'
const AllQuotes = () => {
  
    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);
    useEffect(() => {
        sendRequest()
    }, [sendRequest]);
    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }
    if (status === 'error') {
        return (
            <p className='centered focused'>
                {error}
            </p>
        )
    }
    if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return <NoQuotesFound />
    }
    return (
        <>
            <h1> All Quotes Page</h1>
            <QuoteList quotes={loadedQuotes} />

        </>

    )

}

export default AllQuotes