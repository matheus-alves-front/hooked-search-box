import Head from "next/head";
import { parseSearchString } from "../../utils";
import ProductsList from "components/ProductsList";
import clientPromise from "lib/mongodb";

export const getServerSideProps = async ({query}) => {
  const searchStr = query.searchStr

  const client = await clientPromise;
  const db = client.db("matheus");

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

  const products = targetData.data.search.products.slice(0, 9).map((product) => {
    return {
      name: product.item.product_description.title,
      image: {
        src: product.item.enrichment.images.primary_image_url,
        alt: "product image",
      },
      link: product.item.enrichment.buy_url,
    };
  });

  return {
    props: {
      searchStr,
      products
    }
  }
}

export default function ProductListPage({
  searchStr,
  products
}) {
  return (
    <>
      <Head>
        <title>Search: {String(searchStr)}</title>
      </Head>
      <section>
        <h1 className="text-center py-5">Search result for {searchStr} Products</h1>

        <ProductsList 
          products={products}
        />
      </section>
    </>
  )
}