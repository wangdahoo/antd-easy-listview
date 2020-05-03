import './index.less'
import '@wangdahoo/antd-easy-form/dist/index.css'

import React, { useState, useRef, useEffect } from 'react'
import { Layout, Card, Table, Button, Input, Drawer, Modal, message } from 'antd'
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Form } from '@wangdahoo/antd-easy-form/src'
import classnames from 'classnames'
import FullscreenModal from './FullscreenModal'
import { defaultOptions } from './defaultOptions'
import { ListViewOptions } from './types'

const Content = Layout.Content
const Search = Input.Search

export function createListView<T>(options: ListViewOptions<T>) {
    if (!options.itemName) throw new Error('itemName 不能为空')

    options = Object.assign({}, defaultOptions(), options || {})

    const {
        itemName,
        className,
        extraWidth,
        extraSearchPlaceholder,
        tableClassName,
        tableColumns,
        tableOperations,
        tableWrapper,
        filters,
        createItem,
        deleteItem,
        updateItem,
        fetchItems,
        createFormItems,
        updateFormItems,
        formLabelWidth,

        // detail in fullscreen modal
        detailTitle,
        createDetailComponent,

        // creation in fullscreen modal
        creationTitle,
        createCreationComponent
    } = options

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
        const detailRef = useRef(null)
        const creationRef = useRef(null)

        useEffect(() => {
            if (props.created) props.created()
            onFetchItems()
            setInnerTableColumns(createTableColumns(tableColumns, renderOperations))
        }, [props])

        async function onFetchItems() {
            const searchProps = {
                keyword,
                filters,
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize
            }

            const { items, total, pageNum, pageSize } = await fetchItems(searchProps, props)
            setItems(items || [])
            setPagination({
                total,
                pageNum,
                pageSize
            })
        }

        async function onRefresh() {
            await onFetchItems()
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
            console.log('onEdit: ', record)

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
                    await onFetchItems()
                }
            })
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
            await onFetchItems()
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
                                        style={{ paddingLeft: 0, paddingRight: 0, height: 20 }}
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
            <div style={{ display: 'flex', width: extraWidth }}>
                <Search
                    placeholder={extraSearchPlaceholder}
                    style={{ flex: 1 }}
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
                <Button type="primary" icon={<ReloadOutlined />} style={{ marginLeft: 10 }} onClick={onRefresh}>
                    刷新
                </Button>
                <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: 10 }} onClick={onCreate}>
                    添加
                </Button>
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
                    showSizeChanger: true
                }}
            />
        )

        return (
            <Layout className={classnames('elv-list-view', className)}>
                <Content>
                    {tableWrapper !== 'none' ? (
                        <Card title={`${itemName}列表`} extra={listExtra}>
                            {listContent}
                        </Card>
                    ) : (
                            <div style={{ backgroundColor: '#fff' }}>
                                <div style={{ paddingBottom: 16 }}>{listExtra}</div>
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
                            onBack={onFetchItems}
                            itemName={itemName}
                            onDelete={async () => {
                                await deleteItem(record, props)
                                message.success(`删除${itemName}成功`)
                                await onFetchItems()
                            }}
                        >
                            {createDetailComponent ? createDetailComponent(record, props) : null}
                        </FullscreenModal>
                    ) : null}

                    {/* creation page */}
                    {createCreationComponent ? (
                        <FullscreenModal
                            title={creationTitle}
                            ref={creationRef}
                            onBack={onFetchItems}
                            itemName={itemName}
                        >
                            {createCreationComponent ? createCreationComponent(props) : null}
                        </FullscreenModal>
                    ) : null}
                </Content>
            </Layout>
        )
    }
}

export const createListViewOptions = defaultOptions
