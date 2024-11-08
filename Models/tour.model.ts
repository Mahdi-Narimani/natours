import { model, Schema } from 'mongoose';

interface TourSchema {
    name: string;
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

const tourSchema = new Schema<TourSchema>({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
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
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
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
});

const Tour = model('Tour', tourSchema);

export default Tour;
