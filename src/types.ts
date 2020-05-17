import { CSSProperties } from 'react'

export type CreateApi<T> = (record: Partial<T>, props: any) => Promise<void>

export type UpdateApi<T> = (record: Partial<T>, props: any) => Promise<void>

export type DeleteAPi<T> = (record: Partial<T>, props: any) => Promise<void>

export interface SelectFilter {
    name: string,
    options: { value: any, text: string }[]
    labelText?: string,
    selectStyle?: CSSProperties
}

export interface SearchProps {
    keyword: string
    filters: string[]
    pageNum: number
    pageSize: number
}

export type SearchApi<T> = (searchProps: SearchProps, props: any) => Promise<{
    items: T[],
    total: number,
    pageNum: number
    pageSize: number
}>

export type BatchDeleteApi<T> = (selectdRecords: Partial<T>[], props: any) => Promise<void>

export interface ListViewOptions<T> {
    itemName: string
    className: string
    extraWidth: number|'auto'
    extraSearchPlaceholder: string
    tableClassName: string
    tableColumns: any[]
    tableOperations: ('update'|'delete')[]
    tableWrapper: 'card'|'none'
    tableScroll: ({
        x?: string | number | true | undefined
        y?: string | number | undefined
    } & {
        scrollToFirstRowOnChange?: boolean | undefined
    }) | undefined
    filters: (string | SelectFilter)[]
    batchDeleteEnabled: boolean
    createItem: CreateApi<T>
    updateItem: UpdateApi<T>
    deleteItem: DeleteAPi<T>
    fetchItems: SearchApi<T>
    batchDeleteItems: BatchDeleteApi<T>

    createFormItems?: (props: any) => any[]
    updateFormItems?: (record: T, props: any) => any[]
    formLabelWidth?: number

    detailTitle?: string | React.Component<{}, {}, any> | React.FC<{}> | undefined
    createDetailComponent?: (record: T, props: any) => React.ReactChildren

    creationTitle?: string | React.Component | React.FC,
    createCreationComponent?: (props: any) => React.ReactChildren
}
