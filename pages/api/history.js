import clientPromise from "lib/mongodb";

export default async (req, res) => {
    if (req.method === 'POST') {
        const historyId = req.body
        
        // const {id} = historyId

        console.log(historyId)
        
        // try {
        //     const client = await clientPromise;
        //     const db = client.db("matheus").collection("search_history");
        //     await db.deleteOne({ _id: id });

        //     return res.status(200).json({
        //         message: `history with id ${id}`
        //     })
        // } catch(err) {
        //     console.log(err)
        // }

        // console.log(id)
        // do the call to remove the history mongodb here
    }

    if (req.method === 'GET') {
        try {
           const client = await clientPromise;
           const db = client.db("matheus");
    
           const searchStrings = await db
               .collection("search_history")
               .find({})
               .sort({ metacritic: -1 })
               .toArray();
    
           res.status(200).json(searchStrings);
       } catch (e) {
           console.error(e);
       }
    }
};