import {
    selectSaleInfos,
    selectSaleInfo
    // viewSaleInfo,
    // likeSaleInfo,
    // unLikeSaleInfo   
} from  "./db"


const resolvers = {
    Query: {
        selectSaleInfos: (_, { page }) => {
            return selectSaleInfos(page)
        },
        selectSaleInfo: (_, { seq }) => {
            return selectSaleInfo(seq)
        }
    },
    // Mutation: {
    //     viewSaleInfo: (_, { seq }) => {
    //         return viewSaleInfo(seq)
    //     },
    //     likeSaleInfo: (_, { seq }) => {
    //         return likeSaleInfo(seq)
    //     },
    //     unLikeSaleInfo: (_, { seq }) => {
    //         return unLikeSaleInfo(seq)
    //     }
    // }
}

export default resolvers