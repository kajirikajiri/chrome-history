import { IDataBase, Connection, ITable } from 'jsstore'
import workerInjector from "jsstore/dist/worker_injector";
import { browser } from "webextension-polyfill-ts"

const connection = new Connection();

(async () => {
    connection.addPlugin(workerInjector);
    const dbName = 'JsStore_Demo';
    const tblEvent: ITable = {
        name: 'BrowserEvent',
        columns: {
            // notNull
            id: { primaryKey: true, autoIncrement: true },
            eventType: { notNull: true, dataType: "string" },
            createdAt: { notNull: true, dataType: "date_time" },

            // allow null
            tabId: { notNull: false, dataType: "number" },
            tab: { notNull: false, dataType: "object" },
            changeInfo: { notNull: false, dataType: "object" },
            removeInfo: { notNull: false, dataType: "object" },
            activeInfo: { notNull: false, dataType: "object" },
            moveInfo: { notNull: false, dataType: "object" },
            highlightInfo: { notNull: false, dataType: "object" },
            windowId: { notNull: false, dataType: "number" },
        }
    }
    const database: IDataBase = {
        name: dbName,
        tables: [tblEvent]
    }
    const isDbCreated = await connection.initDb(database);
    if (isDbCreated === true) {
        console.log("db created");
    } else {
        console.log("db opened");
    }
})();


browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const value = {
        eventType: 'tabs.onUpdated',
        tab,
        tabId,
        changeInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onCreated.addListener(function (tab) {
    const value = {
        eventType: 'tabs.onCreated',
        tab,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})


browser.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    const value = {
        eventType: 'tabs.onRemoved',
        tabId,
        removeInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onActivated.addListener(function (activeInfo) {
    const value = {
        eventType: 'tabs.onActivated',
        activeInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onMoved.addListener(function (tabId, moveInfo) {
    const value = {
        eventType: 'tabs.onMoved',
        tabId,
        moveInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onHighlighted.addListener(function (highlightInfo) {
    const value = {
        eventType: 'tabs.onHighlighted',
        highlightInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onAttached.addListener(function (tabId, attachInfo) {
    const value = {
        eventType: 'tabs.onAttached',
        tabId,
        attachInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onDetached.addListener(function (tabId, detachInfo) {
    const value = {
        eventType: 'tabs.onDetached',
        tabId,
        detachInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
    const value = {
        eventType: 'tabs.onReplaced',
        addedTabId,
        removedTabId,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.tabs.onZoomChange.addListener(function (zoomChangeInfo) {
    const value = {
        eventType: 'tabs.onZoomChange',
        zoomChangeInfo,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.windows.onFocusChanged.addListener(function (windowId) {
    const value = {
        eventType: 'windows.onFocusChanged',
        windowId,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
});

browser.windows.onCreated.addListener(function (window) {
    const value = {
        eventType: 'windows.onCreated',
        window,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})

browser.windows.onRemoved.addListener(function (windowId) {
    const value = {
        eventType: 'windows.onRemoved',
        windowId,
        createdAt: new Date(),
    }
    connection.insert({
        into: "BrowserEvent",
        values: [value]
    })
})