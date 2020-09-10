import { SearchApi, CreateApi, UpdateApi, BatchDeleteApi } from '../../src'

let id: number = 0

let users: User[] = []

export interface User {
    id: number
    name: string
    gender: number
    age: number
    city: string
}

// const log = (action: string) => console.log(action, users)
const log = (action: string) => void 0

for (let i = 0; i < 25; i++) {
    users.push({
        id: ++id,
        name: `王${i}虎`,
        gender: i % 2 ? 1 : 0,
        age: Number((Math.random() * 100).toFixed(0)),
        city: i % 3 ? '北京' : '上海'
    })
}

export const getAllUsers: SearchApi<User> = (props: any) => {
    const { keyword = '', filters = [] } = props
    const pageNum = props.pageNum as number
    const pageSize = props.pageSize as number

    const selectFitlers = filters.filter((filter: string) => filter.indexOf('=') > -1)
    const keywordFitlers = filters.filter((filter: string) => filter.indexOf('=') === -1)

    let filteredUsers = users
        .sort((a, b) => b.id - a.id)
        .filter(u => {
            const result = selectFitlers.reduce((result: boolean, filter: string) => {
                const [ name, value ] = filter.split('=')
                if (value === '') return result
                return result && (u[name] + '' === value)
            }, true)

            return result
        })
        .filter(u => {
            if (keyword === '') return true

            const result = keywordFitlers.reduce((result: boolean, filter: string) => {
                return result || u[filter].indexOf(keyword) > -1
            }, false)

            // console.log(u, result)

            return result
        })

    console.log(keyword, filters)
    console.log('filteredUsers =>', filteredUsers.slice((pageNum - 1) * pageSize, pageNum * pageSize))

    const result = {
        items: filteredUsers.slice((pageNum - 1) * pageSize, pageNum * pageSize)
            .map((u, uIndex) => ({ ...u, key: u.id, index: uIndex + pageSize * (pageNum - 1) + 1 })),
        total: filteredUsers.length,
        pageNum,
        pageSize
    }

    log('fetch')

    return Promise.resolve(result)
}

export const createUser: CreateApi<User> = (record: User) => {
    users.push({
        ...record,
        id: ++id
    })

    log('create')

    return Promise.resolve()
}

export const updateUser: UpdateApi<User> = (record: User) => {
    for (let u of users) {
        if (u.id === record.id) {
            u = {
                ...u,
                ...record
            }
        }
    }

    log('update')

    return Promise.resolve()
}

export const deleteUsers: UpdateApi<User> = (record: User) => {
    users = users.filter(u => record.id !== u.id)

    log('delete')

    return Promise.resolve()
}

export const batchDeleteUsers: BatchDeleteApi<User> = (records: User[]) => {
    const deletedIds = records.map(i => i.id)
    users = users.filter(u => deletedIds.indexOf(u.id) === -1)

    log('batch delete')

    return Promise.resolve()
}
