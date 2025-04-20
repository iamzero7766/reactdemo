import { AutoComplete } from 'antd'
import { StarOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface AutoInputProps {
  value?: string
  onChange?: (value: string) => void
  options: OptionsProp[]
  onBlur?: () => void
}


interface OptionsProp {
  label: string
  recommend?: boolean
}

const AutoInput = ({ value, onChange, options, onBlur }: AutoInputProps) => {

  const [searchValue, setSearchValue] = useState('')

  const filterOptions = (name: string) => {
    setSearchValue(name)
  }



  return (
    <AutoComplete
      style={{ width: '320px' }}
      value={value}
      onSearch={name => { filterOptions(name)}}
      onChange={value => onChange?.(value)}
      onBlur={() => onBlur?.()}
      options={options.map(item => { 
        return {
          label: (
            <div>{item.recommend ? (<StarOutlined />) : ''} <span className={ (searchValue &&item.label.includes(searchValue)) ? 'text-blue-500' : ''}>{item.label}</span> </div>
          ),
          value: item.label
        }
      })}
    />
  )
}


export default AutoInput
