import { IDataBase, Connection, ITable } from 'jsstore'
import workerInjector from "jsstore/dist/worker_injector";
import { browser } from "webextension-polyfill-ts"

// const getWorkerPath = () => {
//     // return dev build when env is development
//     console.log(process.env.NODE_ENV);
//     if (process.env.NODE_ENV === 'development') {
//         return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");
//     } else { // return prod build when env is production
//         return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");
//     }
// };


(async () => {
    // const workerPath = getWorkerPath().default;
    const connection = new Connection();
    connection.addPlugin(workerInjector);
    const dbName = 'JsStore_Demo';
    const tblProduct: ITable = {
        name: 'Product',
        columns: {
            // Here "Id" is name of column 
            id: { primaryKey: true, autoIncrement: true },
            itemName: { notNull: true, dataType: "string" },
            price: { notNull: true, dataType: "number" },
            quantity: { notNull: true, dataType: "number" }
        }
    };
    // const tblPage: ITable = {
    //     name: 'Page',
    //     columns: {
    //         id: { primaryKey: true, autoIncrement: true },
    //         url: { notNull: true, dataType: "string" },
    //         tabId: { notNull: true, dataType: "string" },
    //         openedAt: { notNull: true, dataType: "string" },
    //         closedAt: { notNull: true, dataType: "string" },
    //         domId: { notNull: true, dataType: "string" },
    //     }
    // }
    const database: IDataBase = {
        name: dbName,
        tables: [tblProduct]
    }
    const isDbCreated = await connection.initDb(database);
    if (isDbCreated === true) {
        console.log("db created");
    } else {
        console.log("db opened");
    }
    const value = {
        itemName: 'Blue Jeans',
        price: 2000,
        quantity: 1000
    }
    const insertCount = await connection.insert({
        into: 'Product',
        values: [value]
    });

    console.log(`${insertCount} rows inserted`);
    const results = await connection.select({
        from: 'Product',
        where: {
            id: 2
        }
    });
    console.log(results)
})();

browser.tabs.onUpdated.addListener(function (activeInfo) {
    console.log('updated', activeInfo)
})

browser.tabs.onCreated.addListener(function (activeInfo) {
    console.log('created', activeInfo)
})

browser.tabs.onRemoved.addListener(function (activeInfo) {
    console.log('removed', activeInfo)
})

browser.tabs.onActivated.addListener(async function (activeInfo) {
    console.log('activated', activeInfo)
    console.log("hello")
})

browser.tabs.onMoved.addListener(function (activeInfo) {
    console.log('moved', activeInfo)
})

browser.tabs.onHighlighted.addListener(function (activeInfo) {
    console.log('highlighted', activeInfo)
})
