import type { PfandType } from '@/models/enums/pfand-type.enum'

export interface Crate {
    id: number
    barcode: string
    name: string
    drinkId: number
    defaultPfandType: PfandType
}
