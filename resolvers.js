import { quotes, users } from './fakedb.js';
import {randomBytes} from 'crypto';

const resolvers = {
    Query: {
        users: () => users,
        // user: (_,args)=> users.find(user => user.id === args.id),
        user: (_,{id})=> users.find(user => user.id === id),
        quotes: () => quotes,
        iquote: (_,{by})=> quotes.filter(quote => quote.by === by)
    },
    User:{
        quotes: (parent) => quotes.filter(quote => quote.by === parent.id)
    },
    Mutation:{
        signupUserDummy: (_,args) => {
            const {firstName, lastName, email, password} = args;
            const newUser = {
                id: randomBytes(5).toString('hex'),
                firstName,
                lastName,
                email,
                password
            }
            users.push(newUser);
            return newUser;
        }
    }
}

export default resolvers;