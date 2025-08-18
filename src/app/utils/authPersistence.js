// export const loadAuthFromStorage = () => {
//     if (typeof window !== 'undefined') {
//         const authData = localStorage.getItem('auth');
//         if (authData) {
//             try {
//                 return JSON.parse(authData);
//             } catch (error) {
//                 console.error('Error parsing auth data:', error);
//                 localStorage.removeItem('auth');
//             }
//         }
//     }
//     return null;
// };

// export const saveAuthToStorage = (authData) => {
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('auth', JSON.stringify(authData));
//     }
// };

// export const clearAuthFromStorage = () => {
//     if (typeof window !== 'undefined') {
//         localStorage.removeItem('auth');
//         localStorage.removeItem('passAuth');
//     }
// };