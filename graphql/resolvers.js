import {
    selectCommunityList,
    selectDailyRank,
    selectSequenceRank,

    selectFeeds,
    selectFeed,
    selectFeedImgs,

    selectSaleInfos,
    selectSaleInfo

    // viewSaleInfo,
    // likeSaleInfo,
    // unLikeSaleInfo   
} from  "./db"


const resolvers = {
    Query: {
        selectCommunityList: (_, {}) => {
            return selectCommunityList()
        },
        selectDailyRank: (_, { cseq, date }) => {
            return selectDailyRank(cseq, date)
        },
        selectSequenceRank: (_, { cseq, designer }) => {
            return selectSequenceRank(cseq, designer)
        },

        selectFeeds: (_, { page }) => {
            return selectFeeds(page)
        },
        selectFeed: (_, { seq }) => {
            return selectFeed(seq)
        },
        selectFeedImgs: (_, { seq }) => {
            return selectFeedImgs(seq)
        },

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