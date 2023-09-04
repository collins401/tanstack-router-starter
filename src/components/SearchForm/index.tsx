import React from 'react'
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select
} from 'antd'
import { omit } from 'lodash-es'
import type { SearchConfig, SearchOption } from './types.d'
import { SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const SearchForm: React.FC<SearchConfig> = props => {
  const {
    onChange,
    onReset,
    options,
    form,
    loading,
    grid = '',
    searchBtnLeft = false,
    searchBtnText = '查询',
    restBtnText = '重置',
    hideBtn = false,
    children,
    ...formRest
  } = props

  function finish(v: any) {
    form.validateFields().then(values => {
      onChange?.(values)
    })
  }

  function reset() {
    if (onReset) {
      onReset()
    } else {
      form.resetFields()
    }
  }

  const ItemRender = (item: SearchOption) => {
    const { component } = item
    switch (component) {
      case 'input':
        return <Input placeholder={item.placeholder || '请输入'} allowClear {...item.props} />
      case 'textArea':
        return <Input.TextArea placeholder={item.placeholder || '请输入'} {...item.props} />
      case 'inputNumber':
        return <InputNumber placeholder={item.placeholder || '请输入'} {...item.props} />
      case 'radio':
        return <Radio.Group options={item.options} {...item.props} />
      case 'checkbox':
        return <Checkbox.Group options={item.options} {...item.props} />
      case 'select':
        return (
          <Select
            options={item.options}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder={item.placeholder || '请选择'}
            {...item.props}
          />
        )
      case 'cascader':
        return <Cascader options={item.options} placeholder="请选择" allowClear {...item.props} />
      case 'datePicker':
        return (
          <DatePicker
            placeholder={item.placeholder || '请选择日期'}
            className="w-full"
            {...item.props}
          />
        )
      case 'rangePicker':
        return <RangePicker className="w-full" {...item.props} />
      // 自定义组件
      case 'custom':
        return item.render
      // 隐藏域，用于存储一些非常规字段
      case 'hidden':
        return <Input type="hidden" className="hidden" {...item.props} />
      default:
        break
    }
  }

  return (
    <Form
      form={form}
      autoComplete="off"
      labelCol={{ flex: '90px' }}
      onFinish={finish}
      {...formRest}
    >
      <div
        className={`grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-3 relative ${grid}`}
      >
        {options.map((item, i) => {
          const restItem: any = omit(item, [
            'props',
            'options',
            'component',
            'hidden',
            'list',
            'and'
          ])
          if (item.hidden) {
            return (
              <Form.Item key={i} shouldUpdate noStyle>
                {({ getFieldValue }) =>
                  getFieldValue([item.hidden[0]]) !== item.hidden[1] && (
                    <Form.Item {...restItem}>{ItemRender(item)}</Form.Item>
                  )
                }
              </Form.Item>
            )
          }
          // modal 弹窗下并列展示
          if (item.and) {
            return (
              <Form.Item key={i} label={restItem.label}>
                <div className="flex items-center">
                  <Form.Item noStyle {...restItem}>
                    {ItemRender(item)}
                  </Form.Item>
                  <Form.Item noStyle {...item.and} hidden={false}>
                    {ItemRender(item.and)}
                  </Form.Item>
                </div>
              </Form.Item>
            )
          }
          return (
            <Form.Item key={i} {...restItem}>
              {ItemRender(item)}
            </Form.Item>
          )
        })}
        {children}
        {!hideBtn && (
          <div>
            {!searchBtnLeft && <div className="h-[56px] text-transparent" />}
            <div className={`space-x-2.5 ${searchBtnLeft ? '' : 'absolute right-0 bottom-[24px]'}`}>
              <Button onClick={reset}>{restBtnText}</Button>
              <Button type="primary" htmlType="submit" loading={loading} icon={<SearchOutlined />}>
                {searchBtnText}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Form>
  )
}

export default SearchForm
