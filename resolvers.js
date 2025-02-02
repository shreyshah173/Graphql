import mongoose from 'mongoose';
import { quotes, users } from './fakedb.js';
import { randomBytes } from 'crypto';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const user = mongoose.model('User');

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { _id }) => users.find(user => user._id === _id),
        quotes: () => quotes,
        iquote: (_, { by }) => quotes.filter(quote => quote.by === by)
    },
    User: {
        quotes: (parent) => quotes.filter(quote => quote.by === parent._id)
    },
    Mutation: {
        signupUser: async (_, { input }) => {
            const existingUser = await user.findOne({ email: input.email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);
            const newUser = new user({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: hashedPassword
            });

            await newUser.save();
            return newUser;
        },
        signinUser: async (_, { signinput }) => {
            const existingUser = await user.findOne({ email: signinput.email });
            if (!existingUser) {
                throw new Error('User does not exist');
            }
            
            const valid = await bcrypt.compare(signinput.password, existingUser.password);
            if (!valid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign(
                { email: existingUser.email, _id: existingUser._id },
                'secret',
                { expiresIn: '1h' }
            );

            return { token: token };
        }
    }
};

export default resolvers;
