import User, {UserSchema} from "../models/User";
import md5 from "md5";
import {ServiceError} from "../utils/ServiceError";
import {Token} from '../models/Token'

export default {
    register: async (email, password, confirmPassword) => {
        let user = await User.findOne({email})
        //Kiểm tra đã nhập confirmPassword đúng chưa?
        if(password !== confirmPassword)
            return Promise.reject(new ServiceError(405, "These passwords don't match"));
        //Kiếm tra user đã tồn tại trong database chưa?
        if (!user) { 
            let register = new User({email, password: md5(password), status: "true" })
            return register.save()
                .then(async (result) => {
                    let user = JSON.parse(JSON.stringify(result));
                    console.log("Result: ", user);
                })
                .catch(error => {
                    return Promise.reject(new ServiceError(500, error.message, error));
                });
        }
        else
            return Promise.reject(new ServiceError(400, "User existed!"));
        
    },
    login: async (email, password) => {
        let user = await User.findOne({email, password: md5(password)});
        if (user) {
            let token = await Token.createToken(user);
            return Promise.resolve({
                email,
                token
            })
        }

        return Promise.reject(new ServiceError(400, 'Username or password is not correct!'))
    },
    updateRegisterInfo: async (userId, body, photoUrl) => {
        return User.findOne({_id: userId}).then(async (user) => {
            if (user) {
                user.firstName = body.firstName;
                user.lastName = body.lastName;
                user.age = body.age;
                user.profilePhoto = photoUrl;
                let updatedUser = await user.save();
                delete updatedUser.password;
                delete updatedUser.id;
                delete updatedUser.__v;
                delete updatedUser.createdAt;
                delete updatedUser.updatedAt;

                return Promise.resolve(updatedUser);
            }
            return Promise.reject(new ServiceError(400, "User is not exists!"));
        },
        async (error) => {
            return Promise.reject(new ServiceError(500, error.message, error));
        });
    }
}