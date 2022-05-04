/* eslint-disable prettier/prettier */
// export const userSchema = {
//   name: 'User',
//   properties: {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       // lowercase: true,
//       required: true,
//     },
//     password: {
//       type: String,
//     },
//     phone: {
//       type: String,
//       default: '',
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     address: {
//       type: String,
//       // minlength: 6,
//       default: '',
//     },
//     profilePicture: {
//       type: String,
//     },
//     pushTokens: {
//       type: Array,
//     },
//   },
//   primaryKey: '_id',
// };

import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
  name: 'User',
  properties: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // lowercase: true,
      required: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      // minlength: 6,
      default: '',
    },
    profilePicture: {
      type: String,
    },
    pushTokens: {
      type: Array,
    },
  },
  primaryKey: 'recordID',
};

export default new Realm({schema: [User]});
