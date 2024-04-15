import { Provider } from "react-redux";
import { store } from "../state/store";
// import { combineReducers, legacy_createStore as createStore } from "redux";
// import { tasksReducer } from "../state/tasks-reducer";
// import { todolistsReducer } from "../state/todolists-reducer";
// import { v1 } from "uuid";
// import { AppRootState } from "../state/store";

// const rootReducer = combineReducers({
//     todolists: todolistsReducer,
//     tasks: tasksReducer
// })

// const initialGlobalState = {
//     todolists: [
//         {id: "todolistId1", title:"What to learn", filter: "all"},
//         {id: "todolistId2", title:"What to buy", filter: "all"}
//     ],
//     tasks: {
//         ["todolistId1"]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "React.js", isDone: false}
//         ],
//         ["todolistId2"]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     }
// }

// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider> ;
}