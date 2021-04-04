// /** 
//  * @param email Email Address
//  * @param password Password
// */
// export const login = (email: String, password: String): String => {
//     return `
//         mutation {
//             customerAccessTokenCreate(input: {
//                 email: "${email}",
//                 password: "${password}"
//             }){
//                 customerAccessToken{accessToken}
//             }
//         }
//     `
// }