class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:new RegExp(this.queryStr.keyword, 'i')
            // name:{
            //     $regex:this.queryStr.keyword,
            //     $option: "i"
            // },
        } : {};

        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this; 

    }

    filter(){
        const querycopy = {...this.queryStr};
        console.log(querycopy);
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach((key) => {
            delete querycopy[key];
        });
        this.query = this.query.find(querycopy);
        console.log(querycopy);
        return this;

    }
};

module.exports = ApiFeatures