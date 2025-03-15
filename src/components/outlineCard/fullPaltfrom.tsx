import React from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { useEffect } from 'react'; 

type ChildComponentProps = {
  formData: PriceInfo; // 表单数据
  onSubmit: (data: PriceInfo) => void; // 提交方法
};

const ChildComponent: React.FC<ChildComponentProps> = ({ formData, onSubmit }) => {


  const handleSubmit = (changedValues, allValues) => {
    console.log(changedValues)
    console.log(allValues)
    // 调用传递的方法
    onSubmit(allValues);
  };
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(formData)
  }, [])

  return (
    <div>
      <Form
        layout='vertical'
        form={form}
        onValuesChange={handleSubmit}
      >
        <Form.Item label="type" name='type'>
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="volumn" name="volumn">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="number" name="number">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="price" name="price">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChildComponent;