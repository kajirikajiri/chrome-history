import React, { useEffect } from 'react';
import { Tabs, Windows } from 'webextension-polyfill-ts';
import { IDataBase, Connection } from 'jsstore'
import workerInjector from "jsstore/dist/worker_injector";
import './Options.css';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';

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

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'windowId', headerName: 'windowId', width: 90 },
  { field: 'tabId', headerName: 'tabId', width: 90 },
  { field: 'eventType', headerName: 'イベントタイプ', width: 250 },
  {
    field: 'createdAt', headerName: 'createdAt', width: 200, valueFormatter: (params: GridValueFormatterParams<any>) => {
      const formatedDate = new Intl.DateTimeFormat("ja-jp", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(params.value);
      return formatedDate
    }
  },
]

// const browserEventsToRows = (events: BrowserEvent[]) => {
//   events.map(event => {
//     if (event.eventType === 'tabs.onActivated') {
//       return {
//         id: event.id,
//         eventType: event.eventType,
//         createdAt: event.createdAt,
//         "activeInfo.windowId": event.activeInfo.windowId,
//         "activeInfo.tabId": event.activeInfo.tabId,
//         "activeInfo.previousTabId": event.activeInfo.previousTabId,
//       }
//     }
//     if (event.eventType === 'tabs.onCreated') {
//       return {
//         id: event.id,
//         eventType: event.eventType,
//         createdAt: event.createdAt,
//         "tab.id": event.tab.id,
//         "tab.url": event.tab.url,
//         "tab.title": event.tab.title,
//         "tab.favIconUrl": event.tab.favIconUrl,
//         "tab.status": event.tab.status,
//         "tab.incognito": event.tab.incognito,
//         "tab.active": event.tab.active,
//         "tab.pinned": event.tab.pinned,
//         "tab.index": event.tab.index,
//         "tab.windowId": event.tab.windowId,
//         "tab.openerTabId": event.tab.openerTabId,
//       }
//     }
//   })
// }

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

  return <div style={{ height: '100vh', width: '100%' }}>
    <DataGrid
      rows={events}
      columns={columns}
      checkboxSelection
      disableSelectionOnClick
    />
  </div>
};

export default Options;
