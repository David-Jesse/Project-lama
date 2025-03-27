"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    img: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
var postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.Post = mongoose_1.default.models.Post || mongoose_1.default.model('Post', postSchema);
