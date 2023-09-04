import { FileRoute } from '@tanstack/react-router'
import { Badge, Button, Form } from 'antd'
import { useAntdTable } from 'ahooks'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import { DeleteOutlined, DownloadOutlined, RestOutlined } from '@ant-design/icons'
import type { SearchOption } from '@/components'
import { SearchForm } from '@/components'
import { list } from '@/services/system/operlog'

export const route = new FileRoute('/_layout/system/log/operlog').createRoute({
  component: PageA
})
interface RecordType {
  operId: number
  title: string
  businessType: number
  method: string
  requestMethod: string
  operName: string
}
function getTableData({ current, pageSize }: any, formData: any) {
  const queryParam = {
    pageNum: current,
    pageSize,
    ...formData
  }

  return list(queryParam).then(res => ({
    total: res.total,
    list: res.rows
  }))
}
function PageA() {
  const [form] = Form.useForm()
  const { tableProps, search, loading } = useAntdTable(getTableData, {
    form,
    cacheKey: 'operlogList'
  })
  const { submit } = search
  const searchOptions: SearchOption[] = [
    { label: '系统模块', component: 'input', name: 'title' },
    { label: '操作人员', component: 'input', name: 'operName' },
    {
      label: '类型',
      component: 'select',
      name: 'businessType',
      options: [
        { label: '新增', value: 1 },
        { label: '修改', value: 2 }
      ]
    },
    {
      label: '状态',
      component: 'select',
      name: 'status',
      options: [
        { label: '成功', value: 0 },
        { label: '失败', value: 1 }
      ]
    },
    { label: '操作时间', component: 'rangePicker', name: 'rangeTime' }
  ]
  const columns: ColumnsType<RecordType> = [
    { title: '日志编号', dataIndex: 'operId', width: 90 },
    { title: '系统模块', dataIndex: 'title' },
    { title: '操作类型', dataIndex: 'requestMethod' },
    { title: '操作人员', dataIndex: 'operName' },
    { title: '操作IP', dataIndex: 'operIp' },
    { title: '操作地点', dataIndex: 'operLocation' },
    {
      title: '操作状态',
      dataIndex: 'status',
      width: 90,
      render: e =>
        e === 0 ? <Badge status="success" text="成功" /> : <Badge status="error" text="失败" />
    },
    { title: '操作日期', dataIndex: 'operTime', width: 180 },
    {
      title: '操作',
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <div className="space-x-10px">
          <a>详情</a>
        </div>
      )
    }
  ]

  return (
    <>
      <div className="bg-white p-5-5-0">
        <SearchForm form={form} loading={loading} options={searchOptions} onChange={submit} />
      </div>
      <div className="my-4 bg-white p-5">
        <div className="text-right space-x-3 mb-4">
          <Button ghost danger icon={<DeleteOutlined />} disabled>
            删除
          </Button>
          <Button danger icon={<RestOutlined />}>
            清空
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            导出
          </Button>
        </div>
        <Table columns={columns} {...tableProps} scroll={{ x: 900 }} rowKey="operId" />
      </div>
    </>
  )
}
