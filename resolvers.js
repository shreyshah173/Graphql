import mongoose from 'mongoose';
import { quotes, users } from './fakedb.js';
import { randomBytes } from 'crypto';
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
        }
    }
};

export default resolvers;
