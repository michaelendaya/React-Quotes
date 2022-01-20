import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getSingleQuote } from '../lib/api';
const QuoteDetail = () => {
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

    const params = useParams();

    const match = useRouteMatch();

    const { quoteId } = params

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    if (status === 'pending') {
        return <div className='centered'><LoadingSpinner></LoadingSpinner></div>
    }
    if (status === 'error') {
        return <div className='centered'>{error}</div>
    }
    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comment</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );

}

export default QuoteDetail