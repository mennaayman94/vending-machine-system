export interface Purchase{
    itemId:    String 
    totalCost:number
    quantity: number
    paymentId: string
    categoryId: string
    createdAt:string
}
export interface PurchaseInput{
    items: {quantity:number,itemId:string}[],
    cash:number
}
export interface PurchaseFilter{
    dateFrom?:string;
    dateTo?:string;
     categoryId?:string,
      itemId?:string
}