import EditableSpan from './EditableSpan.tsx';
import {action} from '@storybook/addon-actions';

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeCallback = action("Value change")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} onChange={changeCallback}/>
}