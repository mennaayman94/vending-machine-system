export interface Purchase{
    items:    String 
    totalSum:number
}
export interface PurchaseInput{
    items: {quantity:number,itemId:string}[],
    cash:number
}