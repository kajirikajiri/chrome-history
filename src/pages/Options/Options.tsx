import React, { useEffect } from 'react';
import { Tabs, Windows } from 'webextension-polyfill-ts';
import { IDataBase, Connection } from 'jsstore'
import workerInjector from "jsstore/dist/worker_injector";
import './Options.css';

interface Props {
  title: string;
}

type BrowserEvent = TabsOnUpdatedEvent | TabsOnCreatedEvent | TabsOnRemovedEvent | TabsOnActivatedEvent | TabsOnMovedEvent | TabsOnHighlightedEvent | TabsOnAttached | TabsOnDetached | TabsOnReplaced | TabsOnZoomChange | WindowsOnFocusChangedEvent | WindowsOnCreated | WindowsOnRemoved;

type TabsOnUpdatedEvent = {
  eventType: 'tabs.onUpdated',
  id: number;
  tab: Tabs.Tab
  tabId: number
  changeInfo: Tabs.OnUpdatedChangeInfoType
  createdAt: Date
}

type TabsOnCreatedEvent = {
  id: number;
  eventType: 'tabs.onCreated',
  tab: Tabs.Tab
  createdAt: Date
}

type TabsOnRemovedEvent = {
  id: number;
  eventType: 'tabs.onRemoved',
  tabId: number
  removeInfo: Tabs.OnRemovedRemoveInfoType
  createdAt: Date
}

type TabsOnActivatedEvent = {
  id: number;
  eventType: 'tabs.onActivated',
  activeInfo: Tabs.OnActivatedActiveInfoType
  createdAt: Date
}
type TabsOnMovedEvent = {
  id: number;
  eventType: 'tabs.onMoved',
  tabId: number,
  moveInfo: Tabs.OnMovedMoveInfoType
  createdAt: Date
}
type TabsOnHighlightedEvent = {
  id: number;
  eventType: 'tabs.onHighlighted',
  highlightInfo: Tabs.OnHighlightedHighlightInfoType
  createdAt: Date
}
type TabsOnAttached = {
  id: number;
  eventType: 'tabs.onAttached',
  tabId: number,
  attachInfo: Tabs.OnAttachedAttachInfoType,
  createdAt: Date,
}
type TabsOnDetached = {
  id: number;
  eventType: 'tabs.onDetached',
  tabId: number,
  detachInfo: Tabs.OnDetachedDetachInfoType,
  createdAt: Date,
}
type TabsOnReplaced = {
  id: number;
  eventType: 'tabs.onReplaced',
  addedTabId: number,
  removedTabId: number,
  createdAt: Date,
}
type TabsOnZoomChange = {
  id: number;
  eventType: 'tabs.onZoomChange',
  zoomChangeInfo: Tabs.OnZoomChangeZoomChangeInfoType,
  createdAt: Date,
}
type WindowsOnFocusChangedEvent = {
  id: number;
  eventType: 'windows.onFocusChanged',
  windowId: number
  createdAt: Date
}
type WindowsOnCreated = {
  id: number
  eventType: 'windows.onCreated'
  window: Windows.Window
  createdAt: Date
}
type WindowsOnRemoved = {
  id: number
  eventType: 'windows.onRemoved'
  windowId: number
  createdAt: Date
}


const connection = new Connection();
connection.addPlugin(workerInjector);

const Options: React.FC<Props> = ({ title }: Props) => {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState<BrowserEvent[]>([]);
  useEffect(() => {
    const dbName = 'JsStore_Demo';
    const database: IDataBase = {
      name: dbName,
      tables: []
    }
    connection.initDb(database).then(() => {
      connection.select({
        from: "BrowserEvent",
      }).then((result) => {
        console.log(result)
        setEvents(result as BrowserEvent[]);
        setLoading(false)
      })
    })
  }, [])
  if (loading) return <>Loading...</>;

  return <div>
    {events.map((event) => {
      return <div key={event.id}>{event.id}</div>
    })}
  </div>
};

export default Options;
