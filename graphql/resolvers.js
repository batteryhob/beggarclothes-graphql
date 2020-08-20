import {
    selectCommunityList,
    selectWeeklyRank,
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
        selectWeeklyRank: (_, { cseq }) => {
            return selectWeeklyRank(cseq)
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
    Community: {
        ranks(parent) {
            return selectWeeklyRank(parent.seq)
        }
    },
    Feed: {
        imgs(parent){
            return selectFeedImgs(parent.seq)
        }
    }
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