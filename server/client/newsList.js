import React from 'react';
import { List, Grid, Header } from 'semantic-ui-react';

function newsList(props) {
    // return (
    //     <ul className="w3-ul w3-hoverable">
    //     {props.articles.map((article) => (
    //       <li key={article.title}><a href={article.url} target="_blank">{article.title}</a></li>
    //     ))}
    //   </ul>
    // )
    const { article } = props;
    return (
        <List.Item style={{ padding: 30 }}>
          <Grid>
            <Grid.Column
              width={11}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            ><a href={article.url} target="_blank">
              <Header as="h3">{article.title}</Header>
              <List.Description style={{ margin: "20px 0" }}>
                {article.description}
              </List.Description>
              <List bulleted horizontal>
                <List.Item>
                  {article.source.name}
                </List.Item>
                <List.Item>{article.publishedAt.split("T")[0]}</List.Item>
              </List>
              </a>
            </Grid.Column>
            <Grid.Column width={5}>
              <img class="ui medium bordered image" src={article.urlToImage}></img>
            </Grid.Column>
          </Grid>
        </List.Item>
      );
}

export default newsList;
