import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { priceTableAtom } from '@/stores/priceTable'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import DragGroup from '@/components/dragGroup'
import { UpSquareOutlined, BorderLeftOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { useDroppable } from '@dnd-kit/core'
import SimplePlatform from '@/components/outlineCard/simplePlatfrom'
import FullPlatform from '@/components/outlineCard/fullPaltfrom'
export const Route = createFileRoute('/_layout/dragHome/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [priceTable, setPriceTable] = useAtom(priceTableAtom)


  const setPriceInfo = (sortedItems: PriceInfo[]) => {
    console.log(sortedItems)
  }

  const setChange = (valueInfo: PriceInfo, id: string) => { 
    console.log(valueInfo, id)
  }


  const groupPriceList = useMemo(() => {
    let resultArr: PriceInfo[] = []
    priceTable.forEach(item => {
      const cloneItem = _.cloneDeep(item)
      cloneItem.type = 'LIST'
      if (item.groupName == 'system_group') {
        resultArr.push(cloneItem)
      } else {
        let content = resultArr.find(x => x.groupName == item.groupName)
        if (content) {
          content.children?.push(cloneItem)
        } else {
          resultArr.push({
            groupName: item.groupName,
            type: 'GROUP',
            name: item.groupName,
            id: 'group_' + item.groupName + item.id,
            children: [cloneItem]
          })
        }
      }
    })
    console.log(resultArr)
    return resultArr
  }, [priceTable])

  const setGroupPriceList = (value: PriceInfo[]) => {
    console.log(value)
  }






  return (
    <div className='w-full'>
      <p>Dashboard</p>
      <div className='w-full flex gap-[20px]'>
        <div className='flex-3'>
          <DragGroup items={groupPriceList} onSort={(value) => setGroupPriceList(value)}>
          </DragGroup>
        </div>
        <div className='flex-2 bg-blue-400'>
          {/* <ChildComponent priceInfo={priceInfo} /> */}
        </div>
      </div>
    </div>
  )
}
