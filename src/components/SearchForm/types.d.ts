import React from 'react'
import type { RangePickerProps } from 'antd/es/date-picker'
import type { FormItemProps, FormProps, FormInstance } from 'antd/es/form'
import {
  SelectProps,
  InputProps,
  DatePickerProps,
  RadioGroupProps,
  InputNumberProps,
  CascaderProps
} from 'antd'
import { TextAreaProps } from 'antd/es/input'
import { CheckboxOptionType, CheckboxGroupProps } from 'antd/es/checkbox'

type newFormItemProps = Omit<FormItemProps, 'hidden'>
type CommonType = {
  /**
   * @description: 改写默认hidden属性
   * @param {string} 依赖更新的字段
   * @param {any} 依赖的字段值
   */
  hidden?: [string, any]
  // modalForm 下并列展示样式
  and?: SearchOption
} & newFormItemProps

type FiledSelectType = {
  component: 'select'
  options: any
  props?: SelectProps
  placeholder?: string
} & CommonType

type FiledCascaderType = {
  component: 'cascader'
  options: any
  props?: CascaderProps
  placeholder?: string
} & CommonType

type FiledInputType = {
  component: 'input'
  props?: InputProps
  placeholder?: string
} & CommonType

type FiledTextAreaType = {
  component: 'textArea'
  props?: TextAreaProps
  placeholder?: string
} & CommonType

type FiledInputNumberType = {
  component: 'inputNumber'
  props?: InputNumberProps
  placeholder?: string
} & CommonType

type FiledRadioType = {
  component: 'radio'
  options: CheckboxOptionType[]
  props?: RadioGroupProps
} & CommonType

type FiledCheckBoxType = {
  component: 'checkbox'
  options: CheckboxOptionType[]
  props?: CheckboxGroupProps
} & CommonType

type FiledDatePickerType = {
  component: 'datePicker'
  props?: DatePickerProps
  placeholder?: string
} & CommonType

type FiledRangePickerType = {
  component: 'rangePicker'
  props?: RangePickerProps
} & CommonType

type FiledCustomType = {
  component: 'custom'
  render?: React.ReactNode
  props?: any
} & CommonType

type FiledHiddenType = {
  component: 'hidden'
  noStyle: boolean
  props?: InputProps
} & CommonType

export type SearchOption =
  | FiledSelectType
  | FiledCascaderType
  | FiledInputType
  | FiledTextAreaType
  | FiledRadioType
  | FiledCheckBoxType
  | FiledDatePickerType
  | FiledRangePickerType
  | FiledHiddenType
  | FiledCustomType
  | FiledInputNumberType

export type SearchConfig = {
  options: SearchOption[]
  form: FormInstance
  grid?: string
  loading?: boolean
  searchBtnLeft?: boolean
  searchBtnText?: string
  restBtnText?: string
  onChange?: (v: any) => void
  onReset?: () => void
  hideBtn?: boolean
  children?: React.ReactNode
} & FormProps
