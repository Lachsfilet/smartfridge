import { PfandType } from '@/models/enums/pfand-type.enum'

export interface Pfand {
    id: number
    quantity: number
    pfandType: PfandType
}

