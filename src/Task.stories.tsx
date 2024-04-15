import Task from './Task';
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample = () => {
    return <>
        <Task t={{id: '1', isDone: true, title: 'CSS'}} todolistId={"todolist1"}/>
        <Task t={{id: '2', isDone: false, title: 'JS'}} todolistId={"todolist2"}/>
    </>
}