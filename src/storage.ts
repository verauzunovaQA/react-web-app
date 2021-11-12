class StoreInput{
    add(key:string, value:any){
        localStorage.setItem(key, JSON.stringify(value))
    }

    get(key:string):any{
        return JSON.parse(localStorage.getItem(key) as string)
    }
}

export const storeInput= new StoreInput()