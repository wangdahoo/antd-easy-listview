import './index.less'

import React, { useState, useRef, useEffect } from 'react'
import { Layout, Card, Table, Button, Input, Drawer, Modal, Select, message } from 'antd'
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ExportOutlined } from '@ant-design/icons'
import { Form } from '@wangdahoo/antd-easy-form'
import classnames from 'classnames'
import FullscreenModal from './FullscreenModal'
import { defaultOptions } from './defaultOptions'
import { ListViewOptions, SelectFilter as _SelectFilter, ExportProps } from './types'
import { ExpandableConfig } from 'antd/lib/table/interface'

const Search = Input.Search

export function createListView<T>(options: Partial<ListViewOptions<T>>) {
    if (!options.itemName) throw new Error('itemName 不能为空')

    options = {
        ...defaultOptions(),
        ...(options || {})
    }

    const {
        itemName,
        className,
        extraWidth,
        extraSearchPlaceholder,
        extraAddOn,
        tableClassName,
        tableColumns,
        tableOperations,
        tableWrapper,
        tableScroll,
        tableExpandable,
        filters = [] as (string | SelectFilter)[],
        createItemEnabled,
        batchDeleteEnabled,
        createItem,
        deleteItem,
        updateItem,
        fetchItems,
        batchDeleteItems,
        createFormItems,
        updateFormItems,
        formLabelWidth,

        // detail in fullscreen modal
        detailTitle,
        createDetailComponent,

        // creation in fullscreen modal
        creationTitle,
        createCreationComponent,

        // export options
        exportEnabled,
        exportItems
    } = options as ListViewOptions<T>

    const FORM_TYPE_CREATE = 1
    const FORM_TYPE_UPDATE = 2

    return function ListView(props: any) {
        const [items, setItems] = useState([] as T[])
        const [pagination, setPagination] = useState({
            total: 0,
            pageNum: 1,
            pageSize: 10
        })
        const [keyword, setKeyword] = useState('')
        const [drawerVisible, setDrawerVisible] = useState(false)
        const [drawerTitle, setDrawerTitle] = useState('')
        const [formType, setFormType] = useState(0)
        const [innerTableColumns, setInnerTableColumns] = useState([] as any[])
        const [record, setRecord] = useState(null as T | null)
        const [selectFilters, setSelectFilters] = useState(
            (filters
                .filter(filter => typeof filter !== 'string') as _SelectFilter[])
                .reduce((selectors, filter: _SelectFilter) => {
                    return {
                        ...selectors,
                        [filter.name]: {
                            ...filter,
                            value: filter.options[0].value,
                        }
                    }
                }, {}) as { [key: string]: any }
        )
        const [selectedRecords, setSelectedRecords] = useState([] as T[])

        // console.log(selectFilters)

        const detailRef = useRef(null)
        const creationRef = useRef(null)

        function formatFilters (filters: (string | _SelectFilter)[], newSelectFilters?: any): string[] {
            return filters.map(filter => {
                if (typeof filter === 'string') {
                    return filter
                } else {
                    const value = (((newSelectFilters || selectFilters) as any)[filter.name]).value
                    return `${filter.name}=${(value === null || value === undefined) ? '' : value}`
                }
            })
        }

        const rowSelection = {
            fixed: true,
            columnWidth: 40,
            onChange: (selectedRowKeys: any, newSelectedRecords: any) => {
                // console.log('newSelectedRecords: ', newSelectedRecords)
                setSelectedRecords(newSelectedRecords.filter((r: any) => r !== undefined) as T[])
            }
        }

        useEffect(() => {
            if (props.created) props.created()
            resolveOptions(filters)
            onFetchItems(keyword, formatFilters(filters), pagination.pageNum, pagination.pageSize)
            setInnerTableColumns(createTableColumns(tableColumns, renderOperations))
        }, [props])

        async function resolveOptions (filters: (string | SelectFilter)[]) {
            for (let i = 0; i < filters.length; i++) {
                const filter = filters[i]
                if (typeof filter !== 'string' && filter.getOptions) {
                    filter.options = await filter.getOptions(props)
                }
            }

            setSelectFilters((filters
                .filter(filter => typeof filter !== 'string') as _SelectFilter[])
                .reduce((selectors, filter: _SelectFilter) => {
                    return {
                        ...selectors,
                        [filter.name]: {
                            ...filter,
                            value: filter.options[0].value,
                        }
                    }
                }, {}) as { [key: string]: any })
        }

        async function onFetchItems(keyword: string, filters: string[], pageNum: number, pageSize: number) {
            const searchProps = {
                keyword,
                filters,
                pageNum,
                pageSize
            }

            // console.log('searchProps =>', searchProps)

            const { items, total } = await fetchItems(searchProps, props)
            setItems(items || [])
            setPagination({
                total,
                pageNum,
                pageSize
            })
        }

        async function onRefresh() {
            await onFetchItems(keyword, formatFilters(filters), pagination.pageNum, pagination.pageSize)
        }

        async function onChangeSelect (name: string, value: any) {
            const newSelectFilters = {
                ...selectFilters,
                [name]: {
                    ...selectFilters[name],
                    value
                }
            }
            await onFetchItems(keyword, formatFilters(filters, newSelectFilters), 1, pagination.pageSize)
            setSelectFilters(newSelectFilters)
        }

        function onCreate() {
            if (createCreationComponent) {
                setTimeout(() => {
                    if (creationRef.current !== null) {
                        (creationRef.current as any).setVisible(true)
                    }
                })
                return
            }

            setDrawerTitle(`添加${itemName}`)
            setDrawerVisible(true)
            setFormType(FORM_TYPE_CREATE)
        }

        function onEdit(record: T) {
            // console.log('onEdit: ', record)

            if (createDetailComponent) {
                setRecord(null)
                setTimeout(() => {
                    setRecord(record)

                    if (detailRef.current !== null) {
                        (detailRef.current as any).setVisible(true)
                    }
                })
                return
            }

            setRecord(record)
            setDrawerTitle(`编辑${itemName}`)
            setDrawerVisible(true)
            setFormType(FORM_TYPE_UPDATE)
        }

        function onDelete(record: T) {
            Modal.confirm({
                centered: true,
                title: '提示',
                content: `确定删除该${itemName}？`,
                onOk: async function () {
                    await deleteItem(record, props)
                    message.success(`删除${itemName}成功`)
                    await onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)
                }
            })
        }

        function onBatchDelete() {
            Modal.confirm({
                centered: true,
                title: '提示',
                content: `确定删除选中的${itemName}？`,
                onOk: async function () {
                    await batchDeleteItems(selectedRecords, props)
                    message.success(`批量删除${itemName}成功`)
                    setSelectedRecords([])
                    await onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)
                }
            })
        }

        function onExport () {
            const exportProps = {
                keyword,
                filters: formatFilters(filters)
            } as ExportProps

            if (exportItems) {
                exportItems(exportProps, props)
            }
        }

        async function onSubmit(form: any) {
            if (formType === FORM_TYPE_CREATE) {
                await createItem(form, props)
                message.success(`添加${itemName}成功`)
            }

            if (formType === FORM_TYPE_UPDATE) {
                await updateItem(form, props)
                message.success(`保存${itemName}成功`)
            }

            setDrawerVisible(false)
            await onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)
        }

        const renderOperations = (_: any, record: T) => {
            return (
                <div className="operations">
                    {tableOperations.indexOf('update') > -1 ? (
                        <Button type="link" size="small" icon={<EditOutlined />} onClick={() => onEdit(record)}>
                            编辑
                        </Button>
                    ) : null}

                    {tableOperations.indexOf('delete') > -1 ? (
                        <Button type="link" danger size="small" icon={<DeleteOutlined />} onClick={() => onDelete(record)}>
                            删除
                        </Button>
                    ) : null}
                </div>
            )
        }

        const createTableColumns = (tableColumns: any[], renderOperations: any): any[] => {
            return tableColumns
                .concat(
                    tableOperations.length > 0
                        ? [
                            {
                                title: '操作',
                                key: 'operations',
                                align: 'center',
                                width: tableOperations.length > 1 ? 160 : 80,
                                render: renderOperations
                            }
                        ]
                        : []
                )
                .map(col => ({
                    ...col,
                    ellipsis: true,
                    ...(col.detailLink
                        ? {
                            render: (val: any, record: any) => {
                                return (
                                    <Button
                                        type="link"
                                        onClick={() => onEdit(record)}
                                        style={{ padding: 0, height: 20 }}
                                    >
                                        {val}
                                    </Button>
                                )
                            }
                        }
                        : {})
                }))
        }

        const listExtra = (
            <div className='list-extra' style={{ width: extraWidth }}>
                {Object.keys(selectFilters).map((name, index) => {
                    return (
                        <span key={index}>
                            <span style={{ float: 'left', lineHeight: '32px' }}>{selectFilters[name].labelText}</span>
                            <div style={{ float: 'left' }}>
                                <Select
                                    style={{ ...(selectFilters[name].selectStyle || {}), margin: '0 15px 0 5px' }}
                                    value={selectFilters[name].value}
                                    onChange={value => onChangeSelect(name, value)}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {selectFilters[name].options.map((option: { value: string, text: string }, optionIndex: number) => {
                                        return (
                                            <Select.Option key={optionIndex} value={option.value}>{option.text}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </span>
                    )
                })}
                <Search
                    className='input-search'
                    placeholder={extraSearchPlaceholder}
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onSearch={async () => {
                        await onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)
                    }}
                    enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
                />
                <Button type="primary" icon={<ReloadOutlined />} style={{ marginLeft: 10 }} onClick={onRefresh}>
                    刷新
                </Button>
                {createItemEnabled ? <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: 10 }} onClick={onCreate}>
                    添加
                </Button> : null}
                {batchDeleteEnabled ? (
                    <Button type="primary" danger disabled={selectedRecords.length === 0} icon={<DeleteOutlined />} style={{ marginLeft: 10 }} onClick={onBatchDelete}>
                        删除
                    </Button>
                ) : null}
                {exportEnabled && exportItems ? (
                    <Button type="default" icon={<ExportOutlined />} style={{ marginLeft: 10 }} onClick={onExport}>
                        导出
                    </Button>
                ) : null}
                {extraAddOn && extraAddOn(props, onRefresh)}
            </div>
        )

        const listContent = (
            <Table
                className={classnames('table-items', tableClassName)}
                columns={innerTableColumns}
                dataSource={items as unknown as object[]}
                pagination={{
                    total: pagination.total,
                    current: pagination.pageNum,
                    pageSize: pagination.pageSize,
                    showTotal: (total, [start, end]) => `共 ${total} 条记录，当前 ${start} ~ ${end}`,
                    showSizeChanger: true,
                    onChange: async (pageNum, pageSize) => {
                        await onFetchItems(keyword, formatFilters(filters), pageNum, pageSize || pagination.pageSize)
                    },
                    onShowSizeChange: async (_, newPageSize: number) => {
                        setPagination({
                            ...pagination,
                            pageSize: newPageSize
                        })
                        await onFetchItems(keyword, formatFilters(filters), 1, newPageSize)
                    }
                }}
                rowSelection={batchDeleteEnabled ? rowSelection : undefined}
                scroll={tableScroll}
                expandable={tableExpandable}
            />
        )

        return (
            <div className={classnames('ant-layout', 'elv-list-view', className)}>
                <div className='ant-layout-content'>
                    {tableWrapper !== 'none' ? (
                        <Card title={options.title === false ? null : options.title || `${itemName}列表`} extra={listExtra}>
                            {listContent}
                        </Card>
                    ) : (
                        <div className="table-wrapper">
                            <div className="list-extra-wrapper">
                                <div className="flex-1"></div>
                                {listExtra}
                            </div>
                            {listContent}
                        </div>
                    )}

                    {/* create or update item */}
                    <Drawer
                        title={drawerTitle}
                        width={800}
                        placement="right"
                        onClose={() => setDrawerVisible(false)}
                        visible={drawerVisible}
                    >
                        <div style={{ padding: '0 50px' }}>
                            {drawerVisible ? (
                                <Form
                                    labelWidth={formLabelWidth}
                                    items={
                                        formType === FORM_TYPE_CREATE
                                            ? createFormItems && createFormItems(props)
                                            : updateFormItems && updateFormItems(record as T, props)
                                    }
                                    onSubmit={onSubmit}
                                />) : null}
                        </div>
                    </Drawer>

                    {/* detail page */}
                    {record !== null ? (
                        <FullscreenModal
                            title={detailTitle}
                            ref={detailRef}
                            onBack={() => onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)}
                            itemName={itemName}
                            onDelete={deleteItem ? async () => {
                                await deleteItem(record, props)
                                message.success(`删除${itemName}成功`)
                                await onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)
                            } : undefined}
                        >
                            {createDetailComponent ? createDetailComponent(record, props, () => {
                                if (detailRef.current) {
                                    (detailRef.current as any).setVisible(false)
                                    onRefresh()
                                }
                            }) : null}
                        </FullscreenModal>
                    ) : null}

                    {/* creation page */}
                    {createCreationComponent ? (
                        <FullscreenModal
                            title={creationTitle}
                            ref={creationRef}
                            onBack={() => onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize)}
                            itemName={itemName}
                        >
                            {createCreationComponent ? createCreationComponent(props, () => {
                                if (detailRef.current) {
                                    (detailRef.current as any).setVisible(false)
                                    onRefresh()
                                }
                            }) : null}
                        </FullscreenModal>
                    ) : null}
                </div>
            </div>
        )
    }
}

export const createListViewOptions = defaultOptions

export type SelectFilter = _SelectFilter

export * from './types'
