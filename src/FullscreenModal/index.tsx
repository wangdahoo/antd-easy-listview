import './index.less'
import React, { useState, useImperativeHandle, forwardRef, ReactChildren } from 'react'
import { Modal, Button, Divider } from 'antd'

export interface FullscreenModalProps {
    title: string | React.Component<{}, {}, any> | React.FC<{}> | undefined
    itemName: string
    onBack: () => void | Promise<void>
    onDelete?: () => void | Promise<void>
    children: ReactChildren | null
    backText?: string
}

export function FullscreenModal(props: FullscreenModalProps, ref: any) {
    const { title, backText } = props
    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => ({
        setVisible: (visible: boolean) => setVisible(visible)
    }))

    const createTitle = (title: string | React.Component<{}, {}, any> | React.FC<{}> | undefined) => (
        <div>
            <Button
                type="link"
                icon="arrow-left"
                style={{ paddingLeft: 0 }}
                onClick={async () => {
                    if (props.onBack && typeof props.onBack === 'function') {
                        await props.onBack()
                    }

                    setVisible(false)
                }}
            >
                {backText || '返回'}
            </Button>

            {props.onDelete ? (
                <Button
                    type="link"
                    icon="delete"
                    style={{ paddingLeft: 0 }}
                    onClick={() => {
                        Modal.confirm({
                            centered: true,
                            title: '提示',
                            content: `确定删除该${props.itemName}？`,
                            onOk: async function () {
                                if (props.onDelete) {
                                    await props.onDelete()
                                }
                                setVisible(false)
                            }
                        })
                    }}
                >
                    删除
                </Button>
            ) : null}

            <Divider type="vertical" />

            <span style={{ paddingLeft: 15 }}>{title}</span>
        </div>
    )

    return (
        <Modal title={createTitle(title)} visible={visible} className="fullscreen" footer={null} closable={false}>
            {props.children}
        </Modal>
    )
}

export default forwardRef(FullscreenModal)
