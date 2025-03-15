export const outlineList: OutlineInfo[] = [
  {
    id: '1',
    name: 'Outline 1',
    children: [
      {
        id: '1-1',
        name: 'Outline 1-1',
        description: 'Outline 1-1 description',
        color: 'red',
        type: 'platform-production'
      },
      {
        id: '1-2',
        name: 'custom',
        description: '',
        color: 'green',
        type: 'custom'
      }
    ]
  },
  {
    id: '2',
    name: 'Outline 2',
    children: [
      {
        id: '2-1',
        name: 'Outline 2-1',
        description: 'Outline 2-1 description',
        color: 'blue',
        type: 'platform-production'
      },
      {
        id: '2-2',
        name: 'custom',
        description: 'custom 2-2description',
        color: 'yellow',
        type: 'custom'
      },
      {
        id: '2-3',
        name: 'custom',
        description: 'custom 2-3 description',
        color: 'yellow',
        type: 'custom'
      }
    ]
  }
]
