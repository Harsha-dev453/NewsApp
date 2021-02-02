import React, {useState, useEffect} from 'react';
import { NEWS_API_KEY } from "./config";
import NewsList from './newsList';
import SearchBar from "./searchBar";
import { Container, List } from "semantic-ui-react";


function mainPage() {
    const [articles, setArticles] = useState([]);
    const [apiError, setApiError] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function getArticles(){
            if(search.length == 0){
                setArticles([]);
                setLoading(true);
                console.log("fetching Uk news");
            try {
                const response = await fetch(
                  `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${NEWS_API_KEY}`
                );
                const json = await response.json();
                setLoading(false);
                setArticles(json.articles);
                console.log(json);
              } catch (error) {
                console.log(error);
                setLoading(false);
                setApiError(error);
              }
        }
    }
        getArticles();
    },[search])
    useEffect(()=>{
        async function getSearchArticles(){
            if(search.length > 0){
                setArticles([]);
                setLoading(true);
                console.log("fetching news with search value");
            try {
                const response = await fetch(
                  `https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
                );
                const json = await response.json();
                setLoading(false);
                setArticles(json.articles);
                console.log(json);
              } catch (error) {
                setLoading(false);
                console.log(error);
                setApiError(error);
              }
            }
        }
        getSearchArticles();
    },[search])
    return (
        <Container>
        <h1 style={{ textAlign: "center", margin: 20 }}>
            {search.length > 0 ? `Latest News on ${search}`:`Latest News of UK`}
        </h1>
        <SearchBar setSearch={setSearch} />
        {!loading && articles.length > 0 && <>    
        <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
        {articles.map(article =><NewsList article={article} />) } 
           </List>
           </>}
        {!loading && apiError && <p>Could not fetch any articles. Please try again.</p>}
        {loading && <p>{search.length > 0 ? `Fetching News Articles on ${search}`:`Fetching News Articles of UK`}</p>}
        </Container>
    )
}

export default mainPage
