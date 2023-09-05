import { FileRoute, useNavigate } from '@tanstack/react-router'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Form, Modal, Switch, Table } from 'antd'
import { useAntdTable } from 'ahooks'
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  LockOutlined,
  PlusOutlined,
  UserSwitchOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import ModifyPwdModal from './components/modiyPwd'
import useAccess from '@/hooks/useAccess'
import { SearchForm, type SearchOption } from '@/components'
import { listUser } from '@/services/system/user'

export const route = new FileRoute('/_layout/system/user/').createRoute({
  component: UserPage
})
interface RecordType {
  userId: number
  userName: string
  phonenumber: string
  status: string
  createTime: string
  updateTime: string
}
async function getTableData({ current, pageSize }: any, formData: any) {
  const queryParam = {
    pageNum: current,
    pageSize,
    ...formData
  }
  const a = await listUser(queryParam).toString()
  console.log(a)
  return listUser(queryParam).then(res => ({
    total: res.total,
    list: res.rows
  }))
}

function UserPage() {
  const [modal, contextHolder] = Modal.useModal()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { hasPermission } = useAccess()
  const { tableProps, search, loading, refresh } = useAntdTable(getTableData, {
    form,
    cacheKey: 'userList'
  })
  const { submit } = search
  const searchOptions: SearchOption[] = [
    { label: '用户名称', component: 'input', name: 'userName' },
    { label: '手机号码', component: 'input', name: 'phonenumber' },
    {
      label: '用户状态',
      component: 'select',
      name: 'status',
      options: [
        { label: '正常', value: 0 },
        { label: '停用', value: 1 }
      ]
    }
  ]
  function modifyPwd(record: RecordType) {
    ModifyPwdModal.show({
      title: `重置密码 - ${record.userName}`,
      userId: record.userId,
      onOk() {
        refresh()
      }
    })
  }
  const dropItems = (record: RecordType): MenuProps['items'] => [
    {
      key: '1',
      label: <a>编辑</a>,
      icon: <EditOutlined />,
      disabled: !hasPermission('system:user:edit')
    },
    {
      key: '2',
      label: '分配角色',
      icon: <UserSwitchOutlined />,
      onClick: () => navigate({ to: `role?userId=${record.userId}` }),
      disabled: !hasPermission('system:user:edit')
    },
    {
      key: '3',
      label: '重置密码',
      icon: <LockOutlined />,
      onClick: () => modifyPwd(record),
      disabled: !hasPermission('system:user:resetPwd')
    },
    {
      key: 'del',
      label: '删除',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: () => delUser(record.userId),
      disabled: !hasPermission('system:user:remove')
    }
  ]
  const columns: ColumnsType<RecordType> = [
    { title: '用户编号', dataIndex: 'userId', width: 90 },
    { title: '用户名称', dataIndex: 'userName' },
    { title: '用户昵称', dataIndex: 'nickName' },
    { title: '部门', dataIndex: 'dept', render: e => e?.deptName || '-' },
    { title: '手机号码', dataIndex: 'phonenumber', width: 140 },
    { title: '状态', dataIndex: 'status', width: 80, render: e => <Switch checked={e === '0'} /> },
    { title: '创建时间', dataIndex: 'createTime' },
    {
      title: '操作',
      fixed: 'right',
      width: 130,
      render: (_, record) =>
        record.userId !== 1 && (
          <div className="space-x-10px">
            {hasPermission([
              'system:user:edit',
              'system:user:resetPwd',
              'system:user:edit',
              'system:user:remove'
            ]) && (
              <Dropdown
                trigger={['click']}
                menu={{ items: dropItems(record) }}
                placement="bottomRight"
                arrow
              >
                <div className="size-32px transition-all flex-center rounded-full hover:bg-gray-200">
                  <EllipsisOutlined className="!text-20px font-500 !text-primary" />
                </div>
              </Dropdown>
            )}
          </div>
        )
    }
  ]

  function delUser(id: number) {
    modal.confirm({
      title: '系统提示',
      content: `是否确认删除用户编号为"${id}"的数据项？`,
      okType: 'danger',
      onOk: () => {
        console.log(id)
      }
    })
  }
  return (
    <>
      <div className="bg-white p-5-5-0">
        <SearchForm form={form} loading={loading} options={searchOptions} onChange={submit} />
      </div>
      <div className="my-4 bg-white p-5">
        {hasPermission('system:user:add') && (
          <div className="text-right mb-4">
            <Button type="primary" icon={<PlusOutlined />}>
              新增
            </Button>
          </div>
        )}
        <Table columns={columns} {...tableProps} scroll={{ x: 900 }} rowKey="userId" />
      </div>
      <ModifyPwdModal />
      {contextHolder}
    </>
  )
}
