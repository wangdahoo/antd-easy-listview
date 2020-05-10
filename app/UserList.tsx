import '@wangdahoo/antd-easy-form/dist/index.css'
import { FormItemType } from '@wangdahoo/antd-easy-form'
// import '../dist/index.css'
// import { createListViewOptions, createListView } from '../dist'
import { createListViewOptions, createListView } from '../src'
import { getAllUsers, createUser, updateUser, deleteUsers, User } from './api'

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
        key: 'dummy'
    }
]

const options = {
    ...createListViewOptions(),
    itemName: '人员',
    createFormItems,
    updateFormItems: (record: User, props: any) => {
        console.log(record)

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
    tableColumns,
    filters: [ 'name' ],
    fetchItems: getAllUsers,
    createItem: createUser,
    updateItem: updateUser,
    deleteItem: deleteUsers
}

export default createListView(options)
