import { createFileRoute } from '@tanstack/react-router'
import { DragAndDropList, DragHandle } from '@/components/dragDnd'
import { useState } from 'react'
import React from 'react'
import { outlineList } from '@/data/list'
import { UpSquareOutlined, PicLeftOutlined, BorderLeftOutlined } from '@ant-design/icons'
export const Route = createFileRoute('/_layout/home/')({
  component: RouteComponent,
})


const CustomListItem = React.forwardRef<HTMLDivElement, { item: ProposalInfo, handleChange: (value:string) => void }>(
  ({ item, handleChange }, ref) => {
    return (
      <div
        className='flex gap-[24px]'
        ref={ref}
        style={{
          borderLeft: '5px solid #345345',
          borderRadius: 8,
          margin: 8,
          padding: 16,
          background: 'white',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <DragHandle>
          <div
            style={{
              padding: '8px 16px',
              background: '#f0f0f0',
              borderRadius: 4,
              marginRight: 16
            }}
          >
            Drag
          </div>
        </DragHandle>

        <div className='w-[150px]'>
          <div className='w-fit py-[4px] px-[10px] text-white' style={{ background: item.color}}>
            { item.name }
          </div>
        </div>
        <input
          defaultValue={item.description}
          onChange={ (e) => handleChange(e.target.value) }
          style={{
            flex: 1,
            padding: 8,
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
        <div className='flex gap-[10px]'>
          <UpSquareOutlined />
          <PicLeftOutlined />
          <BorderLeftOutlined />
        </div>
      </div>
    );
  }
);


const PreviewList = ({ list }: { list: OutlineInfo[] }) => {
  return (
    <div>
      {
        list.map((outlineInfo, index) => (
          <div key={outlineInfo.id}>
            <p>{ index + 1 }. {outlineInfo.name}</p>
            {
              outlineInfo.children.map((item, indexItem) => (
                <div key={item.id}>
                  <p>{indexItem + 1}) {item.description}</p>
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}



function RouteComponent() {

  const [outline, setOutline] = useState<OutlineInfo[]>(outlineList);

  const handleSort = (items: ProposalInfo[], id: string) => { 
    console.log(items, id)
    const newOutline = outline.map(outlineInfo => {
      if (outlineInfo.id === id) {
        outlineInfo.children = items
      }
      return outlineInfo
    })
    setOutline(newOutline)
  }

  const handleValueChange = (value: string, id: string, outlineId: string) => { 
    console.log(value, id, outlineId)
    const newOutline = outline.map(outlineInfo => {
      if (outlineInfo.id === outlineId) {
        outlineInfo.children = outlineInfo.children.map(item => item.id === id ? { ...item, description: value } : item)
      }
      return outlineInfo
    })
    setOutline(newOutline)
  }

  return (
    <div className='w-full h-full '>
      <p className='text-red-500'>title info</p>
      <div className='w-full flex gap-[10px]'>
        <div className='flex-3 bg-blue-400'>
          {outline.map(outlineInfo => (
            <div className='mb-[10px]'>
              <p>{outlineInfo.name}</p>
              <DragAndDropList
                items={outlineInfo.children}
                onSort={ (items) => handleSort(items, outlineInfo.id) }
              >
                {outlineInfo.children.map(item => (
                  <CustomListItem key={ item.id} item={item} handleChange={ value => handleValueChange(value, item.id, outlineInfo.id) } />
                ))}
              </DragAndDropList>
            </div>
          ))}
        </div>
        <div className='flex-2 bg-amber-500'>
          <PreviewList list={outline} />
        </div>
      </div>
    </div>
  )
}

