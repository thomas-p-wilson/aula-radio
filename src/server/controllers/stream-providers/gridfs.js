import mongodb from 'mongodb';
import mongoose from 'mongoose';

export default function gridfs(req, res, track) {
    const bucket = new mongodb.GridFSBucket(mongoose.connection, {
        bucketName: 'tracks'
    });

    const downloadStream = bucket.openDownloadStream(track._id);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
}
