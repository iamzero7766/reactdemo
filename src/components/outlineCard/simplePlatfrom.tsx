import React from 'react';

type ChildComponentProps = {
  formData: PriceInfo; // 表单数据
};

const ChildComponent: React.FC<ChildComponentProps> = ({ formData }) => {

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex-1'>
        <p>items</p>
        <p>{ formData.type}</p>
      </div>
      <div className='flex-1'>
        <p>volumn</p>
        <p>{ formData.volumn}</p>
      </div>
      <div className='flex-1'>
        <p>number</p>
        <p>{ formData.number}</p>
      </div>
      <div className='flex-1'>
        <p>price</p>
        <p>{ formData.price}</p>
      </div>
      <div className='flex-1'>
        <p>discount</p>
        <p>{ formData.discount}</p>
      </div>
    </div>
  );
};

export default ChildComponent;