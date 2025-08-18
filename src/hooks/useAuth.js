// import { useSelector, useDispatch } from 'react-redux';
// import { userLoggedOut } from '../store/api/authSlice';
// import { useRouter } from 'next/navigation';

// export const useAuth = () => {
//     const { user, accessToken, isAuthenticated } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const hasPassword = Boolean(user?.hasPassword);
//     const needsPasswordSetup = Boolean(localStorage.getItem("passAuth"));

//     const logout = () => {
//         localStorage.removeItem("auth");
//         localStorage.removeItem("passAuth");
//         dispatch(userLoggedOut());
//         router.push('/auth');
//     };

//     const redirectIfNotAuthenticated = (redirectTo = '/auth') => {
//         if (!isAuthenticated) {
//             router.push(redirectTo);
//             return false;
//         }
//         return true;
//     };

//     return {
//         user,
//         accessToken,
//         isAuthenticated,
//         hasPassword,
//         needsPasswordSetup,
//         logout,
//         redirectIfNotAuthenticated,
//     };
// };