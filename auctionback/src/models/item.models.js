// import mongoose, { Schema } from "mongoose";

// const itemschema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         index: true
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     baseprice: {
//         type: Number,
//         required: true
//     },
//     imageUrl: {
//         type: String,
//         default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
// }, {timestamps: true});

// const Item = mongoose.model('Item', itemschema);
// export default Item