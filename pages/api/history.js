import clientPromise from "lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("matheus");

       const searchStrings = await db
           .collection("search_history")
           .find({})
           .sort({ metacritic: -1 })
           .toArray();

       res.json(searchStrings);
   } catch (e) {
       console.error(e);
   }
};