import { Schema } from 'mongoose'
import { categoryEntity } from '../../../domain/entities/categoryEntity'

export const categorySchema = new Schema<categoryEntity>({
    categoryId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
        
    },
    title: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })
