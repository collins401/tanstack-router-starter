import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import { resetUserPwd } from '@/services/system/user'

interface Payload {
  onOk?: () => void
  onCancel?: () => void
  [others: string]: any
}

type ModifyPwdModalType = React.NamedExoticComponent & {
  show: (payload: Payload) => void
}
const isNot = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
]
const ModifyPwdModal: ModifyPwdModalType = React.memo(props => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const payloadRef = useRef<Payload>({})

  useEffect(() => {
    ModifyPwdModal.show = (payload: Payload) => {
      setVisible(true)
      form.resetFields()
      payloadRef.current = payload
    }
  }, [])

  const onOk = async () => {
    const values = await form.validateFields()
    const params = {
      userId: payloadRef.current?.userId,
      password: values.password
    }
    resetUserPwd(params).then(res => {
      if (res.code === 200) {
        payloadRef.current?.onOk?.()
        setVisible(false)
      }
    })
  }

  return (
    <Modal
      title={payloadRef.current.title || '默认标题'}
      width={500}
      open={visible}
      forceRender
      destroyOnClose
      onOk={onOk}
      onCancel={() => setVisible(false)}
    >
      <Form form={form} className="mt-6" wrapperCol={{ span: 17 }} labelCol={{ span: 5 }}>
        <Form.Item
          name="password"
          label="新密码"
          tooltip={{ title: '至少包含一个数字、一个大写字母、两个小写字母和一个特殊字符' }}
          rules={[
            {
              required: true,
              whitespace: true,
              message: '5~20位字符，且至少包含一个数字、一个大写字母、两个小写字母和一个特殊字符',
              max: 20,
              min: 5,
              pattern:
                /^.*(?=.{5,20})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/
            }
          ]}
        >
          <Input.Password type="password" placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          name="password2"
          label="确认密码"
          dependencies={['password']}
          rules={[
            {
              required: true
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码不一致！'))
              }
            })
          ]}
        >
          <Input.Password type="password" placeholder="确认密码" />
        </Form.Item>
      </Form>
    </Modal>
  )
}) as any
ModifyPwdModal.show = (payload: Payload) => console.log('ModifyPwdModal is not mounted.', payload)
export default ModifyPwdModal
