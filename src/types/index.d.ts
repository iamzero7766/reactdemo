interface ProposalInfo {
  id: string
  name: string
  description: string
  color: string
  type: string
}

interface OutlineInfo {
  id: string
  name: string
  children: ProposalInfo[]
}


interface PriceInfo {
  id: string
  name: string
  volumn: string
  step: string
  platform: string
  cell: string
  type: string
  number: number
  analysis: string
  delivers: string
  yield: number
  price: number
  discount: number
  durationStart: number
  durationEnd: number
  description: string
}