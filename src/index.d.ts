/// <reference types="react" />
import { ListViewOptions } from './types'
export declare function createListView<T>(options: Partial<ListViewOptions<T>>): (props: any) => JSX.Element
export declare const createListViewOptions: <T>() => ListViewOptions<T>
export * from './types'
