"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.getProfile = exports.createUserIntoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const user_constants_1 = require("./user.constants");
const student_model_1 = __importDefault(require("../student/student.model"));
const teacher_model_1 = __importDefault(require("../teacher/teacher.model"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Step 1: Create base user
        const { role } = payload, userData = __rest(payload, ["role"]);
        const newUser = yield user_model_1.UserModel.create([Object.assign(Object.assign({}, userData), { role })], { session });
        const createdUser = newUser[0];
        // Step 2: Create role-based model (student/teacher)
        let roleData;
        if (role === "student") {
            roleData = yield student_model_1.default.create([Object.assign({ user: createdUser._id }, payload.studentData)], { session });
        }
        else if (role === "teacher") {
            roleData = yield teacher_model_1.default.create([Object.assign({ user: createdUser._id }, payload.teacherData)], { session });
        }
        else {
            throw new Error("Invalid role specified.");
        }
        yield session.commitTransaction();
        session.endSession();
        return {
            success: true,
            message: `${role} created successfully`,
            data: {
                user: createdUser,
                [role]: roleData[0],
            },
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Transaction failed: " + error);
    }
});
exports.createUserIntoDB = createUserIntoDB;
const getProfile = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id)
        throw new Error('User ID is required to fetch profile.');
    const user = yield user_model_1.UserModel.findById(_id).select('-password -__v').lean();
    console.log(user);
    if (!user)
        throw new Error('User not found.');
    const profile = Object.assign({}, user);
    if (user.role === user_constants_1.USER_ROLE.student) {
        const studentData = yield student_model_1.default.findOne({ user: user._id })
            .select('-__v -createdAt -updatedAt')
            // .populate([
            //   { path: 'enrolledCourses', select: 'title description' },
            //   { path: 'followedTeachers', select: 'user' },
            //   { path: 'progress.course', select: 'title' },
            //   { path: 'progress.lesson', select: 'title' },
            //   { path: 'progress.completedTopics', select: 'title' }
            // ])
            .lean();
        if (studentData) {
            profile.studentInfo = studentData;
        }
    }
    if (user.role === user_constants_1.USER_ROLE.teacher) {
        const teacherData = yield teacher_model_1.default.findOne({ user: user._id })
            .select('-__v -createdAt -updatedAt')
            // .populate([
            //   { path: 'courses', select: 'title description' },
            //   { path: 'followers', select: 'user' },
            //   { path: 'analytics.course', select: 'title' }
            // ])
            .lean();
        if (teacherData) {
            profile.teacherInfo = teacherData;
        }
    }
    return profile;
});
exports.getProfile = getProfile;
exports.userService = {
    createUserIntoDB: exports.createUserIntoDB,
    getProfile: exports.getProfile
};
