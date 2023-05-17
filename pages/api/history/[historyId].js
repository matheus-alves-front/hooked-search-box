import clientPromise from "lib/mongodb";

export default async (req, res) => {
    if (req.method === 'DELETE') {
        const query = req.query
        
        const {historyId} = query

        console.log(historyId)
        
        try {
            const client = await clientPromise;
            const db = client.db("matheus").collection("search_history");
            await db.deleteOne({ _id: historyId });

            return res.status(200).json({
                message: `history with id ${historyId} deleted`
            })
        } catch(err) {
            console.log(err)
        }

        // console.log(id)
        // do the call to remove the history mongodb here
    }
};