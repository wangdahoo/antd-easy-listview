// import React from 'react'
import '@wangdahoo/antd-easy-form/dist/index.css'
import { FormItemType } from '@wangdahoo/antd-easy-form'
// import '../dist/index.css'
// import { createListViewOptions, createListView } from '../dist'
import { createListViewOptions, createListView, SelectFilter } from '../src'
import { getAllUsers, createUser, updateUser, deleteUsers, batchDeleteUsers, User } from './api'
// import { Button, message } from 'antd'

const createFormItems = (props: any) => [
    {
        name: 'name',
        labelText: '姓名',
        itemType: FormItemType.INPUT,
        required: true,
        defaultValue: ''
    },
    {
        name: 'gender',
        labelText: '性别',
        itemType: FormItemType.RADIO,
        options: [
            {
                value: 1,
                text: '男'
            },
            {
                value: 0,
                text: '女'
            }
        ],
        defaultValue: 1,
        buttonStyle: 'solid'
    },
    {
        name: 'age',
        labelText: '年龄',
        itemType: FormItemType.NUMBER,
        min: 1,
        max: 200,
        step: 0.1,
        unit: '岁',
        defaultValue: 18
    },
    {
        name: 'city',
        labelText: '城市',
        itemType: FormItemType.SELECT,
        options: [
            {
                value: '上海',
                text: '上海'
            },
            {
                value: '北京',
                text: '北京'
            },
        ],
        defaultValue: '上海'
    }
]

const tableColumns = [
    {
        title: '#',
        key: '#',
        dataIndex: 'index',
        width: 50,
        align: 'center'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: (value: number) => {
            return value === 1 ? '男' : '女'
        },
        width: 100,
        align: 'center'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        render: (age: number) => `${age}岁`,
        width: 100,
        align: 'center'
    },
    {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        width: 100,
        align: 'center'
    },
    {
        key: 'dummy'
    }
]

// const extraAddOn = (props: any) => {
//     return <Button
//         type="primary"
//         onClick={() => {
//             console.log(props)
//             message.error('not implemented!')
//         }}
//         style={{ marginLeft: 10 }}
//     >
//         导出
//     </Button>
// }

const options = {
    ...createListViewOptions(),
    itemName: '人员',
    // extraAddOn,
    createFormItems,
    updateFormItems: (record: User, props: any) => {
        // console.log(record)

        return [
            {
                name: 'id',
                labelText: '人员 id',
                itemType: FormItemType.INPUT,
                required: true,
                defaultValue: record.id,
                hidden: true
            },

            ...createFormItems(props).map(item => ({
                ...item,
                ...(record[item.name] ? {
                    defaultValue: record[item.name]
                } : {})
            }))
        ]
    },
    tableWrapper: 'none' as 'card'|'none',
    tableColumns,
    filters: [
        'name',
        {
            name: 'gender',
            options: [
                {
                    value: 1,
                    text: '男'
                },
                {
                    value: 0,
                    text: '女'
                }
            ],
            labelText: '性别：',
            selectStyle: {
                width: 60
            }
        },
        {
            name: 'city',
            options: [
                {
                    value: '',
                    text: '请选择'
                },
            ],
            getOptions: function () {
                return new Promise((resolve, reject) => {
                    setTimeout(() => resolve([
                        {
                            value: '',
                            text: '请选择'
                        },
                        {
                            value: '上海',
                            text: '上海'
                        },
                        {
                            value: '北京',
                            text: '北京'
                        }
                    ]), 500)
                })
            },
            labelText: '城市：',
            selectStyle: {
                width: 100
            }
        },
    ] as (string | SelectFilter)[],
    fetchItems: getAllUsers,
    createItem: createUser,
    updateItem: updateUser,
    deleteItem: deleteUsers,
    batchDeleteEnabled: true,
    batchDeleteItems: batchDeleteUsers,
    // exportEnabled: false,
    // exportItems: console.log
}

export default createListView(options)
