import { createFileRoute } from '@tanstack/react-router'
import { DragAndDropList, DragHandle } from '@/components/dragDnd'
import { useState } from 'react'
import React from 'react'
import { priceList } from '@/data/priceList'
import { UpSquareOutlined, BorderLeftOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import FullPlatform from '@/components/outlineCard/fullPaltfrom'
import SimplePlatform from '@/components/outlineCard/simplePlatfrom'
export const Route = createFileRoute('/_layout/dashboard/')({
  component: RouteComponent,
})



const CustomListItem = React.forwardRef<HTMLDivElement,
  { item: PriceInfo, defaultExpanded: boolean, handleChange: (value: PriceInfo) => void }>(
  ({ item, defaultExpanded, handleChange }, ref) => { 
    const [ expanded, setExpanded ] = useState(defaultExpanded)
    return (
      <div
        ref={ref}
        style={{
          borderLeft: '5px solid #345345',
          borderRadius: 8,
          margin: 8,
          padding: 8,
          background: 'white',
        }}
      >
        <div className='w-full flex gap-[20px] items-center'>
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
          <div className='w-[190px]'>
            <div className='w-fit py-[4px] px-[10px] text-white bg-amber-400'>
              { item.name }
            </div>
          </div>
          <div className='flex-1'>
            { expanded ? null : <SimplePlatform formData={item} />}
          </div>
          <div className='flex gap-[10px]'>
            {
              expanded ?
                <DownOutlined onClick={() => setExpanded(!expanded)} /> :
                <UpOutlined onClick={() => setExpanded(!expanded)} />
            }
            <BorderLeftOutlined />
          </div>
        </div>
        { expanded ? <FullPlatform formData={item} onSubmit={handleChange}/> : null}
      </div>
    )
  }
)


const ChildComponent = ({ priceInfo }: { priceInfo: PriceInfo[] }) => { 
  return (
    <div>
      {priceInfo.map(item => (
        <div key={item.id}>
          <p>{item.name} </p>
          <p>{item.price} </p>
          <p>{item.number} </p>
          <p>{item.volumn} </p>
          <p>{item.discount} </p>
          <p>{item.type} </p>
        </div>
      ))}
    </div>
  )
}




function RouteComponent() {


  const [ priceInfo,  setPriceInfo] = useState<PriceInfo[]>(priceList)

  const setChange = (valueInfo: PriceInfo, id: string) => { 
    console.log(valueInfo, id)
    const newPriceInfo = priceInfo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...valueInfo
        }
      }
      return item
    })
    setPriceInfo(newPriceInfo)
  }






  return (
    <div className='w-full'>
      <p>Dashboard</p>
      <div className='w-full flex gap-[20px]'>
        <div className='flex-3 bg-amber-300'>
          <DragAndDropList items={priceInfo} onSort={setPriceInfo}>
            {priceInfo.map(priceItem => (
              <CustomListItem
                key={priceItem.id}
                item={priceItem}
                defaultExpanded={false}
                handleChange={(valueInfo) => { setChange(valueInfo, priceItem.id) }} />
            ))}
          </DragAndDropList>
        </div>
        <div className='flex-2 bg-blue-400'>
          <ChildComponent priceInfo={priceInfo} />
        </div>
      </div>
    </div>
  )
}
