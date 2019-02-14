import mongoose from 'mongoose';

export function dropCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    return Promise.all(
    	collections.map((name) => (
	    	new Promise((resolve, reject) => {
		        mongoose.connection.collections[name].drop((err) => {
		        	if (err && err.message != 'ns not found') {
		        		reject(err);
		        	}
		        	resolve();
		        })
	    	})
	    ))
    );
};