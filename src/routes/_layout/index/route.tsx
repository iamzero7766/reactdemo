import { createFileRoute } from '@tanstack/react-router'
import { Form, Input, AutoComplete, Button } from 'antd'
import AutoInput from '@/components/common/autoInput'
import { useEffect } from 'react'
import './index.css'

export const Route = createFileRoute('/_layout/')({
  component: RouteComponent,
})

const platforms = [
  { label: 'wechat', recommend: true },
  { label: 'alipay', recommend: false },
  { label: 'douyin', recommend: false },
  { label: 'kuaishou', recommend: true },
  { label: 'xiaohongshu', recommend: true },
  { label: 'weibo', recommend: true },
  
]

function RouteComponent() {
  const [form] = Form.useForm() 


  useEffect(() => {
    form.setFieldsValue({
      name: 'first name',
      description: 'first data',
      platform: 'kuaishou',
    })
  }, [])


  const onFinish = (values: any) => {
    console.log(values)
  }


  const getFormData = () => {
    console.log(form.getFieldsValue())
  }

  const setFormData = () => {
    form.setFieldsValue({
      name: 'second name',
      description: 'second data',
      platform: 'weibo',
    })
  }



  return (
    <div>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item label='名称' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label={ <div>标签</div>} name='description'>
          <Input />
        </Form.Item>
        <Form.Item label='平台' name='platform'>
          <AutoInput options={platforms} onBlur={() => getFormData()} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>提交</Button>
          <Button type='primary' onClick={() => getFormData()}>获取</Button>
          <Button type='primary' onClick={() => setFormData()}>重置</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
