class APIFeatures {
    query: any;
    queryString: any;
    constructor(query: any, queryString: string) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        // * Build Query
        // * 1-A. Filtering
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // * 1-B. Advanced Filtering
        let queryStr: string = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`,
        );

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        // * 2. Sorting
        if (this.queryString.sort) {
            const sortBy: string = (this.queryString.sort as string)
                .split(',')
                .join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        // * 3. Field Limiting
        if (this.queryString.fields) {
            const limitedFields: string = (this.queryString.fields as string)
                .split(',')
                .join(' ');

            this.query.select(limitedFields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        // * 4. Pagination
        const page: number = +this.queryString.page || 1;
        const limit: number = +this.queryString.limit || 10;
        const skip: number = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

export default APIFeatures;
