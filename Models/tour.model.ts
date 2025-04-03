import { model, Schema } from 'mongoose';
import slugify from 'slugify';
import validator from 'validator';

interface TourSchema {
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    price: number;
    priceDiscount: Number;
    summary: string;
    description: string;
    imageCover: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    images: string[];
    startDates: Date[];
    createdAt: Date;
}

const tourSchema = new Schema<TourSchema>(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
            maxlength: [
                40,
                'A tour name must have less or equal then 40 characters',
            ],
            minlength: [
                10,
                'A tour name must have more or equal then 10 characters',
            ],
            validate: [
                validator.isAlpha,
                'Tour name must only contain characters',
            ],
        },
        slug: {
            type: String,
        },
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration'],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a group size'],
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty'],
            enum: {
                values: ['easy', 'medium', 'difficult'],
                message: 'Difficulty is either: easy, medium, difficult',
            },
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [1, 'Rating must be blow 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val: number) {
                    return val < this.price;
                },
                message: 'Discount price should be below regular price',
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a description'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image'],
        },
        images: {
            type: [String],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        startDates: {
            type: [Date],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

tourSchema.virtual('durationWeeks').get(function () {
    return (this.duration / 7).toFixed(1);
});

tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
    });

    next();
});

const Tour = model('Tour', tourSchema);

export default Tour;
