import Head from "next/head";
import clientPromise from "lib/mongodb";
import SearchBox from "components/SearchBox";
import ProductsList from "components/ProductsList";
import { parseSearchString } from "utils";
import { useState } from "react";

export async function getServerSideProps(context) {
  try {
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

    if (searchStr?.length > 0) {
      await db
        .collection("search_history")
        .updateOne(
          { searchStr: searchStr },
          { $set: { searchStr: searchStr } },
          { upsert: true }
        );

      const targetRes = await fetch(
        `https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&channel=WEB&count=24&default_purchasability_filter=true&include_sponsored=true&keyword=` +
          parseSearchString(searchStr) +
          `&offset=0&page=%2Fs%2F` +
          parseSearchString(searchStr) +
          `&platform=desktop&pricing_store_id=1771&scheduled_delivery_store_id=1771&store_ids=1771%2C1768%2C1113%2C3374%2C1792&visitor_id=018801CBD4D302018DD899CC8B9F2211&zip=52404`
      );
      const targetData = await targetRes.json();
      products = targetData.data.search.products.slice(0, 9).map((product) => {
        return {
          name: product.item.product_description.title,
          image: {
            src: product.item.enrichment.images.primary_image_url,
            alt: "product image",
          },
          link: product.item.enrichment.buy_url,
        };
      });
    }

    history = await db
      .collection("search_history")
      .find({})
      .sort({ metacritic: -1 })
      .toArray();

    return {
      props: {
        history: JSON.parse(JSON.stringify(history)),
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { Error: e },
    };
  }
}

export default function Home({ history, products }) {
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
      <ProductsList products={products} />
    </div>
  );
}
