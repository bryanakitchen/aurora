export function findById(someArray, someId) {
    for (let i = 0; i < someArray.length; i++) {
        const item = someArray[i];
        
        if (item.id === someId) {
            return item;
        }
    }

}