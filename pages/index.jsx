import Head from "next/head";
import clientPromise from "lib/mongodb";
import SearchBox from "components/SearchBox";
import ProductsList from "components/ProductsList";
import { parseSearchString } from "utils";
import { useState } from "react";

export async function getServerSideProps(context) {
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

  const searchStr = context.query.searchStr;

  const client = await clientPromise;
  const db = client.db("matheus");

  let history = [];
  let products = [];

  await db
    .collection("search_history")
    .updateOne(
      { searchStr: searchStr },
      { $set: { searchStr: searchStr } },
      { upsert: true }
    );

  history = await db
    .collection("search_history")
    .find({})
    .sort({ metacritic: -1 })
    .toArray();

  return {
    props: {
      history: JSON.parse(JSON.stringify(history)),
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default function Home({ history }) {
  const [searchHistory, setSearchHistory] = useState(history);

  const handleDeleteSearchTerm = (removeIndex) => {
    setSearchHistory(
      searchHistory.filter((item, index) => {
        if (index !== removeIndex) return item;
      })
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Next Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBox
        history={searchHistory}
        onDeleteSearchTerm={handleDeleteSearchTerm}
      />
    </div>
  );
}
