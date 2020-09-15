import { CSSProperties } from 'react'
import { ExpandableConfig } from 'antd/lib/table/interface'

export type CreateApi<T> = (record: Partial<T>, props: any) => Promise<void>

export type UpdateApi<T> = (record: Partial<T>, props: any) => Promise<void>

export type DeleteApi<T> = (record: Partial<T>, props: any) => Promise<void>

export interface SelectFilter {
    name: string,
    options: { value: any, text: string }[]
    labelText?: string,
    selectStyle?: CSSProperties,
    getOptions?: (props?: any) => Promise<{ value: any, text: string }[]>
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

export interface ExportProps {
    keyword: string
    filters: string[]
}

export type ExportApi = (exportProps: ExportProps, props: any) => void

export type BatchDeleteApi<T> = (selectdRecords: Partial<T>[], props: any) => Promise<void>

export type TableOperation<T> = {
    type?: 'update'|'delete'|'custom'
    icon?: React.ReactNode
    text: string
    onOperation?: (record: T) => void
}

export interface ListViewOptions<T> {
    title?: string|boolean
    itemName: string
    className: string
    extraWidth: number|'auto'
    extraSearchPlaceholder: string
    extraAddOn?: (props: any, onRefresh: () => Promise<void>) => (string | JSX.Element)
    tableClassName: string
    tableColumns: any[]
    tableOperations: ('update'|'delete'|TableOperation<T>)[]
    tableOperationsStyle: CSSProperties
    tableWrapper: 'card'|'none'
    tableScroll: ({
        x?: string | number | true | undefined
        y?: string | number | undefined
    } & {
        scrollToFirstRowOnChange?: boolean | undefined
    }) | undefined
    tableExpandable?: ExpandableConfig<object>
    filters: (string | SelectFilter)[]
    createItemEnabled: boolean
    batchDeleteEnabled: boolean
    createItem: CreateApi<T>
    updateItem: UpdateApi<T>
    deleteItem: DeleteApi<T>
    fetchItems: SearchApi<T>
    batchDeleteItems: BatchDeleteApi<T>

    createFormItems?: (props: any) => any[]
    updateFormItems?: (record: T, props: any) => any[]
    formLabelWidth?: number

    detailTitle?: string | React.Component<{}, {}, any> | React.FC<{}> | undefined
    createDetailComponent?: (record: T, props: any, quit?: () => void) => React.ReactChildren

    creationTitle?: string | React.Component<{}, {}, any> | React.FC<{}> | undefined
    createCreationComponent?: (props: any, quit?: () => void) => React.ReactChildren

    exportEnabled?: boolean
    exportItems?: ExportApi
}
